import { Account } from './../../../core/auth/account.model';
import { FormBuilder } from '@angular/forms';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IQuanLyThongSo } from '../quan-ly-thong-so.model';
// import { IDropdownSettings } from 'ng-multiselect-dropdown';

import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/config/pagination.constants';
import { QuanLyThongSoService } from '../service/quan-ly-thong-so.service';
import { QuanLyThongSoDeleteDialogComponent } from '../delete/quan-ly-thong-so-delete-dialog.component';

@Component({
  selector: 'jhi-quan-ly-thong-so',
  templateUrl: './quan-ly-thong-so.component.html',
  styleUrls: ['./quan-ly-thong-so.component.css'],
})
export class QuanLyThongSoComponent implements OnInit {
  resourceUrl = this.applicationConfigService.getEndpointFor('api/quan-ly-thong-so/tim-kiem');

  resourceUrlSearch = this.applicationConfigService.getEndpointFor('api/quan-ly-thong-so');

  account: Account | null = null;

  formSearch = this.formBuilder.group({
    maThongSo: '',
    tenThongSo: '',
    moTa: '',
    ngayTao: null,
    ngayUpdate: null,
    updateBy: '',
    status: '',
  });

  @Input() itemPerPage = 10;

  @Input() maThongSo = '';
  @Input() tenThongSo = '';
  @Input() moTa = '';
  @Input() ngayTao = null;
  @Input() ngayUpdate = null;
  @Input() updateBy = '';
  @Input() status = '';

  listQuanLyThongSo: IQuanLyThongSo[] = [];

  selectedStatus: string | null = null;

  searchTerm = '';
  searchResult: any[] = [];
  // searchForm: FormGroup;

  searchTerms = new Subject<string>();

  quanLyThongSos?: IQuanLyThongSo[];
  isLoading = false;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page?: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  searchKeyword = '';
  seachResult: any[] = [];
  searchSuggestions: string[] = [];
  showSuggestions = false;
  @ViewChild('searchInput', { static: true })
  searchInput!: ElementRef;

  searchResults: IQuanLyThongSo[] = [];

  refreshTemplete = false;
  displayedResults: IQuanLyThongSo[] | undefined;

  selectedThongSos: string[] = [];

  constructor(
    protected quanLyThongSoService: QuanLyThongSoService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    protected formBuilder: FormBuilder
  ) {}

  // ------------------------------------------- lay danh sach quan ly thong so
  getQuanLyThongSoList(): void {
    this.http.get<any>(this.resourceUrlSearch).subscribe(res => {
      this.listQuanLyThongSo = res;
      console.log('log', this.listQuanLyThongSo);
    });
  }

  onChangeSearch(): void {
    // console.log('Selected Status:', this.selectedStatus);
  }

  onChangeQuanlyThongSo(): void {
    const results = this.listQuanLyThongSo.find((obj: IQuanLyThongSo) => obj.maThongSo === this.maThongSo);
    console.log(results);
  }

  onSearch(): void {
    this.searchResults = this.listQuanLyThongSo.filter((obj: any) => obj.name.toLowerCase().includes(this.searchTerm.toLowerCase));
  }

  timKiemThietBi(data: any, page?: number, dontNavigate?: boolean): void {
    const pageToLoad: number = page ?? this.page ?? 1;

    // xoa du lieu cu
    this.searchResults = [];

    this.http.post<any>(this.resourceUrl, data).subscribe(res => {
      // luu du lieu tra ve de hien thi len front-end
      this.quanLyThongSos = res;
      // console.log('res', res)
      console.log(this.quanLyThongSos);

      this.onSuccess(res.quanLyThongSos, res.headers, pageToLoad, !dontNavigate);
    });
  }

  loadPage(): void {
    this.timKiemThietBi(this.formSearch.value);
  }

  ngOnInit(): void {
    this.handleNavigation();
    this.getQuanLyThongSoList();
    this.formSearch.valueChanges.subscribe(data => {
      this.timKiemThietBi(data);
    });
  }

  onSearchTermChange(): void {
    this.searchTerms.next(this.searchTerm);
  }

  selectResult(result: any): void {
    console.log('select result', result);
    this.searchTerm = '';
    this.searchResult = [];
  }

  trackId(_index: number, item: IQuanLyThongSo): number {
    return item.id!;
  }

  delete(quanLyThongSo: IQuanLyThongSo): void {
    const modalRef = this.modalService.open(QuanLyThongSoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.quanLyThongSo = quanLyThongSo;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        // alert('Xóa thông số thành công !');
        this.loadPage();
      }
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
        this.loadPage();
      }
    });
  }

  onSuccess(data: IQuanLyThongSo[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    if (navigate) {
      this.router.navigate(['/quan-ly-thong-so'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? ASC : DESC),
        },
      });
    }
    this.quanLyThongSos = data ?? [];
    this.ngbPaginationPage = this.page;
  }

  onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }
}
