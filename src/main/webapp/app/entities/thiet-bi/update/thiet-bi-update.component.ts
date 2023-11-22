import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { Component, Input, OnInit } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IThietBi, ThietBi } from '../thiet-bi.model';
import { ThietBiService } from '../service/thiet-bi.service';
import { IQuanLyThongSo } from 'app/entities/quan-ly-thong-so/quan-ly-thong-so.model';

@Component({
  selector: 'jhi-thiet-bi-update',
  templateUrl: './thiet-bi-update.component.html',
  styleUrls: ['./thiet-bi-update.component.css'],
})
export class ThietBiUpdateComponent implements OnInit {
  //====================================================URL=================================
  resourceUrl = this.applicationConfigService.getEndpointFor('api/thiet-bi/cap-nhat');
  resourceUrlAdd = this.applicationConfigService.getEndpointFor('api/thiet-bi/them-moi-thong-so-thiet-bi');
  putThongSoThietBiUrl = this.applicationConfigService.getEndpointFor('api/thiet-bi/cap-nhat');
  listThongSoUrl = this.applicationConfigService.getEndpointFor('api/quan-ly-thong-so');
  listNhomThietBiUrl = this.applicationConfigService.getEndpointFor('api/nhom-thiet-bi');
  getThongSoThietBiUrl = this.applicationConfigService.getEndpointFor('api/thiet-bi/thong-so-thiet-bi/thiet-bi-id');
  getListDayChuyenUrl = this.applicationConfigService.getEndpointFor('api/day-chuyen');
  delThongSoMayUrl = this.applicationConfigService.getEndpointFor('api/thiet-bi/del-thong-so-may');

  //=====================================================LƯU TRỮ DATA==================================
  predicate!: string;
  ascending!: boolean;
  isSaving = false;

  account: Account | null = null;

  public showSuccessPopupService = false;
  public showSuccessPopup = false;

  result?: string;
  resultThongSo?: string;

  selectedStatus: string | null = 'active';
  // --------------------- khai bao input
  @Input() id = '';
  //------------------- thong tin thong so thiet bi
  @Input() thongSo = '.';
  @Input() phanLoai = '.';
  @Input() dayChuyen = '';
  //--------------- thong tin thiet bi
  @Input() maThietBi?: string | null | undefined = null;
  loaiThietBi?: string | null | undefined;
  // khai bao bien luu thong tin idThietBi
  idThietBi?: number | null | undefined;
  moTa?: string | null | undefined;
  status?: string | null | undefined;
  //------------------ nơi lưu danh sách thông số --------------------
  listOfThongSo: IQuanLyThongSo[] = [];
  listNhomThietBi: { loaiThietBi: string; maThietBi: string; dayChuyen: string }[] = [];
  // ------------------ lưu tìm kiếm theo Nhóm thiết bị ---------------
  listMaThietBi: { maThietBi: string }[] = [];
  listLoaiThietBi: { loaiThietBi: string }[] = [];
  listDayChuyen: { dayChuyen: string }[] = [];

  form: FormGroup;
  listOfThietBi: {
    id: number | null | undefined;
    idThietBi: number | null | undefined;
    thongSo: string | null;
    moTa: string | null | undefined;
    status: string | null | undefined;
    phanLoai: string | null | undefined;
    maThietBi: string | null | undefined;
    loaiThietBi: string | null | undefined;
  }[] = [
    {
      id: this.idThietBi,
      idThietBi: this.idThietBi,
      thongSo: null,
      moTa: this.moTa,
      status: this.status,
      phanLoai: '',
      maThietBi: this.maThietBi,
      loaiThietBi: this.loaiThietBi,
    },
  ];

  editForm = this.fb.group({
    id: [],
    maThietBi: [],
    loaiThietBi: [],
    dayChuyen: [],
    ngayTao: [],
    timeUpdate: [],
    updateBy: [],
    status: [],
  });

