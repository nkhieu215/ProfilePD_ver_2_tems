import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { IThietBi } from 'app/entities/thiet-bi/thiet-bi.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISanXuatHangNgay } from '../san-xuat-hang-ngay.model';

import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/config/pagination.constants';
import { SanXuatHangNgayService } from '../service/san-xuat-hang-ngay.service';
import { SanXuatHangNgayDeleteDialogComponent } from '../delete/san-xuat-hang-ngay-delete-dialog.component';

@Component({
  selector: 'jhi-san-xuat-hang-ngay',
  templateUrl: './san-xuat-hang-ngay.component.html',
  styleUrls: ['./san-xuat-hang-ngay.component.css'],
})
export class SanXuatHangNgayComponent implements OnInit {
  resourceUrl = this.applicationConfigService.getEndpointFor('api/san-xuat-hang-ngay/tim-kiem');

  form: FormGroup = new FormGroup({});

  formSearch = this.formBuilder.group({
    maKichBan: '',
    maThietBi: '',
    loaiThietBi: '',
    dayChuyen: '',
    nhomSanPham: '',
    maSanPham: '',
    versionSanPham: '',
    ngayTao: null,
    timeUpdate: null,
    trangThai: '',
  });

  sanXuatHangNgays?: ISanXuatHangNgay[];
  isLoading = false;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page?: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  thietBisSharedCollection: IThietBi[] = [];

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

  searchResults: ISanXuatHangNgay[] = [];

  // lưu từ khóa tìm kiếm
  searchKeyword = '';
  // lưu kết quả tìm kiếm
  seachResult: any[] = [];
  // lưu các gợi ý tìm kiếm
  searchSuggestions: string[] = [];
  // hiển thị danh sácsh tìm kiếm
  showSuggestions = false;
  // theo dõi sự kiện keyup trên ô tìm kiếm
  @ViewChild('searchInput', { static: true })
  searchInput!: ElementRef;
  $envent!: KeyboardEvent;

  @ViewChild('multiSelect') multiSelect: any;
  loadContent = false;
  name = 'Cricketers';

  @Input() itemPerPage = 10;

  constructor(
    protected sanXuatHangNgayService: SanXuatHangNgayService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal,
    protected fb: FormBuilder,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    protected formBuilder: FormBuilder
  ) {}

  timKiemSanXuatHangNgay(data: any, page?: number, dontNavigate?: boolean): void {
    const pageToLoad: number = page ?? this.page ?? 1;
    this.searchResults = [];

    this.http.post<any>(this.resourceUrl, data).subscribe(res => {
      this.sanXuatHangNgays = res;
    });
  }

  trackThietBiById(_index: number, item: IThietBi): number {
    return item.id!;
  }

  loadPage(): void {
    this.timKiemSanXuatHangNgay(this.formSearch.value);
  }

  ngOnInit(): void {
    this.handleNavigation();
    this.formSearch.valueChanges.subscribe(data => {
      this.timKiemSanXuatHangNgay(data);
    });
  }

  onSelectAll(items: any): void {
    console.log(items);
  }
  onDeSelectAll(items: any): void {
    console.log(items);
  }

  trackId(_index: number, item: ISanXuatHangNgay): number {
    return item.id!;
  }

  delete(sanXuatHangNgay: ISanXuatHangNgay): void {
    const modalRef = this.modalService.open(SanXuatHangNgayDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.sanXuatHangNgay = sanXuatHangNgay;
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

  onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }
}
