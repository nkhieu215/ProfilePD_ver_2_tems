import { ThietBi } from './../thiet-bi.model';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import dayjs from 'dayjs/esm';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ThietBiService } from 'app/entities/thiet-bi/service/thiet-bi.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IThietBi } from 'app/entities/thiet-bi/thiet-bi.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'jhi-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  resourceUrl = this.applicationConfigService.getEndpointFor('api/thiet-bi/cap-nhat');
  resourceUrlAdd = this.applicationConfigService.getEndpointFor('api//thiet-bi/them-moi-thong-so-thiet-bi');
  predicate!: string;
  ascending!: boolean;
  isSaving = false;

  i = 0;
  editId: number | null = null;

  selectedStatus: string | null = null;
  selectedStatusAdd: string | null = null;

  @Input() id = '';
  @Input() idThongSo = '';
  @Input() status = '';
  @Input() maThongSo = '.';
  @Input() moTa = '.';
  @Input() thongSo = '.';
  @Input() phanLoai = '.';
  @Input() maThietBi = '';
  @Input() loaiThietBi = '';

  thietBisSharedCollection: IThietBi[] = [];

  searchResults: IThietBi[] = [];

  form: FormGroup;
  listOfThietBi = [
    {
      id: '',
      idThongSo: '',
      maThongSo: '',
      thongSo: '.',
      moTa: '',
      status: '',
      phanLoai: '.',
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

  constructor(
    protected thietBiService: ThietBiService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {
    this.form = this.fb.group({
      maThietBi: ['', Validators.required],
      loaiThietBi: ['', Validators.required],
      updateBy: ['', Validators.required],
      trangThai: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ thietBi }) => {
      if (thietBi.id === undefined) {
        const today = dayjs().startOf('day');
        thietBi.ngayTao = today;
        thietBi.timeUpdate = today;
      }

      this.updateForm(thietBi);
    });
  }

  onChangeSearch(): void {
    // console.log('Selected Status:', this.selectedStatus);
  }

  onChangeStatus(): void {
    // console.log('Selected Status:', this.selectedStatus);
  }

  trackId(_index: number, item: IThietBi): number {
    return item.id!;
  }

  previousState(): void {
    window.history.back();
  }

  trackThietBiById(_index: number, item: IThietBi): number {
    return item.id!;
  }

  save(): void {
    this.isSaving = true;
    const thietBi = this.createFromForm();
    if (thietBi.id !== undefined) {
      this.subscribeToSaveResponse(this.thietBiService.update(thietBi));
    } else {
      this.subscribeToSaveResponse(this.thietBiService.create(thietBi));
    }
  }

  saveThongSoThietBi(): void {
    this.searchResults = [];
    // console.log(this.maThietBi);
    // this.http.post<any>(this.resourceUrlAdd,this.listOfThietBi).subscribe(res => {
    //   console.log("res", res)
    //   console.log('save', this.listOfThietBi);
    // });
  }

  subscribeToSaveResponse(result: Observable<HttpResponse<IThietBi>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(() =>
      // console.log('res:',res)
      ({
        next: () => this.onSaveSuccess(),
        error: () => this.onSaveError(),
      })
    );
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
    return {
      ...new ThietBi(),
      id: this.editForm.get(['id'])!.value,
      maThietBi: this.editForm.get(['maThietBi'])!.value,
      loaiThietBi: this.editForm.get(['loaiThietBi'])!.value,
      dayChuyen: this.editForm.get(['dayChuyen'])!.value,
      ngayTao: this.editForm.get(['ngayTao'])!.value ? dayjs(this.editForm.get(['ngayTao'])!.value, DATE_TIME_FORMAT) : undefined,
      timeUpdate: this.editForm.get(['timeUpdate'])!.value ? dayjs(this.editForm.get(['timeUpdate'])!.value, DATE_TIME_FORMAT) : undefined,
      updateBy: this.editForm.get(['updateBy'])!.value,
      status: this.editForm.get(['status'])!.value,
    };
  }

  startEdit2(id: number): void {
    this.editId = id;
  }

  stopEdit(): void {
    if (this.editId !== null) {
      this.http.post<any>(this.resourceUrl, this.listOfThietBi[this.editId + 1]).subscribe(
        response => {
          console.log('update thanh cong', response);
        },
        error => {
          console.error('update fail', error);
        }
      );
      this.editId = null;
    }
    this.editId = null;
  }

  addRow(): void {
    const newRow = {
      id: '',
      idThongSo: '',
      maThongSo: '',
      thongSo: '.',
      moTa: '',
      phanLoai: '.',
      status: 'status',
      maThietBi: this.maThietBi,
      loaiThietBi: this.loaiThietBi,
    };

    this.listOfThietBi = [...this.listOfThietBi, newRow];
    // console.log('add row', this.listOfThietBi);
    this.i++;
  }

  // sua lai xoa theo stt va ma thong so (id )
  deleteRow(id: string): void {
    this.listOfThietBi = this.listOfThietBi.filter(d => d.id !== id && d.idThongSo !== this.idThongSo);
    // this.listOfThietBi = this.listOfThietBi.filter(d => d.id !== this.id && d.idThongSo !== this.idThongSo);
  }
}