  readonly destroy$ = new Subject<void>();

  constructor(
    protected thietBiService: ThietBiService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    protected accountService: AccountService
  ) {
    this.form = this.fb.group({
      maThietBi: ['', Validators.required],
      loaiThietBi: ['', Validators.required],
      updateBy: ['', Validators.required],
      trangThai: ['', Validators.required],
    });
  }
  //===============================================================         *         ===============================================================
  ngOnInit(): void {
    this.accountService.identity().subscribe(account => {
      this.account = account;
    });
    this.activatedRoute.data.subscribe(({ thietBi }) => {
      if (thietBi.id === undefined) {
        // console.log(thietBi)
        const today = dayjs().startOf('minutes');
        thietBi.ngayTao = today;
        thietBi.timeUpdate = today;
      } else {
        console.log(thietBi);
        this.idThietBi = thietBi.id;
        this.maThietBi = thietBi.maThietBi;
        this.dayChuyen = thietBi.dayChuyen;
        // const today = dayjs().startOf('minutes');
        // thietBi.timeUpdate = today;
        //Lấy danh sách thông số thiết bị theo id
        this.http.get<any>(`${this.getThongSoThietBiUrl}/${thietBi.id as number}`).subscribe(res => {
          this.listOfThietBi = res;
          //gán idThietBi cho list
          for (let i = 0; i < this.listOfThietBi.length; i++) {
            this.listOfThietBi[i].idThietBi = thietBi.id;
            this.listOfThietBi[i].maThietBi = thietBi.maThietBi;
          }
          // console.log('thong so thiet bi:', this.listOfThietBi);
        });
      }
      this.updateForm(thietBi);
      this.getAllThongSo();
      this.getAllNhomThietBi();
      this.getAllDayChuyen();
      // console.log(this.getAllNhomThietBi)
    });
    this.accountService
      .getAuthenticationState()
      .pipe(takeUntil(this.destroy$))
      .subscribe((account: Account | null) => {
        if (account?.login !== undefined) {
          sessionStorage.setItem('account', account.login);
        }
      });
  }

  trackId(_index: number, item: IThietBi): number {
    return item.id!;
  }

  trackThietBiById(_index: number, item: IThietBi): number {
    return item.id!;
  }
  //==================================================== Lấy danh sách =================================================
  getAllThongSo(): void {
    this.http.get<IQuanLyThongSo>(this.listThongSoUrl).subscribe(res => {
      this.listOfThongSo = res as any;
      // console.log("danh sach thong so: ", this.listOfThongSo);
    });
  }
  getAllNhomThietBi(): void {
    this.http.get<any>(this.listNhomThietBiUrl).subscribe(res => {
      this.listNhomThietBi = res;
      // sắp xếp lại danh sách
      this.listNhomThietBi.sort((a, b) => a.loaiThietBi.localeCompare(b.loaiThietBi));
      // console.log('nhom thiet bi:', this.listNhomThietBi);
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
      // console.log('loai thiet bi:', this.listLoaiThietBi);
    });
  }
  getAllDayChuyen(): void {
    this.http.get<any>(this.getListDayChuyenUrl).subscribe(res => {
      this.listDayChuyen = res;
      // console.log("day chuyen:", this.listDayChuyen)
    });
  }
  //---------------------------------- Set thông tin tương ứng theo tên thông số -----------------------------
  setTenThongSo(): void {
    for (let i = 0; i < this.listOfThietBi.length; i++) {
      for (let j = 0; j < this.listOfThongSo.length; j++) {
        if (this.listOfThietBi[i].thongSo === this.listOfThongSo[j].tenThongSo) {
          this.listOfThietBi[i].moTa = this.listOfThongSo[j].moTa;
          this.listOfThietBi[i].status = this.listOfThongSo[j].status;
          // console.log('mo ta:', this.listOfThongSo[j].moTa)
        }
      }
    }
    // console.log('tuong ung: ', this.listOfThietBi);
  }
  //---------------------------------- Set thông tin tương ứng theo Nhóm thiết bị-----------------------------
  timKiemTheoLoaiThietBi(): void {
    this.loaiThietBi = this.editForm.get(['loaiThietBi'])!.value;
    // console.log(this.editForm.get(['loaiThietBi'])!.value);
    for (let i = 0; i < this.listNhomThietBi.length; i++) {
      if (this.loaiThietBi === this.listNhomThietBi[i].loaiThietBi) {
        const items = { maThietBi: this.listNhomThietBi[i].maThietBi };
        this.listMaThietBi.push(items);
      }
    }
    // console.log('ma thiet bi:', this.listMaThietBi);
  }
  //------------------------------------------------- set thông tin dây chuyền tương ứng theo mã thiết bị
  setDayChuyen(): void {
    for (let i = 0; i < this.listNhomThietBi.length; i++) {
      if (this.maThietBi === this.listNhomThietBi[i].maThietBi) {
        this.dayChuyen = this.listNhomThietBi[i].dayChuyen;
        break;
      }
    }
    // console.log('day chuyen:', this.dayChuyen)
  }
  //-------------------------------------------------------- SAVE --------------------------------------------------------
  save(): void {
    this.isSaving = true;
    const thietBi = this.createFromForm();
    if (thietBi.id !== undefined) {
      this.showSuccessPopupService = true;
      this.subscribeToSaveResponse(this.thietBiService.update(thietBi));
    } else {
      this.showSuccessPopupService = false;
      this.subscribeToCreateResponse(this.thietBiService.create(thietBi));
      console.log('error in here!!!!');
    }
  }

