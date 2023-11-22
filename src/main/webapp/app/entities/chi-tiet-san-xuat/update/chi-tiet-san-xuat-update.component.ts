import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IChiTietSanXuat, ChiTietSanXuat } from '../chi-tiet-san-xuat.model';
import { ChiTietSanXuatService } from '../service/chi-tiet-san-xuat.service';
import { ISanXuatHangNgay } from 'app/entities/san-xuat-hang-ngay/san-xuat-hang-ngay.model';
import { SanXuatHangNgayService } from 'app/entities/san-xuat-hang-ngay/service/san-xuat-hang-ngay.service';

@Component({
  selector: 'jhi-chi-tiet-san-xuat-update',
  templateUrl: './chi-tiet-san-xuat-update.component.html',
})
export class ChiTietSanXuatUpdateComponent implements OnInit {
  isSaving = false;

  sanXuatHangNgaysSharedCollection: ISanXuatHangNgay[] = [];

  editForm = this.fb.group({
    id: [],
    maKichBan: [],
    hangSxhn: [],
    thongSo: [],
    minValue: [],
    maxValue: [],
    trungbinh: [],
    donVi: [],
    sanXuatHangNgay: [],
  });

  constructor(
    protected chiTietSanXuatService: ChiTietSanXuatService,
    protected sanXuatHangNgayService: SanXuatHangNgayService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ chiTietSanXuat }) => {
      this.updateForm(chiTietSanXuat);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const chiTietSanXuat = this.createFromForm();
    if (chiTietSanXuat.id !== undefined) {
      this.subscribeToSaveResponse(this.chiTietSanXuatService.update(chiTietSanXuat));
    } else {
      this.subscribeToSaveResponse(this.chiTietSanXuatService.create(chiTietSanXuat));
    }
  }

  trackSanXuatHangNgayById(_index: number, item: ISanXuatHangNgay): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IChiTietSanXuat>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(chiTietSanXuat: IChiTietSanXuat): void {
    this.editForm.patchValue({
      id: chiTietSanXuat.id,
      maKichBan: chiTietSanXuat.maKichBan,
      hangSxhn: chiTietSanXuat.hangSxhn,
      thongSo: chiTietSanXuat.thongSo,
      minValue: chiTietSanXuat.minValue,
      maxValue: chiTietSanXuat.maxValue,
      trungbinh: chiTietSanXuat.trungbinh,
      donVi: chiTietSanXuat.donVi,
      sanXuatHangNgay: chiTietSanXuat.sanXuatHangNgay,
    });

    this.sanXuatHangNgaysSharedCollection = this.sanXuatHangNgayService.addSanXuatHangNgayToCollectionIfMissing(
      this.sanXuatHangNgaysSharedCollection,
      chiTietSanXuat.sanXuatHangNgay
    );
  }

  protected loadRelationshipsOptions(): void {
    this.sanXuatHangNgayService
      .query()
      .pipe(map((res: HttpResponse<ISanXuatHangNgay[]>) => res.body ?? []))
      .pipe(
        map((sanXuatHangNgays: ISanXuatHangNgay[]) =>
          this.sanXuatHangNgayService.addSanXuatHangNgayToCollectionIfMissing(sanXuatHangNgays, this.editForm.get('sanXuatHangNgay')!.value)
        )
      )
      .subscribe((sanXuatHangNgays: ISanXuatHangNgay[]) => (this.sanXuatHangNgaysSharedCollection = sanXuatHangNgays));
  }

  protected createFromForm(): IChiTietSanXuat {
    return {
      ...new ChiTietSanXuat(),
      id: this.editForm.get(['id'])!.value,
      maKichBan: this.editForm.get(['maKichBan'])!.value,
      hangSxhn: this.editForm.get(['hangSxhn'])!.value,
      thongSo: this.editForm.get(['thongSo'])!.value,
      minValue: this.editForm.get(['minValue'])!.value,
      maxValue: this.editForm.get(['maxValue'])!.value,
      trungbinh: this.editForm.get(['trungbinh'])!.value,
      donVi: this.editForm.get(['donVi'])!.value,
      sanXuatHangNgay: this.editForm.get(['sanXuatHangNgay'])!.value,
    };
  }
}
