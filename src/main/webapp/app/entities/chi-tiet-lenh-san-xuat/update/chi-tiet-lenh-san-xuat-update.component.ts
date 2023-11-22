import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IChiTietLenhSanXuat, ChiTietLenhSanXuat } from '../chi-tiet-lenh-san-xuat.model';
import { ChiTietLenhSanXuatService } from '../service/chi-tiet-lenh-san-xuat.service';
import { ILenhSanXuat } from 'app/entities/lenh-san-xuat/lenh-san-xuat.model';
import { LenhSanXuatService } from 'app/entities/lenh-san-xuat/service/lenh-san-xuat.service';

@Component({
  selector: 'jhi-chi-tiet-lenh-san-xuat-update',
  templateUrl: './chi-tiet-lenh-san-xuat-update.component.html',
  styleUrls: ['./chi-tiet-lenh-san-xuat-update.component.css'],
})
export class ChiTietLenhSanXuatUpdateComponent implements OnInit {
  isSaving = false;
  predicate!: string;
  ascending!: boolean;

  lenhSanXuatsSharedCollection: ILenhSanXuat[] = [];

  editForm = this.fb.group({
    id: [],
    reelID: [null, [Validators.required]],
    partNumber: [null, [Validators.required]],
    vendor: [null, [Validators.required]],
    lot: [null, [Validators.required]],
    userData1: [null, [Validators.required]],
    userData2: [null, [Validators.required]],
    userData3: [null, [Validators.required]],
    userData4: [null, [Validators.required]],
    userData5: [null, [Validators.required]],
    initialQuantity: [null, [Validators.required]],
    msdLevel: [],
    msdInitialFloorTime: [],
    msdBagSealDate: [],
    marketUsage: [],
    quantityOverride: [null, [Validators.required]],
    shelfTime: [],
    spMaterialName: [],
    warningLimit: [],
    maximumLimit: [],
    comments: [],
    warmupTime: [],
    storageUnit: [null, [Validators.required]],
    subStorageUnit: [],
    locationOverride: [],
    expirationDate: [null, [Validators.required]],
    manufacturingDate: [null, [Validators.required]],
    partClass: [],
    sapCode: [],
    trangThai: [],
    checked: [],
    lenhSanXuat: [],
  });

