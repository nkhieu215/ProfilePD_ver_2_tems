import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IChiTietKichBan, ChiTietKichBan } from '../chi-tiet-kich-ban.model';
import { ChiTietKichBanService } from '../service/chi-tiet-kich-ban.service';
import { IKichBan } from 'app/entities/kich-ban/kich-ban.model';
import { KichBanService } from 'app/entities/kich-ban/service/kich-ban.service';

@Component({
  selector: 'jhi-chi-tiet-kich-ban-update',
  templateUrl: './chi-tiet-kich-ban-update.component.html',
})
export class ChiTietKichBanUpdateComponent implements OnInit {
  isSaving = false;

  kichBansSharedCollection: IKichBan[] = [];

  editForm = this.fb.group({
    id: [],
    maKichBan: [],
    hangMkb: [],
    thongSo: [],
    minValue: [],
    maxValue: [],
    trungbinh: [],
    donVi: [],
    phanLoai: [],
    kichBan: [],
  });

  constructor(
    protected chiTietKichBanService: ChiTietKichBanService,
    protected kichBanService: KichBanService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ chiTietKichBan }) => {
      this.updateForm(chiTietKichBan);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const chiTietKichBan = this.createFromForm();
    if (chiTietKichBan.id !== undefined) {
      this.subscribeToSaveResponse(this.chiTietKichBanService.update(chiTietKichBan));
    } else {
      this.subscribeToSaveResponse(this.chiTietKichBanService.create(chiTietKichBan));
    }
  }

  trackKichBanById(_index: number, item: IKichBan): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IChiTietKichBan>>): void {
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

  protected updateForm(chiTietKichBan: IChiTietKichBan): void {
    this.editForm.patchValue({
      id: chiTietKichBan.id,
      maKichBan: chiTietKichBan.maKichBan,
      trangThai: chiTietKichBan.trangThai,
      thongSo: chiTietKichBan.thongSo,
      minValue: chiTietKichBan.minValue,
      maxValue: chiTietKichBan.maxValue,
      trungbinh: chiTietKichBan.trungbinh,
      donVi: chiTietKichBan.donVi,
      phanLoai: chiTietKichBan.phanLoai,
      kichBan: chiTietKichBan.kichBan,
    });

    this.kichBansSharedCollection = this.kichBanService.addKichBanToCollectionIfMissing(
      this.kichBansSharedCollection,
      chiTietKichBan.kichBan
    );
  }

  protected loadRelationshipsOptions(): void {
    this.kichBanService
      .query()
      .pipe(map((res: HttpResponse<IKichBan[]>) => res.body ?? []))
      .pipe(
        map((kichBans: IKichBan[]) => this.kichBanService.addKichBanToCollectionIfMissing(kichBans, this.editForm.get('kichBan')!.value))
      )
      .subscribe((kichBans: IKichBan[]) => (this.kichBansSharedCollection = kichBans));
  }

  protected createFromForm(): IChiTietKichBan {
    return {
      ...new ChiTietKichBan(),
      id: this.editForm.get(['id'])!.value,
      maKichBan: this.editForm.get(['maKichBan'])!.value,
      trangThai: this.editForm.get(['trangThai'])!.value,
      thongSo: this.editForm.get(['thongSo'])!.value,
      minValue: this.editForm.get(['minValue'])!.value,
      maxValue: this.editForm.get(['maxValue'])!.value,
      trungbinh: this.editForm.get(['trungbinh'])!.value,
      donVi: this.editForm.get(['donVi'])!.value,
      phanLoai: this.editForm.get(['phanLoai'])!.value,
      kichBan: this.editForm.get(['kichBan'])!.value,
    };
  }
}
