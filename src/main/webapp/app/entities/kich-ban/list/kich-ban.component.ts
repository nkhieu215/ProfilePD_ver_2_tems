import { IChiTietSanXuat } from 'app/entities/chi-tiet-san-xuat/chi-tiet-san-xuat.model';
import { ISanXuatHangNgay } from 'app/entities/san-xuat-hang-ngay/san-xuat-hang-ngay.model';
import { IChiTietKichBan } from 'app/entities/chi-tiet-kich-ban/chi-tiet-kich-ban.model';
import { FormBuilder } from '@angular/forms';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { Component, OnInit, Input, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IKichBan } from '../kich-ban.model';

import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/config/pagination.constants';
import { KichBanService } from '../service/kich-ban.service';
import { KichBanDeleteDialogComponent } from '../delete/kich-ban-delete-dialog.component';

@Component({
  selector: 'jhi-kich-ban',
  templateUrl: './kich-ban.component.html',
  styleUrls: ['./kich-ban.component.css'],
})
export class KichBanComponent implements OnInit {
  resourceUrl = this.applicationConfigService.getEndpointFor('api/kich-bans/tim-kiem');
  resourceUrlKB = this.applicationConfigService.getEndpointFor('api/kich-ban/thong-so-kich-ban');
  thietBiUrl = this.applicationConfigService.getEndpointFor('api/thiet-bi/danh-sach-thong-so-thiet-bi');
  kichBanDoiChieu = this.applicationConfigService.getEndpointFor('api/kich-ban');
  SanXuatHangNgayDoiChieu = this.applicationConfigService.getEndpointFor('api/chi-tiet-san-xuat');
  sanXuatHangNgayUrl = this.applicationConfigService.getEndpointFor('api/san-xuat-hang-ngay');
  sanXuatHangNgayUrl1 = this.applicationConfigService.getEndpointFor('api/san-xuat-hang-ngay/ma-kich-ban');
  putChiTietKichBanUrl = this.applicationConfigService.getEndpointFor('api/kich-ban/cap-nhat-thong-so-kich-ban');
  updateKichBanUrl = this.applicationConfigService.getEndpointFor('api/kich-ban/update');
  nhomsSaNPhamUrl = this.applicationConfigService.getEndpointFor('/api/nhom-san-pham');

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
    updateBy: '',
    trangThai: '',
  });
  // lưu id
  idSanXuatHangNgay: number | null | undefined;
  @Input() itemPerPage = 10;
  // danh sách mã thiết bị đối chiếu
  listMaThietBiQLKB: string[] = [];
  listMaThietBiSXHN: string[] = [];
  @Input() maKichBan = '';
  @Input() maThietBi = '';
  @Input() loaiThietBi = '';
  @Input() dayChuyen = '';
  @Input() maSanPham = '';
  @Input() versionSanPham = '';
  @Input() ngayTao = null;
  @Input() timeUpdate = null;
  @Input() updateBy = '';
  @Input() trangThai = '';
  // tạo ra 1 tableSignal chứa style ( color)
  tableSignal: {
    thongSoSignal: string;
    minValueSignal: string;
    maxValueSignal: string;
    trungbinhSignal: string;
    donViSignal: string;
  }[] = [];
  maThietBiQLKBColor: string[] = [];
  maThietBiSXHNColor: string[] = [];
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
  isDataChanged = false;
  chiTietKichBans: IChiTietKichBan[] | null = [];
  kichBan: IKichBan | null = null;
  chiTietSanXuats: IChiTietSanXuat[] | null = [];
  sanXuatHangNgay: ISanXuatHangNgay | null = null;

  kichBans?: IKichBan[] = [];
  isLoading = false;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page?: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  searchResults: IKichBan[] = [];
  listNhomThietBi: { loaiThietBi: string; maThietBi: string; dayChuyen: string }[] = [];
  listMaThietBi: { maThietBi: string }[] = [];
  listOfSanXuatHangNgay: ISanXuatHangNgay[] = [];
  listOfChiTietKichBan: {
    id: number;
    idKichBan: number | null | undefined;
    maKichBan: string | null | undefined;
    thongSo: string | null | undefined;
    minValue: number;
    maxValue: number;
    trungbinh: number;
    donVi: string;
    phanLoai: string | null | undefined;
  }[] = [];

  editForm = this.formBuilder.group({
    id: [],
    maKichBan: [],
    maThietBi: [],
    loaiThietBi: [],
    dayChuyen: [],
    nhomSanPham: [],
    maSanPham: [],
    versionSanPham: [],
    ngayTao: [],
    timeUpdate: [],
    updateBy: [],
    trangThai: [],
  });

  constructor(
    protected kichBanService: KichBanService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    protected formBuilder: FormBuilder
  ) {}

  timKiemKichBan(data: any): void {
    this.searchResults = [];

    this.http.post<any>(this.resourceUrl, data).subscribe(res => {
      this.kichBans = res;
      // console.log("kich ban:", this.kichBans);
      //lấy danh sách SXHN
      this.http.get<any>(`${this.sanXuatHangNgayUrl}/${2}`).subscribe(res1 => {
        this.listOfSanXuatHangNgay = res1;
        console.log('danh sach san xuat hang ngay', this.listOfSanXuatHangNgay);
        if (this.kichBans) {
          //Lọc thoog tin mã KB để so sánh với mKB bên SXHN
          for (let i = 0; i < this.listOfSanXuatHangNgay.length; i++) {
            for (let j = 0; j < this.kichBans.length; j++) {
              if (this.listOfSanXuatHangNgay[i].maKichBan === this.kichBans[j].maKichBan) {
                this.kichBans[j].signal = this.listOfSanXuatHangNgay[i].signal;
                console.log('thanh cong ', this.kichBans[j]);
                break;
              }
            }
          }
          // sắp xếp thứ tự
          this.kichBans.sort(function (a, b) {
            if (a.signal !== undefined && a.signal !== null && b.signal !== undefined && b.signal !== null) {
              return b.signal - a.signal;
            }
            return 0;
          });
        }
      });
    });
  }

  loadPage(): void {
    this.timKiemKichBan(this.formSearch.value);
  }
  ngOnInit(): void {
    this.handleNavigation();
    this.formSearch.valueChanges.subscribe(data => {
      this.timKiemKichBan(data);
    });
  }

  trackId(_index: number, item: IKichBan): number {
    return item.id!;
  }

  openModal(id: number | undefined, maKichBan: string | null | undefined, content: TemplateRef<any>): void {
    //reset danh sách color
    this.maThietBiQLKBColor = [];
    this.maThietBiSXHNColor = [];
    //lay danh sach kbSXHN
    this.http.get<any>(`${this.sanXuatHangNgayUrl1}/${maKichBan as string}`).subscribe(res1 => {
      this.listMaThietBiSXHN = res1.maThietBi.split(',');
      console.log('res: ', this.listMaThietBiSXHN);
      this.modalService.open(content, { size: 'lg' });
      console.log(maKichBan);
      this.idSanXuatHangNgay = id;
      console.log('check id: ', this.idSanXuatHangNgay);
      this.tableSignal = [];
      // Thông tin chung
      this.http.get<any>(`${this.kichBanDoiChieu}/${this.idSanXuatHangNgay as number}`).subscribe(res => {
        this.kichBan = res;
        console.log('ket qua kich ban: ', res);
        this.listMaThietBiQLKB = res.maThietBi.split(',');
        console.log('api', this.listMaThietBiQLKB);
        // khởi tạo danh sách mã kịch bản color cho SXHN
        for (let i = 0; i < this.listMaThietBiSXHN.length; i++) {
          this.maThietBiSXHNColor.push('red');
        }
        // khởi tạo danh sách mã kịch bản color cho QLKB
        for (let i = 0; i < this.listMaThietBiQLKB.length; i++) {
          this.maThietBiQLKBColor.push('red');
        }
        // đổi màu giá trị của mã thiết bị SXHN nếu có sự khác biệt
        for (let i = 0; i < this.listMaThietBiQLKB.length; i++) {
          for (let j = 0; j < this.listMaThietBiSXHN.length; j++) {
            if (this.listMaThietBiSXHN[j] === this.listMaThietBiQLKB[i]) {
              this.maThietBiSXHNColor[j] = 'black';
              this.isDataChanged = true;
            }
          }
        }
        // đổi màu giá trị của mã thiết bị QLKB nếu có sự khác biệt
        for (let i = 0; i < this.maThietBiSXHNColor.length; i++) {
          for (let j = 0; j < this.maThietBiQLKBColor.length; j++) {
            console.log({ 1: this.listMaThietBiQLKB[i], 2: this.listMaThietBiSXHN[j] });
            if (this.listMaThietBiQLKB[j] === this.listMaThietBiSXHN[i]) {
              console.log({ 1: this.listMaThietBiQLKB[i], 2: this.listMaThietBiSXHN[j] });
              this.maThietBiQLKBColor[j] = 'black';
              this.isDataChanged = true;
            }
          }
        }
        console.log('result QLKB: ', this.maThietBiQLKBColor);
        console.log('result SXHN: ', this.maThietBiSXHNColor);
      });
    });
    // Lấy danh sách Chi tiết kịch bản so sánh với danh sách chi tiết sản xuất
    for (let j = 0; j < this.listOfSanXuatHangNgay.length; j++) {
      if (maKichBan === this.listOfSanXuatHangNgay[j].maKichBan) {
        this.http.get<any>(`${this.SanXuatHangNgayDoiChieu}/${this.listOfSanXuatHangNgay[j].id as number}`).subscribe(res => {
          this.chiTietSanXuats = res;
          // console.log('api-sxhn', res);
          this.http.get<any>(`${this.resourceUrlKB}/${id as number}`).subscribe(res1 => {
            this.chiTietKichBans = res1;

            // console.log('res1 :', res1);
            // console.log('chi tiet kich ban1 :', this.chiTietKichBans);
            // cách 2:
            if (this.chiTietKichBans && this.chiTietSanXuats !== null) {
              for (let i = 0; i < this.chiTietKichBans.length; i++) {
                const objectSignal = {
                  thongSoSignal: 'black',
                  minValueSignal: 'black',
                  maxValueSignal: 'black',
                  trungbinhSignal: 'black',
                  donViSignal: 'black',
                };
                this.tableSignal.push(objectSignal);
                if (this.chiTietKichBans[i].thongSo !== this.chiTietSanXuats[i].thongSo) {
                  this.tableSignal[i].thongSoSignal = 'red';
                  this.isDataChanged = true;
                }
                if (this.chiTietKichBans[i].minValue !== this.chiTietSanXuats[i].minValue) {
                  this.tableSignal[i].minValueSignal = 'red';
                  this.isDataChanged = true;
                }
                if (this.chiTietKichBans[i].maxValue !== this.chiTietSanXuats[i].maxValue) {
                  this.tableSignal[i].maxValueSignal = 'red';
                  this.isDataChanged = true;
                }
                if (this.chiTietKichBans[i].trungbinh !== this.chiTietSanXuats[i].trungbinh) {
                  this.tableSignal[i].trungbinhSignal = 'red';
                  this.isDataChanged = true;
                }
                if (this.chiTietKichBans[i].donVi !== this.chiTietSanXuats[i].donVi) {
                  this.tableSignal[i].donViSignal = 'red';
                  this.isDataChanged = true;
                }
              }
              console.log('ket qua tablesignal: ', this.tableSignal);
            }
          });
        });
      }
    }
  }

  delete(kichBan: IKichBan): void {
    const modalRef = this.modalService.open(KichBanDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.kichBan = kichBan;
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
      // cái này chỉr sẻt kieu any cho gia tri dau tien, cai thu 2 phai tu set
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

  getThietBi(): void {
    this.listMaThietBi = [];
    this.listOfChiTietKichBan = [];
    const timKiem = {
      maThietBi: this.editForm.get(['maThietBi'])!.value,
      loaiThietBi: this.editForm.get(['loaiThietBi'])!.value,
      hangTms: '',
      thongSo: '',
      moTa: '',
      status: '',
      phanLoai: '',
    };
    // đây là api request về db để lấy chi tiết kịch bản, đọc kĩ thằng này rồi copy sang bên kia
    this.http.post<IChiTietKichBan[]>(this.thietBiUrl, timKiem).subscribe((res: IChiTietKichBan[]) => {
      // khoi tao danh sach
      for (let i = 0; i < res.length; i++) {
        const newRows: {
          id: number;
          idKichBan: number | null | undefined;
          maKichBan: string;
          thongSo: string | null | undefined;
          minValue: number;
          maxValue: number;
          trungbinh: number;
          donVi: string;
          phanLoai: string | null | undefined;
        } = {
          id: 0,
          idKichBan: undefined,
          maKichBan: '',
          thongSo: res[i].thongSo,
          minValue: 0,
          maxValue: 0,
          trungbinh: 0,
          donVi: '',
          phanLoai: res[i].phanLoai,
        };
        this.listOfChiTietKichBan.push(newRows);
      }
      // console.log('thiet bi: ', this.listOfChiTietKichBan);
      // console.log('tim kiem: ', timKiem);
    });
    //set dây chuyền tương ứng theo mã thiết bị
    for (let i = 0; i < this.listNhomThietBi.length; i++) {
      if (this.maThietBi === this.listNhomThietBi[i].maThietBi) {
        this.dayChuyen = this.listNhomThietBi[i].dayChuyen;
      }
    }
    // console.log('thiet bi: ', res;
    // console.log('tim kiem: ', timKiem);
  }

  xacNhanDongBo(): void {
    console.log('Chi tiet kich ban', this.chiTietKichBans);
    console.log('Chi tiet san xuat', this.chiTietSanXuats);
    console.log('Id', this.idSanXuatHangNgay);
    console.log('ma thiet bi', this.listMaThietBiSXHN.toString());
    //Cập nhật mã kịch bản
    const updateBody = { id: this.idSanXuatHangNgay, maThietBi: this.listMaThietBiSXHN.toString() };
    this.http.put<any>(this.updateKichBanUrl, updateBody).subscribe(res => {
      console.log('cap nhat ma kich ban thanh cong', res.maKichBan);
    });
    if (this.chiTietKichBans && this.chiTietSanXuats) {
      for (let i = 0; i < this.chiTietKichBans.length; i++) {
        this.chiTietKichBans[i].thongSo = this.chiTietSanXuats[i].thongSo;
        this.chiTietKichBans[i].minValue = this.chiTietSanXuats[i].minValue;
        this.chiTietKichBans[i].maxValue = this.chiTietSanXuats[i].maxValue;
        this.chiTietKichBans[i].trungbinh = this.chiTietSanXuats[i].trungbinh;
        this.chiTietKichBans[i].donVi = this.chiTietSanXuats[i].donVi;
      }
      // cập nhật thông số kịch bản
      this.http.put<any>(this.putChiTietKichBanUrl, this.chiTietKichBans).subscribe(() => {
        console.log('cap nhat', this.chiTietKichBans);
      });
      // change signal SXHN
      const change = { maKichBan: this.chiTietKichBans[0].maKichBan, signal: 2 };
      this.http.put<any>(`${this.sanXuatHangNgayUrl}`, change).subscribe(() => {
        console.log('thanh cong');
      });
      // window.location.reload();
    }
  }

  // getNhomSanPham(): void {
  //   this.http.get<any>(`${this.nhomsSaNPhamUrl}`).subscribe(res => {

  //   })
  // }
}
