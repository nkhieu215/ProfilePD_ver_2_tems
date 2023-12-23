import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';
import { IThietBi } from 'app/entities/thiet-bi/thiet-bi.model';
import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IKichBan, KichBan } from '../kich-ban.model';
import { KichBanService } from '../service/kich-ban.service';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { IChiTietKichBan } from 'app/entities/chi-tiet-kich-ban/chi-tiet-kich-ban.model';
import { IQuanLyThongSo } from 'app/entities/quan-ly-thong-so/quan-ly-thong-so.model';

@Component({
  selector: 'jhi-kich-ban-update',
  templateUrl: './kich-ban-update.component.html',
  styleUrls: ['./kich-ban-update.component.css'],
})
export class KichBanUpdateComponent implements OnInit {
  //==============================================           URL          ================================
  //------------------- url lay danh sach thong so theo ma thiet bi --------------------
  thietBiUrl = this.applicationConfigService.getEndpointFor('api/thiet-bi/danh-sach-thong-so-thiet-bi');
  // ----------------- url luu thong so kich ban theo ma thiet bi -----------------------
  chiTietKichBanUrl = this.applicationConfigService.getEndpointFor('api/kich-ban/them-moi-thong-so-kich-ban');
  listThongSoUrl = this.applicationConfigService.getEndpointFor('api/quan-ly-thong-so');
  listThietBiUrl = this.applicationConfigService.getEndpointFor('api/thiet-bi');
  listNhomThietBiUrl = this.applicationConfigService.getEndpointFor('api/nhom-thiet-bi');
  getChiTietKichBanUrl = this.applicationConfigService.getEndpointFor('api/kich-ban/thong-so-kich-ban');
  putChiTietKichBanUrl = this.applicationConfigService.getEndpointFor('api/kich-ban/cap-nhat-thong-so-kich-ban');
  donViUrl = this.applicationConfigService.getEndpointFor('api/don-vi');
  listKichBanUrl = this.applicationConfigService.getEndpointFor('api/kich-ban');
  listDayChuyenUrl = this.applicationConfigService.getEndpointFor('api/day-chuyen');
  delThongSoKichBanUrl = this.applicationConfigService.getEndpointFor('api/kich-ban/del-thong-so-kich-ban');
  updateKichBanUrl = this.applicationConfigService.getEndpointFor('api/kich-ban/update');
  nhomSanPhamUrl = this.applicationConfigService.getEndpointFor('/api/nhom-san-pham');

  //-------------------------------------------------------------------------------
  isSaving = false;
  predicate!: string;
  ascending!: boolean;
  dropdownList: IKichBan[] = [];
  @Input() selectedItems: { maThietBi: string }[] = [];
  dropdownSettings = {};

  onSelectItemRequest: string[] = [];

  account: Account | null = null;

  public showSuccessPopupService = false;
  public showSuccessPopup = false;

  result?: string;
  resultThongSo?: string;

  //--------------------------------------------- khoi tao input thong so kich ban
  @Input() thongSo = '';
  @Input() minValue = 0;
  @Input() maxValue = 0;
  @Input() trungBinh = 0;
  @Input() donVi = '';
  @Input() phanLoai = '';
  @Input() dayChuyen = '';
  @Input() maThietBi?: string | null | undefined = '';
  @Input() maSanPham = '';
  @Input() versionSanPham = '';
  @Input() nhomSanPham?: string | null | undefined = '';
  // dayChuyen: string | null | undefined = '';
  // maSanPham: string | null | undefined = '';
  // versionSanPham: string | null | undefined = '';
  //----------------------------------------- khoi tao input kich ban
  idKichBan: number | null | undefined;
  maKichBan: string | null | undefined;
  @Input() trangThai = '';
  thietBisSharedCollection: IThietBi[] = [];
  kichBansSharedCollection: IKichBan[] = [];
  //------------------ nơi lưu danh sách thông số - danh sách thiết bị --------------------
  listOfThongSo: IQuanLyThongSo[] = [];
  listOfThietBi: IThietBi[] = [];
  listNhomThietBi: { loaiThietBi: string; maThietBi: string; dayChuyen: string }[] = [];
  listDonVi: { donVi: string }[] = [];
  // ------------------ lưu tìm kiếm theo Nhóm thiết bị ---------------
  listMaThietBi: { maThietBi: string }[] = [];
  listLoaiThietBi: { loaiThietBi: string }[] = [];
  listKichBan: IKichBan[] = [];
  listDayChuyen: { dayChuyen: string }[] = [];
  listNhomSanPham: string[] = [];
  //---------------------------------------------------
  form!: FormGroup;
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

