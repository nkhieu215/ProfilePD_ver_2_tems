import { ApplicationConfigService } from './../../../core/config/application-config.service';
import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IChiTietLenhSanXuat, ChiTietLenhSanXuat } from '../chi-tiet-lenh-san-xuat.model';
import { ChiTietLenhSanXuatService } from '../service/chi-tiet-lenh-san-xuat.service';
import { ILenhSanXuat, LenhSanXuat } from 'app/entities/lenh-san-xuat/lenh-san-xuat.model';
import { LenhSanXuatService } from 'app/entities/lenh-san-xuat/service/lenh-san-xuat.service';

@Component({
  selector: 'jhi-chi-tiet-lenh-san-xuat-update',
  templateUrl: './chi-tiet-lenh-san-xuat-update.component.html',
  styleUrls: ['./chi-tiet-lenh-san-xuat-update.component.css'],
})
export class ChiTietLenhSanXuatUpdateComponent implements OnInit {
  resourceUrl = this.applicationConfigService.getEndpointFor('/api/chi-tiet-lenh-san-xuat');

  isSaving = false;
  predicate!: string;
  ascending!: boolean;

  selectedStatus = '';

  changeStatus: {
    id: number;
    totalQuantity: string;
    trangThai: string;
  } = { id: 0, totalQuantity: '', trangThai: '' };

  chiTietLenhSanXuats: IChiTietLenhSanXuat[] = [];
  //tạo danh sách lệnh sản xuất ở trạng thái active
  chiTietLenhSanXuatActive: IChiTietLenhSanXuat[] = [];
  //tạo danh sách lệnh sản xuất không có trong danh sách
  chiTietLenhSanXuatNotList: IChiTietLenhSanXuat[] = [];

  lenhSanXuatsSharedCollection: ILenhSanXuat[] = [];

  editForm = this.fb.group({
    id: [],
    maLenhSanXuat: [null, [Validators.required]],
    sapCode: [],
    sapName: [],
    workOrderCode: [],
    version: [],
    storageCode: [],
    totalQuantity: [],
    createBy: [],
    entryTime: [],
    trangThai: [],
    comment: [],
  });

