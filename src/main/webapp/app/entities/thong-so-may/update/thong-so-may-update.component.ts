import { ThongSoMayDeleteDialogComponent } from './../delete/thong-so-may-delete-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ITEMS_PER_PAGE, DESC, ASC } from 'app/config/pagination.constants';
import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IThongSoMay, ThongSoMay } from '../thong-so-may.model';
import { ThongSoMayService } from '../service/thong-so-may.service';
import { IThietBi } from 'app/entities/thiet-bi/thiet-bi.model';
import { ThietBiService } from 'app/entities/thiet-bi/service/thiet-bi.service';

@Component({
  selector: 'jhi-thong-so-may-update',
  templateUrl: './thong-so-may-update.component.html',
  styleUrls: ['./thong-so-may-update.css'],
})
export class ThongSoMayUpdateComponent implements OnInit {
  thongSoMays?: IThongSoMay[] = [
    // {
    //   id : 0,
    //   maThietBi : '',
    //   loaiThietBi : '',
    //   thongSo : '',
    //   moTa : '',
    //   trangThai : '',
    //   phanLoai : '',
    // },
  ];

  form: FormGroup = new FormGroup({});

  isSaving = false;
  isLoading = false;
  page?: number;
  itemsPerPage = ITEMS_PER_PAGE;
  totalItems = 0;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  thietBisSharedCollection: IThietBi[] = [];

  editForm = this.fb.group({
    id: [],
    maThietBi: [],
    loaiThietBi: [],
    hangTms: [],
    thongSo: [],
    moTa: [],
    trangThai: [],
    phanLoai: [],
    thietBi: [],
  });

  constructor(
    protected thongSoMayService: ThongSoMayService,
    protected thietBiService: ThietBiService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder,
    protected router: Router,
    protected modalService: NgbModal
  ) {}

  loadPage(page?: number, dontNavigate?: boolean): void {
    this.isLoading = true;
    const pageToLoad: number = page ?? this.page ?? 1;

    this.thongSoMayService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe({
        next: (res: HttpResponse<IThongSoMay[]>) => {
          this.isLoading = false;
          this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate);
        },
        error: () => {
          this.isLoading = false;
          this.onError();
        },
      });
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ thongSoMay }) => {
      this.updateForm(thongSoMay);

      this.loadRelationshipsOptions();

      const maThietBiControl = this.form.get('maThietBi');
      if (maThietBiControl) {
        maThietBiControl.valueChanges.subscribe((selectedMaThietBiId: number | undefined) => {
          const selectedMaThietBi = this.thietBisSharedCollection.find(tb => tb.id === selectedMaThietBiId);
          if (selectedMaThietBi) {
            this.form.patchValue({
              loaiThietBi: selectedMaThietBi.loaiThietBi,
              dayChuyen: selectedMaThietBi.dayChuyen,
            });
          }
        });
      }

      // this.form.get('maThietBi').valueChanges.subscribe((selectedMaThietBiId: number ) => {
      //   const selectedMaThietBi = this.thietBisSharedCollection.find(tb => tb.id === selectedMaThietBiId);
      //   if (selectedMaThietBi) {
      //     this.form.patchValue({
      //       loaiThietBi: selectedMaThietBi.loaiThietBi,
      //       dayChuyen: selectedMaThietBi.dayChuyen,
      //     });
      //   }
      // })
    });
  }

  trackId(_index: number, item: IThongSoMay): number {
    return item.id!;
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const thongSoMay = this.createFromForm();
    if (thongSoMay.id !== undefined) {
      this.subscribeToSaveResponse(this.thongSoMayService.update(thongSoMay));
    } else {
      this.subscribeToSaveResponse(this.thongSoMayService.create(thongSoMay));
    }
  }

  trackThietBiById(_index: number, item: IThietBi): number {
    return item.id!;
  }

  delete(thongSoMay: IThongSoMay): void {
    const modalRef = this.modalService.open(ThongSoMayDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.thongSoMay = thongSoMay;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadPage();
      }
    });
  }

  protected sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? ASC : DESC)];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: IThongSoMay[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    if (navigate) {
      this.router.navigate(['/thong-so-may'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? ASC : DESC),
        },
      });
    }
    this.thongSoMays = data ?? [];
    this.ngbPaginationPage = this.page;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IThongSoMay>>): void {
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

  protected updateForm(thongSoMay: IThongSoMay): void {
    this.editForm.patchValue({
      id: thongSoMay.id,
      maThietBi: thongSoMay.maThietBi,
      loaiThietBi: thongSoMay.loaiThietBi,
      hangTms: thongSoMay.hangTms,
      thongSo: thongSoMay.thongSo,
      moTa: thongSoMay.moTa,
      trangThai: thongSoMay.trangThai,
      phanLoai: thongSoMay.phanLoai,
      thietBi: thongSoMay.thietBi,
    });

    this.thietBisSharedCollection = this.thietBiService.addThietBiToCollectionIfMissing(this.thietBisSharedCollection, thongSoMay.thietBi);
  }

  protected loadRelationshipsOptions(): void {
    this.thietBiService
      .query()
      .pipe(map((res: HttpResponse<IThietBi[]>) => res.body ?? []))
      .pipe(
        map((thietBis: IThietBi[]) => this.thietBiService.addThietBiToCollectionIfMissing(thietBis, this.editForm.get('thietBi')!.value))
      )
      .subscribe((thietBis: IThietBi[]) => (this.thietBisSharedCollection = thietBis));
  }

  protected createFromForm(): IThongSoMay {
    return {
      ...new ThongSoMay(),
      id: this.editForm.get(['id'])!.value,
      maThietBi: this.editForm.get(['maThietBi'])!.value,
      loaiThietBi: this.editForm.get(['loaiThietBi'])!.value,
      hangTms: this.editForm.get(['hangTms'])!.value,
      thongSo: this.editForm.get(['thongSo'])!.value,
      moTa: this.editForm.get(['moTa'])!.value,
      trangThai: this.editForm.get(['trangThai'])!.value,
      phanLoai: this.editForm.get(['phanLoai'])!.value,
      thietBi: this.editForm.get(['thietBi'])!.value,
    };
  }
}
