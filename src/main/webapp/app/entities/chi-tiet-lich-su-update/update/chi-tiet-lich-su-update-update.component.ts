import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IChiTietLichSuUpdate, ChiTietLichSuUpdate } from '../chi-tiet-lich-su-update.model';
import { ChiTietLichSuUpdateService } from '../service/chi-tiet-lich-su-update.service';
import { ILichSuUpdate } from 'app/entities/lich-su-update/lich-su-update.model';
import { LichSuUpdateService } from 'app/entities/lich-su-update/service/lich-su-update.service';

@Component({
  selector: 'jhi-chi-tiet-lich-su-update-update',
  templateUrl: './chi-tiet-lich-su-update-update.component.html',
})
export class ChiTietLichSuUpdateUpdateComponent implements OnInit {
  isSaving = false;

  lichSuUpdatesSharedCollection: ILichSuUpdate[] = [];

  editForm = this.fb.group({
    id: [],
    maKichBan: [],
    hangLssx: [],
    thongSo: [],
    minValue: [],
    maxValue: [],
    trungbinh: [],
    donVi: [],
    lichSuUpdate: [],
  });

  constructor(
    protected chiTietLichSuUpdateService: ChiTietLichSuUpdateService,
    protected lichSuUpdateService: LichSuUpdateService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ chiTietLichSuUpdate }) => {
      this.updateForm(chiTietLichSuUpdate);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const chiTietLichSuUpdate = this.createFromForm();
    if (chiTietLichSuUpdate.id !== undefined) {
      this.subscribeToSaveResponse(this.chiTietLichSuUpdateService.update(chiTietLichSuUpdate));
    } else {
      this.subscribeToSaveResponse(this.chiTietLichSuUpdateService.create(chiTietLichSuUpdate));
    }
  }

  trackLichSuUpdateById(_index: number, item: ILichSuUpdate): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IChiTietLichSuUpdate>>): void {
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

  protected updateForm(chiTietLichSuUpdate: IChiTietLichSuUpdate): void {
    this.editForm.patchValue({
      id: chiTietLichSuUpdate.id,
      maKichBan: chiTietLichSuUpdate.maKichBan,
      hangLssx: chiTietLichSuUpdate.hangLssx,
      thongSo: chiTietLichSuUpdate.thongSo,
      minValue: chiTietLichSuUpdate.minValue,
      maxValue: chiTietLichSuUpdate.maxValue,
      trungbinh: chiTietLichSuUpdate.trungbinh,
      donVi: chiTietLichSuUpdate.donVi,
      lichSuUpdate: chiTietLichSuUpdate.lichSuUpdate,
    });

    this.lichSuUpdatesSharedCollection = this.lichSuUpdateService.addLichSuUpdateToCollectionIfMissing(
      this.lichSuUpdatesSharedCollection,
      chiTietLichSuUpdate.lichSuUpdate
    );
  }

  protected loadRelationshipsOptions(): void {
    this.lichSuUpdateService
      .query()
      .pipe(map((res: HttpResponse<ILichSuUpdate[]>) => res.body ?? []))
      .pipe(
        map((lichSuUpdates: ILichSuUpdate[]) =>
          this.lichSuUpdateService.addLichSuUpdateToCollectionIfMissing(lichSuUpdates, this.editForm.get('lichSuUpdate')!.value)
        )
      )
      .subscribe((lichSuUpdates: ILichSuUpdate[]) => (this.lichSuUpdatesSharedCollection = lichSuUpdates));
  }

  protected createFromForm(): IChiTietLichSuUpdate {
    return {
      ...new ChiTietLichSuUpdate(),
      id: this.editForm.get(['id'])!.value,
      maKichBan: this.editForm.get(['maKichBan'])!.value,
      hangLssx: this.editForm.get(['hangLssx'])!.value,
      thongSo: this.editForm.get(['thongSo'])!.value,
      minValue: this.editForm.get(['minValue'])!.value,
      maxValue: this.editForm.get(['maxValue'])!.value,
      trungbinh: this.editForm.get(['trungbinh'])!.value,
      donVi: this.editForm.get(['donVi'])!.value,
      lichSuUpdate: this.editForm.get(['lichSuUpdate'])!.value,
    };
  }
}