  constructor(
    protected chiTietLenhSanXuatService: ChiTietLenhSanXuatService,
    protected lenhSanXuatService: LenhSanXuatService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder,
    protected applicationConfigService: ApplicationConfigService,
    protected http: HttpClient
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ lenhSanXuat }) => {
      // if (lenhSanXuat.id === undefined) {
      //   const today = dayjs().startOf('day');
      //   lenhSanXuat.warmupTime = today;
      // }
      console.log('test: ', lenhSanXuat);
      this.http.get<any>(`${this.resourceUrl}/${lenhSanXuat.id as number}`).subscribe(res => {
        this.chiTietLenhSanXuats = res;
        console.log('res', res);
        console.log('lenhSanXuat', this.chiTietLenhSanXuats);
        //lấy danh sách chi tiết lsx ở trạng thái active
        this.chiTietLenhSanXuatActive = this.chiTietLenhSanXuats.filter(a => a.trangThai === 'active' && a.comments === 'null');
        // sắp xếp danh sách
        this.chiTietLenhSanXuatActive.sort(function (a, b) {
          if (a.checked !== undefined && a.checked !== null && b.checked !== undefined && b.checked !== null) {
            return a.checked - b.checked;
          }
          return 0;
        });
        //lấy danh sách chi tiết lsx không có trong danh sách
        this.chiTietLenhSanXuatNotList = this.chiTietLenhSanXuats.filter(a => a.comments === 'not list');
        console.log('active list: ', this.chiTietLenhSanXuatActive);
        console.log('not list list: ', this.chiTietLenhSanXuatNotList);
      });

      this.updateForm(lenhSanXuat);

      // this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  pheDuyetTem(): void {
    this.changeStatus.trangThai = 'Đã phê duyệt';
    console.log(this.changeStatus);
    this.http.put<any>(`${this.resourceUrl}/${this.changeStatus.id}`, this.changeStatus).subscribe(() => {
      console.log('Thành công');
    });
  }

  khoHuyStatus(): void {
    this.changeStatus.trangThai = 'Kho huỷ';
    console.log(this.changeStatus);
    this.http.put<any>(`${this.resourceUrl}/${this.changeStatus.id}`, this.changeStatus).subscribe(() => {
      console.log('Thành công');
    });
  }

  khoTuChoiStatus(): void {
    this.changeStatus.trangThai = 'Từ chối';
    console.log(this.changeStatus);
    this.http.put<any>(`${this.resourceUrl}/${this.changeStatus.id}`, this.changeStatus).subscribe(() => {
      console.log('Thành công');
    });
  }

  save(): void {
    this.isSaving = true;
    const lenhSanXuat = this.createFromForm();
    if (lenhSanXuat.id !== undefined) {
      this.subscribeToSaveResponse(this.lenhSanXuatService.update(lenhSanXuat));
    } else {
      this.subscribeToSaveResponse(this.lenhSanXuatService.create(lenhSanXuat));
    }
  }

  trackLenhSanXuatById(_index: number, item: ILenhSanXuat): number {
    return item.id!;
  }

  trackId(_index: number, item: IChiTietLenhSanXuat): number {
    return item.id!;
  }

  subscribeToSaveResponse(result: Observable<HttpResponse<ILenhSanXuat>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  onSaveSuccess(): void {
    this.previousState();
  }

  onSaveError(): void {
    // Api for inheritance.
  }

  onSaveFinalize(): void {
    this.isSaving = false;
  }

  updateForm(lenhSanXuat: ILenhSanXuat): void {
    this.editForm.patchValue({
      id: lenhSanXuat.id,
      maLenhSanXuat: lenhSanXuat.maLenhSanXuat,
      sapCode: lenhSanXuat.sapCode,
      sapName: lenhSanXuat.sapName,
      workOrderCode: lenhSanXuat.workOrderCode,
      version: lenhSanXuat.version,
      storageCode: lenhSanXuat.storageCode,
      totalQuantity: lenhSanXuat.totalQuantity,
      createBy: lenhSanXuat.createBy,
      entryTime: lenhSanXuat.entryTime,
      trangThai: lenhSanXuat.trangThai,
      comment: lenhSanXuat.comment,
    });

    // this.lenhSanXuatsSharedCollection = this.lenhSanXuatService.addLenhSanXuatToCollectionIfMissing(
    //   this.lenhSanXuatsSharedCollection,
    //   chiTietLenhSanXuat.lenhSanXuat
    // );
  }

  // loadRelationshipsOptions(): void {
  //   this.lenhSanXuatService
  //     .query()
  //     .pipe(map((res: HttpResponse<ILenhSanXuat[]>) => res.body ?? []))
  //     .pipe(
  //       map((lenhSanXuats: ILenhSanXuat[]) =>
  //         this.lenhSanXuatService.addLenhSanXuatToCollectionIfMissing(lenhSanXuats, this.editForm.get('lenhSanXuat')!.value)
  //       )
  //     )
  //     .subscribe((lenhSanXuats: ILenhSanXuat[]) => (this.lenhSanXuatsSharedCollection = lenhSanXuats));
  // }

  createFromForm(): ILenhSanXuat {
    return {
      ...new LenhSanXuat(),
      id: this.editForm.get(['id'])!.value,
      maLenhSanXuat: this.editForm.get(['maLenhSanXuat'])!.value,
      sapCode: this.editForm.get(['sapCode'])!.value,
      sapName: this.editForm.get(['sapName'])!.value,
      workOrderCode: this.editForm.get(['workOrderCode'])!.value,
      version: this.editForm.get(['version'])!.value,
      storageCode: this.editForm.get(['storageCode'])!.value,
      totalQuantity: this.editForm.get(['totalQuantity'])!.value,
      createBy: this.editForm.get(['createBy'])!.value,
      entryTime: this.editForm.get(['entryTime'])!.value,
      trangThai: this.editForm.get(['trangThai'])!.value,
      comment: this.editForm.get(['comment'])!.value,
    };
  }

  exportToExcel(): void {
    // if (this.chiTietSanXuats) {
    //   const exportData = this.chiTietSanXuats.map(item => ({
    //     'Thông số': item.thongSo,
    //     ' Min': item.minValue,
    //     Max: item.maxValue,
    //     'Trung bình': item.trungbinh,
    //     'Đơn vị': item.donVi,
    //   }));
    //   const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
    //   // const ws2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportDataKB);
    //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
    //   XLSX.utils.book_append_sheet(wb, ws, 'ChiTietSanXuatHangNgay');
    //   XLSX.writeFile(wb, 'chi-tiet-san-xuat-hang-ngay.xlsx');
    // }
  }
}
