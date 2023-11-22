import { FormBuilder } from '@angular/forms';
// import { DataThongSoMay } from './../thong-so-may.model';
import { Component, Input, OnInit } from '@angular/core';
import { HttpHeaders, HttpResponse, HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IThongSoMay } from '../thong-so-may.model';

import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/config/pagination.constants';
import { ThongSoMayService } from '../service/thong-so-may.service';
import { ThongSoMayDeleteDialogComponent } from '../delete/thong-so-may-delete-dialog.component';

@Component({
  selector: 'jhi-thong-so-may',
  templateUrl: './thong-so-may.component.html',
})
export class ThongSoMayComponent implements OnInit {
  searchKeyWord = '';
  searchResults: string[] = [];
  data = [];

  @Input() maThietBi = '';
  @Input() loaiThietBi = '';
  @Input() dayChuyen = '';
  @Input() ngayTao = null;
  @Input() timeUpdate = null;
  @Input() updateBy = '';
  @Input() status = '';
  @Input() update = '';

  thongSoMays?: IThongSoMay[];
  isLoading = false;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page?: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  // searchResults ?: DataThongSoMay[]

  editForm = this.fb.group({
    id: [],
    maThietBi: [],
    loaiThietBi: [],
    hangTms: [],
    thongSo: [],
    moTa: [],
    trangThai: [],
    phanLoai: [],
    thietBi: [],
  });

  constructor(
    protected thongSoMayService: ThongSoMayService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected fb: FormBuilder,
    protected modalService: NgbModal,
    private http: HttpClient
  ) {}

  loadPage(page?: number, dontNavigate?: boolean): void {
    this.isLoading = true;
    const pageToLoad: number = page ?? this.page ?? 1;

    this.thongSoMayService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe({
        next: (res: HttpResponse<IThongSoMay[]>) => {
          this.isLoading = false;
          this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate);
        },
        error: () => {
          this.isLoading = false;
          this.onError();
        },
      });
  }

  ngOnInit(): void {
    this.handleNavigation();
    // this.timKiemThongSo();
  }

  // timKiemThongSo() {
  //   this.searchResults = [];
  //   var timKiem = {
  //     maThietBi: this.maThietBi,
  //     loaiThietBi: this.loaiThietBi,
  //     moTa: '',
  //     dayChuyen: this.dayChuyen,
  //     ngayTao: this.ngayTao,
  //     timeUpdate: this.timeUpdate,
  //     updateBy: this.updateBy,
  //     trangThai: this.status,
  //   };
  //   if (sessionStorage.getItem(JSON.stringify(timKiem)) === null) {
  //     this.http.post<any>('http://192.168.18.145:5000/quan-ly-thong-so/tim-kiem', timKiem).subscribe(res => {
  //       console.log('tim kiem: ', res);
  //       this.searchResults = res as any;
  //       sessionStorage.setItem(JSON.stringify(timKiem), JSON.stringify(res));
  //     });
  //   } else {
  //     var result = sessionStorage.getItem(JSON.stringify(timKiem));
  //     if (result) {
  //       console.log('lay tu cache');
  //       this.searchResults = JSON.parse(result);
  //     }
  //   }
  // }

  // search() {
  //   if (!this.searchKeyWord) {
  //     this.searchResults = [];
  //     return;
  //   }

  //   this.fetchSearchResults(this.searchKeyWord).subscribe(res => {
  //     console.log("tim kiem", res);
  //     this.searchResults = res;
  //   });
  // }

  // private fetchSearchResults(keyword: string): Observable<any[]> {
  //   const timKiem = {
  //     maThongSo: '',
  //     tenThongSo: keyword,
  //     moTa: '',
  //     ngayTao: '',
  //     timeUpdate: '',
  //     updateBy: '',
  //     status: '',
  //   };

  //   const cachedResult = sessionStorage.getItem(JSON.stringify(timKiem));
  //   if (cachedResult) {
  //     console.log('Lay tu cache');
  //     return (JSON.parse(cachedResult))
  //   }

  //   return this.http.post<any[]>('http://192.168.18.145:5000/quan-ly-thong-so/tim-kiem', timKiem).pipe(
  //     switchMap(res => {
  //       sessionStorage.setItem(JSON.stringify(timKiem), JSON.stringify(res));
  //       return (res);
  //     })
  //   );
  // }

  trackId(_index: number, item: IThongSoMay): number {
    return item.id!;
  }

  delete(thongSoMay: IThongSoMay): void {
    const modalRef = this.modalService.open(ThongSoMayDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.thongSoMay = thongSoMay;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadPage();
      }
    });
  }

  // search(ThongSoMay1: IThongSoMay[], searchTerm: string): IThongSoMay[] {
  //   const searchResult = this.thongSoMays.filter((thongSoMay1: IThongSoMay) => {
  //     return thongSoMay1.tenThongSo.toLowerCase().includes(searchTerm.toLowerCase());
  //   })
  //   return searchResult;
  // }

  protected sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? ASC : DESC)];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected handleNavigation(): void {
    combineLatest([this.activatedRoute.data, this.activatedRoute.queryParamMap]).subscribe(([data, params]) => {
      const page = params.get('page');
      const pageNumber = +(page ?? 1);
      const sort = (params.get(SORT) ?? data['defaultSort']).split(',');
      const predicate = sort[0];
      const ascending = sort[1] === ASC;
      if (pageNumber !== this.page || predicate !== this.predicate || ascending !== this.ascending) {
        this.predicate = predicate;
        this.ascending = ascending;
        this.loadPage(pageNumber, true);
      }
    });
  }

  protected onSuccess(data: IThongSoMay[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    if (navigate) {
      this.router.navigate(['/thong-so-may'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? ASC : DESC),
        },
      });
    }
    this.thongSoMays = data ?? [];
    this.ngbPaginationPage = this.page;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }
}