  saveThongSoThietBi(): void {
    if (this.editForm.get(['id'])!.value === undefined) {
      // --------------------- thêm mới ---------------------------
      console.log('list thiet bi: ', this.listOfThietBi);
      if (this.listOfThietBi[0].idThietBi === undefined) {
        // alert('Thiết bị chưa được khởi tạo');
        this.showSuccessPopup = false;
      } else {
        this.http.post<any>(this.resourceUrlAdd, this.listOfThietBi).subscribe(() => {
          this.showSuccessPopup = true;
          console.log('xac nhan');
          // alert('Thêm mới thông số thiết bị thành công !');
          this.previousState();
        });
      }
    } else {
      // -------------------------- cập nhật ---------------
      this.http.put<any>(this.putThongSoThietBiUrl, this.listOfThietBi).subscribe(() => {
        // alert('Cập nhật thông số thiết bị thành công !');
        this.showSuccessPopup = true;
        this.previousState();
      });
    }
  }

  subscribeToSaveResponse(result: Observable<HttpResponse<IThietBi>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }
  subscribeToCreateResponse(result: Observable<HttpResponse<IThietBi>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(res => {
      // luu thong tin id thiet bi
      this.idThietBi = res.body?.id;
      for (let i = 0; i < this.listOfThietBi.length; i++) {
        this.listOfThietBi[i].idThietBi = this.idThietBi;
      }
      // console.log('response: ',this.listOfThietBi)
    });
  }

  onSaveSuccess(): void {
    this.previousState;
  }

  onSaveError(): void {
    // Api for inheritance.
  }

  previousState(): void {
    window.history.back();
  }

  onSaveFinalize(): void {
    this.isSaving = false;
  }

  openSuccessPopupService(): void {
    if (this.editForm.get(['id'])!.value === undefined) {
      this.result = 'Thêm mới thiết bị thành công';
    } else {
      this.result = 'Cập nhật thiết bị thành công';
    }
    this.showSuccessPopupService = true;
  }

  closeSuccessPopupService(): void {
    this.showSuccessPopupService = false;
  }

