import { Account } from './../../../core/auth/account.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IThietBi } from 'app/entities/thiet-bi/thiet-bi.model';
import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IQuanLyThongSo, QuanLyThongSo } from '../quan-ly-thong-so.model';
import { QuanLyThongSoService } from '../service/quan-ly-thong-so.service';
import { AccountService } from 'app/core/auth/account.service';

@Component({
  selector: 'jhi-quan-ly-thong-so-update',
  templateUrl: './quan-ly-thong-so-update.component.html',
  styleUrls: ['./quan-ly-thong-so-update.css'],
})
export class QuanLyThongSoUpdateComponent implements OnInit {
  isSaving = false;
  predicate!: string;
  ascending!: boolean;
  account: Account | null = null;

  public showSuccessPopup = false;
  public successMessage = '';

  thongSoThietBi?: IQuanLyThongSo[];

  selectedStatus = 'active';

  result?: string;

  editForm = this.fb.group({
    id: [],
    maThongSo: [],
    tenThongSo: [],
    moTa: [],
    ngayTao: [],
    ngayUpdate: [],
    updateBy: [],
    status: [],
  });

  thietBiQlyThongSo: IThietBi[] = [];
  qLyThongSo: IQuanLyThongSo[] = [];

  form: FormGroup;
  errorMessage: string | null = null;

  constructor(
    protected quanLyThongSoService: QuanLyThongSoService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder,
    protected modalService: NgbModal,
    protected accountService: AccountService
  ) {
    this.form = this.fb.group({
      maThongSo: ['', Validators.required],
      tenThongSo: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.accountService.identity().subscribe(account => {
      this.account = account;
    });
    this.activatedRoute.data.subscribe(({ quanLyThongSo }) => {
      if (quanLyThongSo.id === undefined) {
        const today = dayjs().startOf('millisecond');
        quanLyThongSo.ngayTao = today;
        quanLyThongSo.ngayUpdate = today;
        // console.log('today', quanLyThongSo.ngayTao);
      }
      const today = dayjs().startOf('millisecond');
      quanLyThongSo.ngayUpdate = today;

      this.updateForm(quanLyThongSo);
    });
  }

  areInputFilled(): boolean | undefined {
    return this.form.get('maThongSo')?.valid && this.form.get('tenThongSo')?.valid;
  }

  previousState(): void {
    window.history.back();
    // window.history.pushState({},"",window.location.href);
  }

  openSuccessPopup(): void {
    // console.log('id', this.editForm.get(['id'])!.value);
    if (this.editForm.get(['id'])!.value === undefined) {
      this.result = 'Thêm mới thông số thành công';
    } else {
      this.result = 'Cập nhật thông số thành công';
    }
    this.showSuccessPopup = true;
  }

  closeSuccessPopup(): void {
    this.showSuccessPopup = false;
  }

  save(): void {
    if (this.editForm.valid) {
      this.isSaving = true;
      const quanLyThongSo = this.createFromForm();
      if (quanLyThongSo.id !== undefined) {
        this.showSuccessPopup = false;
        this.subscribeToSaveResponse(this.quanLyThongSoService.update(quanLyThongSo));
      } else {
        this.showSuccessPopup = false;
        this.subscribeToSaveResponse(this.quanLyThongSoService.create(quanLyThongSo));
      }
    } else {
      this.errorMessage = 'Vui lòng điền đầy đủ thông tin';
      // this.toastr.error('Vui lòng điền đầy đủ thông tin', 'Lỗi')
    }
  }

  trackId(_index: number, item: IQuanLyThongSo): number {
    return item.id!;
  }

  trackThietBiById(_index: number, item: IQuanLyThongSo): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IQuanLyThongSo>>): void {
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

  protected updateForm(quanLyThongSo: IQuanLyThongSo): void {
    this.editForm.patchValue({
      id: quanLyThongSo.id,
      maThongSo: quanLyThongSo.maThongSo,
      tenThongSo: quanLyThongSo.tenThongSo,
      moTa: quanLyThongSo.moTa,
      ngayTao: quanLyThongSo.ngayTao ? quanLyThongSo.ngayTao.format(DATE_TIME_FORMAT) : null,
      ngayUpdate: quanLyThongSo.ngayUpdate ? quanLyThongSo.ngayUpdate.format(DATE_TIME_FORMAT) : null,
      updateBy: quanLyThongSo.updateBy,
      status: quanLyThongSo.status,
    });
  }

  protected createFromForm(): IQuanLyThongSo {
    return {
      ...new QuanLyThongSo(),
      id: this.editForm.get(['id'])!.value,
      maThongSo: this.editForm.get(['maThongSo'])!.value,
      tenThongSo: this.editForm.get(['tenThongSo'])!.value,
      moTa: this.editForm.get(['moTa'])!.value,
      ngayTao: this.editForm.get(['ngayTao'])!.value ? dayjs(this.editForm.get(['ngayTao'])!.value, DATE_TIME_FORMAT) : undefined,
      ngayUpdate: this.editForm.get(['ngayUpdate'])!.value ? dayjs(this.editForm.get(['ngayUpdate'])!.value, DATE_TIME_FORMAT) : undefined,
      updateBy: this.account?.login,
      status: this.editForm.get(['status'])!.value,
    };
  }
}