  editForm = this.fb.group({
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

  readonly destroy$ = new Subject<void>();

  selectedStatus = 'active';

  constructor(
    protected kichBanService: KichBanService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    protected accountService: AccountService
  ) {
    this.form = this.fb.group({
      maKichBan: null,
      tenKichBan: null,
      maThietBi: null,
      loaiThietBi: null,
      nhomSanPham: null,
      maSanPham: null,
      verSanPham: null,
    });
  }

  ngOnInit(): void {
    this.accountService.identity().subscribe(account => {
      this.account = account;
    });
    this.activatedRoute.data.subscribe(({ kichBan }) => {
      this.getAllThongSo();
      this.getAllThietBi();
      this.getAllNhomThietBi();
      this.getAllDonVi();
      this.getAllKichBan();
      this.getNhomSanPham();
      // lay danh sach nhom thiet bi
      this.http.get<any>(this.listNhomThietBiUrl).subscribe(res1 => {
        this.listNhomThietBi = res1;
        if (kichBan.id === undefined) {
          const today = dayjs().startOf('day');
          kichBan.ngayTao = today;
          kichBan.timeUpdate = today;
          this.editForm.patchValue({
            id: undefined,
            ngayTao: today,
            timeUpdate: today,
            dayChuyen: ' ',
            maSanPham: ' ',
            versionSanPham: ' ',
            signal: 1,
          });
        } else {
          const today = dayjs().startOf('day');
          this.editForm.patchValue({ timeUpdate: today });
          //Lấy danh sách thông số thiết bị theo id
          this.http.get<any>(`${this.getChiTietKichBanUrl}/${kichBan.id as number}`).subscribe(res => {
            this.listOfChiTietKichBan = res;
            //gán idThietBi cho list
            for (let i = 0; i < this.listOfChiTietKichBan.length; i++) {
              this.listOfChiTietKichBan[i].idKichBan = kichBan.id;
            }
          });
          this.getMaThietBiUpdate(kichBan.loaiThietBi, kichBan.maThietBi);
        }
      });
      this.updateForm(kichBan);
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'maThietBi',
      textField: 'maThietBi',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true,
    };
  }
  //
  onItemSelect(item: any): void {
    this.onSelectItemRequest = [];
    for (let i = 0; i < this.selectedItems.length; i++) {
      this.onSelectItemRequest.push(this.selectedItems[i].maThietBi);
    }
  }

  public onDeSelect(item: any): void {
    this.onSelectItemRequest = [];
    for (let i = 0; i < this.selectedItems.length; i++) {
      this.onSelectItemRequest.push(this.selectedItems[i].maThietBi);
    }
  }

  onSelectAll(items: any): void {
    this.selectedItems = items;
    this.onSelectItemRequest = [];
    for (let i = 0; i < this.selectedItems.length; i++) {
      this.onSelectItemRequest.push(this.selectedItems[i].maThietBi);
    }
  }

  //==================================================== Lấy danh sách =================================================
  getAllThongSo(): void {
    this.http.get<IQuanLyThongSo>(this.listThongSoUrl).subscribe(res => {
      this.listOfThongSo = res as any;
      // console.log("danh sach thong so: ", this.listOfThongSo);
    });
  }

  getAllThietBi(): void {
    this.http.get<IThietBi>(this.listThietBiUrl).subscribe(res => {
      this.listOfThietBi = res as any;
      // console.log("danh sach thiet bi: ", this.listOfThietBi);
    });
  }

  getAllKichBan(): void {
    this.http.get<any>(this.listKichBanUrl).subscribe(data => {
      this.listKichBan = data;
    });
  }

  getAllNhomThietBi(): void {
    this.http.get<any>(this.listNhomThietBiUrl).subscribe(res => {
      this.listNhomThietBi = res;
      this.listNhomThietBi.sort((a, b) => a.loaiThietBi.localeCompare(b.loaiThietBi));
      // console.log("nhom thiet bi:", this.listNhomThietBi);
      const item = { loaiThietBi: this.listNhomThietBi[0].loaiThietBi };
      this.listLoaiThietBi.push(item);
      // console.log('loai thiet bi:', this.listLoaiThietBi);
      for (let i = 1; i < this.listNhomThietBi.length; i++) {
        if (this.listNhomThietBi[i].loaiThietBi !== this.listNhomThietBi[i - 1].loaiThietBi) {
          const items = { loaiThietBi: this.listNhomThietBi[i].loaiThietBi };
          this.listLoaiThietBi.push(items);
        } else {
          continue;
        }
      }
      // console.log('loai thiet bi:', this.listNhomThietBi);
    });
  }

  getAllDonVi(): void {
    this.http.get<any>(this.donViUrl).subscribe(res => {
      this.listDonVi = res;
      // console.log('don vi:', this.listDonVi);
    });
  }

  getMaThietBiUpdate(loaiTB: string | undefined | null, maTB: string | undefined | null): void {
    //---------------------------------- Set thông tin tương ứng theo Nhóm thiết bị-----------------------------
    this.listMaThietBi = [];
    // console.log('ma thiet bi:',this.listNhomThietBi)
    for (let i = 0; i < this.listNhomThietBi.length; i++) {
      if (loaiTB === this.listNhomThietBi[i].loaiThietBi) {
        const items = { maThietBi: this.listNhomThietBi[i].maThietBi };
        this.listMaThietBi.push(items);
      }
    }
    // gán vào selectItem
    if (maTB) {
      this.onSelectItemRequest = maTB.split(',');
      for (let i = 0; i < this.onSelectItemRequest.length; i++) {
        for (let j = 0; j < this.listMaThietBi.length; j++) {
          if (this.listMaThietBi[j].maThietBi === this.onSelectItemRequest[i]) {
            this.selectedItems = [...this.selectedItems, this.listMaThietBi[j]];
          }
        }
      }
    }
  }

  getMaThietBi(): void {
    //---------------------------------- Set thông tin tương ứng theo Nhóm thiết bị-----------------------------
    this.listMaThietBi = [];
    for (let i = 0; i < this.listNhomThietBi.length; i++) {
      if (this.editForm.get(['loaiThietBi'])!.value === this.listNhomThietBi[i].loaiThietBi) {
        const items = { maThietBi: this.listNhomThietBi[i].maThietBi };
        this.listMaThietBi.push(items);
      }
    }
    this.getThietBi();
  }
  getAllDayChuyen(): void {
    this.http.get<any>(this.listDayChuyenUrl).subscribe(res => {
      this.listDayChuyen = res;
      // console.log("day chuyen:", this.listDayChuyen)
    });
  }

  //------------------------------ lay thong tin thiet bi thong qua loai thiet bi ------------------------------
  getThietBi(): void {
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
    });
    //set dây chuyền tương ứng theo mã thiết bị
    for (let i = 0; i < this.listNhomThietBi.length; i++) {
      if (this.maThietBi === this.listNhomThietBi[i].maThietBi) {
        this.dayChuyen = this.listNhomThietBi[i].dayChuyen;
      }
    }
  }
  //---------------------------------- ------------------------ -----------------------------

  getNhomSanPham(): void {
    this.http.get<any>(this.nhomSanPhamUrl).subscribe(data => {
      this.listNhomSanPham = data;
    });
  }

  previousState(): void {
    window.history.back();
  }

  trackThietBiById(_index: number, item: IThietBi): number {
    return item.id!;
  }
  // tạo mới kịch bản
  save(): void {
    this.isSaving = true;
    const kichBan = this.createFromForm();
    if (kichBan.id !== undefined) {
      this.showSuccessPopupService = false;
      this.subscribeToSaveResponse(this.kichBanService.update(kichBan));
    } else {
      //kiem tra kich ban đã tồn tại hay chưa
      let result = true;
      for (let i = 0; i < this.listKichBan.length; i++) {
        if (this.editForm.get(['maKichBan'])!.value === this.listKichBan[i].maKichBan) {
          result = false;
          break;
        }
      }
      //check kết quả
      if (result === false) {
        // alert('Kịch bản đã tồn tại \n Vui lòng đặt tên kịch bản khác');
        window.location.reload();
      } else {
        // alert('Tạo mới kịch bản thành công');
        this.showSuccessPopupService = false;
        this.subscribeToCreateResponse(this.kichBanService.create(kichBan));
      }
    }
  }

  //---------------------------- luu thong so kich ban chi tiet ---------------------------
  saveChiTietKichBan(): void {
    if (this.listOfChiTietKichBan[1].idKichBan === 0) {
      // ------------ cập nhật kich_ban_id trong table chi tiết kịch bản -------------
      this.previousState();
    } else {
      this.previousState();
    }
  }
  // lấy id kịch bản
  subscribeToCreateResponse(result: Observable<HttpResponse<IKichBan>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(res => {
      // gán id kịch bản, mã kịch bản vào list chi tiết kịch bản request
      this.idKichBan = res.body?.id as any;
      this.maKichBan = res.body?.maKichBan as any;
    });
  }
  subscribeToSaveResponse(result: Observable<HttpResponse<IKichBan>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  onSaveSuccess(): void {
    // this.previousState();
  }

  onSaveError(): void {
    // Api for inheritance.
  }

  onSaveFinalize(): void {
    this.isSaving = false;
  }
  // pop tạo mới kịch bản
  openSuccessPopupService(): void {
    if (this.editForm.get(['id'])!.value !== undefined) {
      this.result = 'Cập nhật kịch bản thành công';
      this.showSuccessPopupService = true;
    } else {
      let result = true;
      for (let i = 0; i < this.listKichBan.length; i++) {
        if (this.editForm.get(['maKichBan'])!.value === this.listKichBan[i].maKichBan) {
          result = false;
          break;
        }
      }
      if (result === false) {
        // alert('Kịch bản đã tồn tại \n Vui lòng đặt tên kịch bản khác');
        this.result = 'Kịch bản đã tồn tại \n Vui lòng đặt tên kịch bản khác';
        this.showSuccessPopupService = true;
        window.location.reload();
      } else {
        this.result = 'Tạo mới kịch bản thành công';
        this.showSuccessPopupService = true;
      }
    }
  }
  closeSuccessPopupService(): void {
    this.showSuccessPopupService = false;
  }

  openSuccessPopup(): void {
    this.showSuccessPopup = true;
    if (this.listOfChiTietKichBan[1].idKichBan === undefined) {
      for (let i = 0; i < this.listOfChiTietKichBan.length; i++) {
        this.listOfChiTietKichBan[i].idKichBan = this.idKichBan;
        this.listOfChiTietKichBan[i].maKichBan = this.maKichBan;
      }
      this.http.post<any>(this.chiTietKichBanUrl, this.listOfChiTietKichBan).subscribe(() => {
        this.resultThongSo = 'Thêm mới chi tiết kịch bản thành công';
      });
    } else {
      this.http.put<any>(this.putChiTietKichBanUrl, this.listOfChiTietKichBan).subscribe(() => {
        this.resultThongSo = 'Cập nhật chi tiết kịch bản thành công';
      });
    }
  }

  closeSuccessPopup(): void {
    this.showSuccessPopup = false;
  }

  updateForm(kichBan: IKichBan): void {
    this.editForm.patchValue({
      id: kichBan.id,
      maKichBan: kichBan.maKichBan,
      maThietBi: kichBan.maThietBi,
      loaiThietBi: kichBan.loaiThietBi,
      dayChuyen: kichBan.dayChuyen,
      nhomSanPham: kichBan.nhomSanPham,
      maSanPham: kichBan.maSanPham,
      versionSanPham: kichBan.versionSanPham,
      ngayTao: kichBan.ngayTao ? kichBan.ngayTao.format(DATE_TIME_FORMAT) : null,
      timeUpdate: kichBan.timeUpdate ? kichBan.timeUpdate.format(DATE_TIME_FORMAT) : null,
      updateBy: kichBan.updateBy,
      trangThai: kichBan.trangThai,
      signal: kichBan.signal,
    });
  }

  trackId(_index: number, item: IChiTietKichBan): number {
    return item.id!;
  }

  createFromForm(): IKichBan {
    return {
      ...new KichBan(),
      id: this.editForm.get(['id'])!.value,
      maKichBan: this.editForm.get(['maKichBan'])!.value,
      maThietBi: this.onSelectItemRequest.toString(),
      loaiThietBi: this.editForm.get(['loaiThietBi'])!.value,
      dayChuyen: this.editForm.get(['dayChuyen'])!.value,
      nhomSanPham: this.editForm.get(['nhomSanPham'])!.value,
      maSanPham: this.editForm.get(['maSanPham'])!.value,
      versionSanPham: this.editForm.get(['versionSanPham'])!.value,
      ngayTao: this.editForm.get(['ngayTao'])!.value ? dayjs(this.editForm.get(['ngayTao'])!.value, DATE_TIME_FORMAT) : undefined,
      timeUpdate: this.editForm.get(['timeUpdate'])!.value ? dayjs(this.editForm.get(['timeUpdate'])!.value, DATE_TIME_FORMAT) : undefined,
      updateBy: this.account?.login,
      trangThai: this.editForm.get(['trangThai'])!.value,
      signal: 1,
    };
  }
  //----------------------------------------- them moi chi tiet kich ban --------------------------
  addRowThongSoKichBan(): void {
    const newRow = {
      id: 0,
      idKichBan: this.editForm.get(['id'])!.value,
      maKichBan: this.editForm.get(['maKichBan'])!.value,
      thongSo: '',
      minValue: 0,
      maxValue: 0,
      trungbinh: 0,
      donVi: '',
      phanLoai: '',
    };
    this.listOfChiTietKichBan.push(newRow);
  }

  // sua lai xoa theo stt va ma thong so (id )
  deleteRow(thongSo: string | null | undefined, id: number | null | undefined): void {
    const kichBan = this.createFromForm();
    if (kichBan.id !== undefined) {
      if (confirm('Bạn chắc chắn muốn xóa thông số này?') === true) {
        this.http.delete(`${this.delThongSoKichBanUrl}/${id as number}`).subscribe(() => {
          // alert('Xóa thông số thành công !');
        });
        this.listOfChiTietKichBan = this.listOfChiTietKichBan.filter(d => d.thongSo !== thongSo);
      }
    } else {
      this.listOfChiTietKichBan = this.listOfChiTietKichBan.filter(d => d.thongSo !== thongSo);
    }
  }
}
