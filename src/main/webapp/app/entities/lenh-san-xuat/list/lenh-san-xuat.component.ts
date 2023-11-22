import { FormBuilder } from '@angular/forms';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { Component, Input, OnInit } from '@angular/core';
import { HttpHeaders, HttpResponse, HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ILenhSanXuat } from '../lenh-san-xuat.model';

import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/config/pagination.constants';
import { LenhSanXuatService } from '../service/lenh-san-xuat.service';
import { LenhSanXuatDeleteDialogComponent } from '../delete/lenh-san-xuat-delete-dialog.component';

@Component({
  selector: 'jhi-lenh-san-xuat',
  templateUrl: './lenh-san-xuat.component.html',
  styleUrls: ['./lenh-san-xuat.component.css'],
})
export class LenhSanXuatComponent implements OnInit {
  resourceUrl = this.applicationConfigService.getEndpointFor('api/lenh-san-xuat');

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

  lenhSanXuats?: ILenhSanXuat[];
  isLoading = false;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page?: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  maxResultToShow = 10;
  showingResults = 10;
  currentPage = 1;
  startIndex = 0;

  @Input() itemPerPage = 10;

  @Input() maLenhSanXuat = '';
  @Input() SAPcode = '';
  @Input() SAPname = '';
  @Input() WOcode = '';
  @Input() version = '';
  @Input() InventoryCode = '';
  @Input() UpdateBy = '';
  @Input() status = '';

  listLenhSanXuat: ILenhSanXuat[] = [];

  searchResult: ILenhSanXuat[] = [];

  constructor(
    protected lenhSanXuatService: LenhSanXuatService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    protected formBuilder: FormBuilder
  ) {}

  loadPage(page?: number, dontNavigate?: boolean): void {
    this.isLoading = true;
    const pageToLoad: number = page ?? this.page ?? 1;

    this.lenhSanXuatService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe({
        next: (res: HttpResponse<ILenhSanXuat[]>) => {
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
    this.formSearch.valueChanges.subscribe(data => {
      console.log(data);
      this.timKiemTem(data);
    });
    this.getLenhSanXuatList();
  }

  getLenhSanXuatList(): void {
    this.http.get<any>(this.resourceUrl).subscribe(res => {
      this.lenhSanXuats = res;
      console.log(this.resourceUrl);
      console.log(res);
    });
  }

  trackId(_index: number, item: ILenhSanXuat): number {
    return item.id!;
  }

  delete(lenhSanXuat: ILenhSanXuat): void {
    const modalRef = this.modalService.open(LenhSanXuatDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.lenhSanXuat = lenhSanXuat;
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

    this.http.post<any>(this.resourceUrl, data).subscribe(res => {
      this.lenhSanXuats = res;
      console.log(res);
      console.log(this.resourceUrl);
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

  onSuccess(data: ILenhSanXuat[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    if (navigate) {
      this.router.navigate(['/lenh-san-xuat'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? ASC : DESC),
        },
      });
    }
    this.lenhSanXuats = data ?? [];
    this.ngbPaginationPage = this.page;
  }

  onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }
}
