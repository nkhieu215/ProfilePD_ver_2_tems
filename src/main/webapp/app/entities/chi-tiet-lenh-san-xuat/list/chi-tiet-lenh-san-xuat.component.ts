import { ILenhSanXuat } from 'app/entities/lenh-san-xuat/lenh-san-xuat.model';
import { FormBuilder } from '@angular/forms';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { Component, OnInit, Input } from '@angular/core';
import { HttpHeaders, HttpResponse, HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IChiTietLenhSanXuat } from '../chi-tiet-lenh-san-xuat.model';

import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/config/pagination.constants';
import { ChiTietLenhSanXuatService } from '../service/chi-tiet-lenh-san-xuat.service';
import { ChiTietLenhSanXuatDeleteDialogComponent } from '../delete/chi-tiet-lenh-san-xuat-delete-dialog.component';

@Component({
  selector: 'jhi-chi-tiet-lenh-san-xuat',
  templateUrl: './chi-tiet-lenh-san-xuat.component.html',
  styleUrls: ['./chi-tiet-lenh-san-xuat.component.css'],
})
export class ChiTietLenhSanXuatComponent implements OnInit {
  resourceUrlApprove = this.applicationConfigService.getEndpointFor('api/quan-ly-phe-duyet');

  formSearch = this.formBuilder.group({
    maLenhSanXuat: '',
    sapCode: '',
    sapName: '',
    workOrderCode: '',
    version: '',
    storageCode: '',
    createBy: '',
    trangThai: '',
  });

  @Input() itemPerPage = 10;

  lenhSanXuats?: ILenhSanXuat[];

  chiTietLenhSanXuats?: IChiTietLenhSanXuat[];
  isLoading = false;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page?: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  constructor(
    protected chiTietLenhSanXuatService: ChiTietLenhSanXuatService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal,
    protected applicationConfigService: ApplicationConfigService,
    protected formBuilder: FormBuilder,
    protected http: HttpClient
  ) {}

  loadPage(page?: number, dontNavigate?: boolean): void {
    this.isLoading = true;
    const pageToLoad: number = page ?? this.page ?? 1;

    this.chiTietLenhSanXuatService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe({
        next: (res: HttpResponse<IChiTietLenhSanXuat[]>) => {
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
    // this.handleNavigation()  ;
    this.formSearch.valueChanges.subscribe(data => {
      console.log(data);
      this.timKiemTem(data);
    });
    this.getLenhSanXuatList();
  }

  getLenhSanXuatList(): void {
    this.http.get<any>(this.resourceUrlApprove).subscribe(res => {
      this.lenhSanXuats = res;
      console.log(this.resourceUrlApprove);
      console.log(res);
    });
  }

  trackId(_index: number, item: ILenhSanXuat): number {
    return item.id!;
  }

  delete(chiTietLenhSanXuat: IChiTietLenhSanXuat): void {
    const modalRef = this.modalService.open(ChiTietLenhSanXuatDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.chiTietLenhSanXuat = chiTietLenhSanXuat;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadPage();
      }
    });
  }

  timKiemTem(data: any, page?: number, dontNavigate?: boolean): void {
    const pageToLoad: number = page ?? this.page ?? 1;

    this.lenhSanXuats = [];

    this.http.post<any>(this.resourceUrlApprove, data).subscribe(res => {
      this.lenhSanXuats = res;
      console.log(res);
      console.log(this.resourceUrlApprove);
      this.onSuccess(res.lenhSanXuats, res.headers, pageToLoad, !dontNavigate);
    });
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? ASC : DESC)];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  handleNavigation(): void {
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

  onSuccess(data: IChiTietLenhSanXuat[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    if (navigate) {
      this.router.navigate(['/chi-tiet-lenh-san-xuat'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? ASC : DESC),
        },
      });
    }
    this.chiTietLenhSanXuats = data ?? [];
    this.ngbPaginationPage = this.page;
  }

  onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }
}