  constructor(
    protected chiTietLenhSanXuatService: ChiTietLenhSanXuatService,
    protected lenhSanXuatService: LenhSanXuatService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ chiTietLenhSanXuat }) => {
      if (chiTietLenhSanXuat.id === undefined) {
        const today = dayjs().startOf('day');
        chiTietLenhSanXuat.warmupTime = today;
      }

      this.updateForm(chiTietLenhSanXuat);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const chiTietLenhSanXuat = this.createFromForm();
    if (chiTietLenhSanXuat.id !== undefined) {
      this.subscribeToSaveResponse(this.chiTietLenhSanXuatService.update(chiTietLenhSanXuat));
    } else {
      this.subscribeToSaveResponse(this.chiTietLenhSanXuatService.create(chiTietLenhSanXuat));
    }
  }

  trackLenhSanXuatById(_index: number, item: ILenhSanXuat): number {
    return item.id!;
  }

  subscribeToSaveResponse(result: Observable<HttpResponse<IChiTietLenhSanXuat>>): void {
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

  updateForm(chiTietLenhSanXuat: IChiTietLenhSanXuat): void {
    this.editForm.patchValue({
      id: chiTietLenhSanXuat.id,
      reelID: chiTietLenhSanXuat.reelID,
      partNumber: chiTietLenhSanXuat.partNumber,
      vendor: chiTietLenhSanXuat.vendor,
      lot: chiTietLenhSanXuat.lot,
      userData1: chiTietLenhSanXuat.userData1,
      userData2: chiTietLenhSanXuat.userData2,
      userData3: chiTietLenhSanXuat.userData3,
      userData4: chiTietLenhSanXuat.userData4,
      userData5: chiTietLenhSanXuat.userData5,
      initialQuantity: chiTietLenhSanXuat.initialQuantity,
      msdLevel: chiTietLenhSanXuat.msdLevel,
      msdInitialFloorTime: chiTietLenhSanXuat.msdInitialFloorTime,
      msdBagSealDate: chiTietLenhSanXuat.msdBagSealDate,
      marketUsage: chiTietLenhSanXuat.marketUsage,
      quantityOverride: chiTietLenhSanXuat.quantityOverride,
      shelfTime: chiTietLenhSanXuat.shelfTime,
      spMaterialName: chiTietLenhSanXuat.spMaterialName,
      warningLimit: chiTietLenhSanXuat.warningLimit,
      maximumLimit: chiTietLenhSanXuat.maximumLimit,
      comments: chiTietLenhSanXuat.comments,
      warmupTime: chiTietLenhSanXuat.warmupTime ? chiTietLenhSanXuat.warmupTime.format(DATE_TIME_FORMAT) : null,
      storageUnit: chiTietLenhSanXuat.storageUnit,
      subStorageUnit: chiTietLenhSanXuat.subStorageUnit,
      locationOverride: chiTietLenhSanXuat.locationOverride,
      expirationDate: chiTietLenhSanXuat.expirationDate,
      manufacturingDate: chiTietLenhSanXuat.manufacturingDate,
      partClass: chiTietLenhSanXuat.partClass,
      sapCode: chiTietLenhSanXuat.sapCode,
      trangThai: chiTietLenhSanXuat.trangThai,
      checked: chiTietLenhSanXuat.checked,
      lenhSanXuat: chiTietLenhSanXuat.lenhSanXuat,
    });

    this.lenhSanXuatsSharedCollection = this.lenhSanXuatService.addLenhSanXuatToCollectionIfMissing(
      this.lenhSanXuatsSharedCollection,
      chiTietLenhSanXuat.lenhSanXuat
    );
  }

  loadRelationshipsOptions(): void {
    this.lenhSanXuatService
      .query()
      .pipe(map((res: HttpResponse<ILenhSanXuat[]>) => res.body ?? []))
      .pipe(
        map((lenhSanXuats: ILenhSanXuat[]) =>
          this.lenhSanXuatService.addLenhSanXuatToCollectionIfMissing(lenhSanXuats, this.editForm.get('lenhSanXuat')!.value)
        )
      )
      .subscribe((lenhSanXuats: ILenhSanXuat[]) => (this.lenhSanXuatsSharedCollection = lenhSanXuats));
  }

  createFromForm(): IChiTietLenhSanXuat {
    return {
      ...new ChiTietLenhSanXuat(),
      id: this.editForm.get(['id'])!.value,
      reelID: this.editForm.get(['reelID'])!.value,
      partNumber: this.editForm.get(['partNumber'])!.value,
      vendor: this.editForm.get(['vendor'])!.value,
      lot: this.editForm.get(['lot'])!.value,
      userData1: this.editForm.get(['userData1'])!.value,
      userData2: this.editForm.get(['userData2'])!.value,
      userData3: this.editForm.get(['userData3'])!.value,
      userData4: this.editForm.get(['userData4'])!.value,
      userData5: this.editForm.get(['userData5'])!.value,
      initialQuantity: this.editForm.get(['initialQuantity'])!.value,
      msdLevel: this.editForm.get(['msdLevel'])!.value,
      msdInitialFloorTime: this.editForm.get(['msdInitialFloorTime'])!.value,
      msdBagSealDate: this.editForm.get(['msdBagSealDate'])!.value,
      marketUsage: this.editForm.get(['marketUsage'])!.value,
      quantityOverride: this.editForm.get(['quantityOverride'])!.value,
      shelfTime: this.editForm.get(['shelfTime'])!.value,
      spMaterialName: this.editForm.get(['spMaterialName'])!.value,
      warningLimit: this.editForm.get(['warningLimit'])!.value,
      maximumLimit: this.editForm.get(['maximumLimit'])!.value,
      comments: this.editForm.get(['comments'])!.value,
      warmupTime: this.editForm.get(['warmupTime'])!.value ? dayjs(this.editForm.get(['warmupTime'])!.value, DATE_TIME_FORMAT) : undefined,
      storageUnit: this.editForm.get(['storageUnit'])!.value,
      subStorageUnit: this.editForm.get(['subStorageUnit'])!.value,
      locationOverride: this.editForm.get(['locationOverride'])!.value,
      expirationDate: this.editForm.get(['expirationDate'])!.value,
      manufacturingDate: this.editForm.get(['manufacturingDate'])!.value,
      partClass: this.editForm.get(['partClass'])!.value,
      sapCode: this.editForm.get(['sapCode'])!.value,
      trangThai: this.editForm.get(['trangThai'])!.value,
      checked: this.editForm.get(['checked'])!.value,
      lenhSanXuat: this.editForm.get(['lenhSanXuat'])!.value,
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
