import { IChiTietLenhSanXuat } from './../../chi-tiet-lenh-san-xuat/chi-tiet-lenh-san-xuat.model';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ILenhSanXuat, LenhSanXuat } from '../lenh-san-xuat.model';
import { LenhSanXuatService } from '../service/lenh-san-xuat.service';
import { ApplicationConfigService } from 'app/core/config/application-config.service';

@Component({
  selector: 'jhi-lenh-san-xuat-update',
  templateUrl: './lenh-san-xuat-update.component.html',
  styleUrls: ['./lenh-san-xuat-update.component.css'],
})
export class LenhSanXuatUpdateComponent implements OnInit {
  resourceUrl = this.applicationConfigService.getEndpointFor('/api/chi-tiet-lenh-san-xuat');
  chiTietLenhSanXuats: IChiTietLenhSanXuat[] | null = [];

  isSaving = false;
  predicate!: string;
  ascending!: boolean;

  changeStatus: {
    id: number;
    totalQuantity: string;
    trangThai: string;
  } = { id: 0, totalQuantity: '', trangThai: '' };

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
    protected lenhSanXuatService: LenhSanXuatService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder,
    protected applicationConfigService: ApplicationConfigService,
    protected http: HttpClient
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ lenhSanXuat }) => {
      console.log('test:', lenhSanXuat);
      // gán thông tin xác định vào changeStatus
      this.changeStatus.id = lenhSanXuat.id;
      this.changeStatus.totalQuantity = lenhSanXuat.totalQuantity;
      console.log(this.changeStatus);
      this.http.get<any>(`${this.resourceUrl}/${lenhSanXuat.id as number}`).subscribe(res => {
        this.chiTietLenhSanXuats = res;
        console.log('res', res);
        console.log('lenhSanXuat', this.chiTietLenhSanXuats);
      });
      this.updateForm(lenhSanXuat);
    });
  }

  trackId(_index: number, item: IChiTietLenhSanXuat): number {
    return item.id!;
  }

  previousState(): void {
    window.history.back();
  }

  guiPheDuyet(): void {
    // Cần có body : trạng thái, tổng số lượng nếu có sự thay đổi
    // Xác định đối tượng thay đổi
    // gán giá trị tương ứng
    this.changeStatus.trangThai = 'Chờ phê duyệt';
    console.log(this.changeStatus);
    this.http.put<any>(`${this.resourceUrl}/${this.changeStatus.id}`, this.changeStatus).subscribe(() => {
      console.log('Thành công');
    });
  }

  boPhanSanXuatHuy(): void {
    this.changeStatus.trangThai = 'Bộ phận sản xuất huỷ';
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
  }

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

  addRowThongSoTemIn(): void {
    const newRow = {
      id: 0,
    };
  }
}
