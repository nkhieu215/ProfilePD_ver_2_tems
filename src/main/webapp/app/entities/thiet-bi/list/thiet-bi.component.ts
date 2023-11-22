import { FormBuilder } from '@angular/forms';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable, of } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IThietBi } from '../thiet-bi.model';

import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/config/pagination.constants';
import { ThietBiService } from '../service/thiet-bi.service';
import { ThietBiDeleteDialogComponent } from '../delete/thiet-bi-delete-dialog.component';

@Component({
  selector: 'jhi-thiet-bi',
  templateUrl: './thiet-bi.component.html',
  styleUrls: ['./thiet-bi.component.css'],
})
export class ThietBiComponent implements OnInit {
  resourceUrl = this.applicationConfigService.getEndpointFor('api/thiet-bis/tim-kiem');
  //----------------- test ------------
  dropdownList: { item_id: number; item_text: string }[] = [];
  selectedItems: { item_id: number; item_text: string }[] = [];
  dropdownSettings = {};
  dropdownSettings1 = {};

  dropdownList1: IThietBi[] = [];

  //------------------------------------
  formSearch = this.formBuilder.group({
    maThietBi: '',
    loaiThietBi: '',
    dayChuyen: '',
    thongSo: '',
    ngayTao: null,
    ngayUpdate: null,
    updateBy: '',
    status: '',
    moTa: '',
    phanLoai: '',
  });

  @Input() itemPerPage = 10;

  @Input() maThietBi = '';
  @Input() loaiThietBi = '';
  @Input() dayChuyen = '';
  @Input() status = '';
  @Input() ngayTao = null;
  @Input() updateBy = '';
  @Input() timeUpdate = null;
  @Input() thongSo = '';
  @Input() moTa = '';
  @Input() phanLoai = '';

  thietBis?: IThietBi[];
  isLoading = false;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page?: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  searchResults: IThietBi[] = [];

  selectedStatus: string | null = null;

  searchKeyword = '';
  seachResult: any[] = [];
  searchSuggestions: string[] = [];
  showSuggestions = false;
  @ViewChild('searchInput', { static: true })
  searchInput!: ElementRef;

  constructor(
    protected thietBiService: ThietBiService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal,
    // nhận tham chiếu đến HttpClient để thực hiện các yêu cầu Http
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    private formBuilder: FormBuilder
  ) {}

  loadPage(): void {
    this.timKiemThietBi(this.formSearch.value);
  }

  ngOnInit(): void {
    this.handleNavigation();
    this.formSearch.valueChanges.subscribe(data => {
      this.timKiemThietBi(data);
    });

    //--------------- test --------------
    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' },
    ];
    console.log(this.dropdownList);

    this.selectedItems = [];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true,
    };

    this.dropdownSettings1 = {
      singleSelection: false,
      textField: 'loaiThietBi',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true,
    };

    //-----------------------------------
  }
  //---------- test --------------
  onItemSelect(item: any): void {
    console.log(item);
  }
  onSelectAll(items: any): void {
    console.log(items);
  }
  //----------------------------
  // được gọi mỗi khi có sự kiện nhập trong ô tìm kiếm, kiểm tra nếu từ khóa tìm kiếm trống thì showSuggestions là false
  onSearchInput(): void {
    if (this.searchKeyword.trim() === '') {
      this.showSuggestions = false;
    }
  }

  trackId(_index: number, item: IThietBi): number {
    return item.id!;
  }

  delete(thietBi: IThietBi): void {
    const modalRef = this.modalService.open(ThietBiDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.thietBi = thietBi;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
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

  onSuccess(data: IThietBi[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    if (navigate) {
      this.router.navigate(['/thiet-bi'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? ASC : DESC),
        },
      });
    }
    this.thietBis = data ?? [];
    this.ngbPaginationPage = this.page;
  }

  onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }

  fetchSearchSuggestions(keyword: string): Observable<string[]> {
    const suggestions: string[] = [];
    const fixedSuggestions: string[] = [];
    const filteredSuggestions = fixedSuggestions.filter(suggestion => suggestion.toLowerCase().includes(keyword.toLowerCase()));
    suggestions.push(...filteredSuggestions);
    return of(suggestions);
  }

  timKiemThietBi(data: any, page?: number, dontNavigate?: boolean): void {
    const pageToLoad: number = page ?? this.page ?? 1;

    this.searchResults = [];

    // console.log("body:", timKiem)
    this.http.post<any>(this.resourceUrl, data).subscribe(res => {
      //luu du lieu tra ve de hien thi len front-end
      this.thietBis = res;
      this.dropdownList1 = res;
      console.log(this.thietBis);
      console.log(this.dropdownList1);

      // console.log('res', res);
      this.onSuccess(res.thietBis, res.headers, pageToLoad, !dontNavigate);
    });
  }
}
