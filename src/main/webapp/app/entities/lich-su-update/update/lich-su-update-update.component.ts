import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { ILichSuUpdate, LichSuUpdate } from '../lich-su-update.model';
import { LichSuUpdateService } from '../service/lich-su-update.service';

@Component({
  selector: 'jhi-lich-su-update-update',
  templateUrl: './lich-su-update-update.component.html',
})
export class LichSuUpdateUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    maKichBan: [],
    maThietBi: [],
    loaiThietBi: [],
    dayChuyen: [],
    maSanPham: [],
    versionSanPham: [],
    timeUpdate: [],
    status: [],
  });

  constructor(protected lichSuUpdateService: LichSuUpdateService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ lichSuUpdate }) => {
      if (lichSuUpdate.id === undefined) {
        const today = dayjs().startOf('day');
        lichSuUpdate.timeUpdate = today;
      }

      this.updateForm(lichSuUpdate);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const lichSuUpdate = this.createFromForm();
    if (lichSuUpdate.id !== undefined) {
      this.subscribeToSaveResponse(this.lichSuUpdateService.update(lichSuUpdate));
    } else {
      this.subscribeToSaveResponse(this.lichSuUpdateService.create(lichSuUpdate));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILichSuUpdate>>): void {
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

  protected updateForm(lichSuUpdate: ILichSuUpdate): void {
    this.editForm.patchValue({
      id: lichSuUpdate.id,
      maKichBan: lichSuUpdate.maKichBan,
      maThietBi: lichSuUpdate.maThietBi,
      loaiThietBi: lichSuUpdate.loaiThietBi,
      dayChuyen: lichSuUpdate.dayChuyen,
      maSanPham: lichSuUpdate.maSanPham,
      versionSanPham: lichSuUpdate.versionSanPham,
      timeUpdate: lichSuUpdate.timeUpdate ? lichSuUpdate.timeUpdate.format(DATE_TIME_FORMAT) : null,
      status: lichSuUpdate.status,
    });
  }

  protected createFromForm(): ILichSuUpdate {
    return {
      ...new LichSuUpdate(),
      id: this.editForm.get(['id'])!.value,
      maKichBan: this.editForm.get(['maKichBan'])!.value,
      maThietBi: this.editForm.get(['maThietBi'])!.value,
      loaiThietBi: this.editForm.get(['loaiThietBi'])!.value,
      dayChuyen: this.editForm.get(['dayChuyen'])!.value,
      maSanPham: this.editForm.get(['maSanPham'])!.value,
      versionSanPham: this.editForm.get(['versionSanPham'])!.value,
      timeUpdate: this.editForm.get(['timeUpdate'])!.value ? dayjs(this.editForm.get(['timeUpdate'])!.value, DATE_TIME_FORMAT) : undefined,
      status: this.editForm.get(['status'])!.value,
    };
  }
}