  openSuccessPopup(): void {
    if (this.editForm.get(['id'])!.value === undefined) {
      this.resultThongSo = 'Thêm mới thông số thành công!';
      if (this.listOfThietBi[0].idThietBi === undefined) {
        this.resultThongSo = 'Thiết bị chưa được khởi tạo';
      } else {
        this.http.post<any>(this.resourceUrlAdd, this.listOfThietBi).subscribe(() => {
          this.resultThongSo = 'Thêm mới thông số thiết bị thành công!';
        });
      }
    } else {
      this.http.put<any>(this.putThongSoThietBiUrl, this.listOfThietBi).subscribe(() => {
        this.resultThongSo = 'Cập nhật thông số thiết bị thành công';
      });
    }
    this.showSuccessPopup = true;
  }

  closeSuccessPopup(): void {
    this.showSuccessPopup = false;
  }

  //=======================================================    Form config   =======================================================
  updateForm(thietBi: IThietBi): void {
    this.editForm.patchValue({
      id: thietBi.id,
      maThietBi: thietBi.maThietBi,
      loaiThietBi: thietBi.loaiThietBi,
      dayChuyen: thietBi.dayChuyen,
      ngayTao: thietBi.ngayTao ? thietBi.ngayTao.format(DATE_TIME_FORMAT) : null,
      timeUpdate: thietBi.timeUpdate ? thietBi.timeUpdate.format(DATE_TIME_FORMAT) : null,
      updateBy: thietBi.updateBy,
      status: thietBi.status,
    });
  }

  createFromForm(): IThietBi {
    // gán giá trị cho input
    // console.log('ma thiet bi:', this.maThietBi);
    // console.log('loai thiet bi:', this.loaiThietBi);
    // gán giá trị cho object đầu tiên trong list thông số
    this.listOfThietBi[0].maThietBi = this.maThietBi;
    this.listOfThietBi[0].loaiThietBi = this.editForm.get(['loaiThietBi'])!.value;
    // console.log('khoi tao thiet bi:', this.listOfThietBi);
    return {
      ...new ThietBi(),
      id: this.editForm.get(['id'])!.value,
      maThietBi: this.maThietBi,
      loaiThietBi: this.editForm.get(['loaiThietBi'])!.value,
      dayChuyen: this.dayChuyen,
      ngayTao: this.editForm.get(['ngayTao'])!.value ? dayjs(this.editForm.get(['ngayTao'])!.value, DATE_TIME_FORMAT) : undefined,
      timeUpdate: this.editForm.get(['timeUpdate'])!.value ? dayjs(this.editForm.get(['timeUpdate'])!.value, DATE_TIME_FORMAT) : undefined,
      updateBy: this.account?.login,
      status: this.editForm.get(['status'])!.value,
    };
  }
  //------------------------------------------------------------------------------------------------------------
  addRow(): void {
    const newRow = {
      id: 0,
      idThietBi: this.idThietBi,
      thongSo: null,
      moTa: this.moTa,
      phanLoai: '',
      status: 'active',
      maThietBi: this.editForm.get(['maThietBi'])!.value,
      loaiThietBi: this.editForm.get(['loaiThietBi'])!.value,
    };
    this.listOfThietBi = [...this.listOfThietBi, newRow];
    console.log('add row', this.listOfThietBi);
  }

  // sua lai xoa theo stt va ma thong so (id )
  deleteRow(thongSo: string | null, id: number | null | undefined): void {
    const thietBi = this.createFromForm();
    console.log('thiet bi id: ', thietBi.id);
    if (thietBi.id !== undefined) {
      if (confirm('Bạn chắc chắn muốn xóa thông số này?') === true) {
        this.http.delete(`${this.delThongSoMayUrl}/${id as number}`).subscribe(() => {
          // alert('Xóa thông số thành công !');
        });
        this.listOfThietBi = this.listOfThietBi.filter(d => d.thongSo !== thongSo);
      }
    } else {
      this.listOfThietBi = this.listOfThietBi.filter(d => d.thongSo !== thongSo);
      // console.log('del', this.listOfThietBi )
    }
  }
}
