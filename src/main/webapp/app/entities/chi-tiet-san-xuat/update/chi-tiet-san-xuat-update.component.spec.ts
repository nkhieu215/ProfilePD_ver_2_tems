import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ChiTietSanXuatService } from '../service/chi-tiet-san-xuat.service';
import { IChiTietSanXuat, ChiTietSanXuat } from '../chi-tiet-san-xuat.model';
import { ISanXuatHangNgay } from 'app/entities/san-xuat-hang-ngay/san-xuat-hang-ngay.model';
import { SanXuatHangNgayService } from 'app/entities/san-xuat-hang-ngay/service/san-xuat-hang-ngay.service';

import { ChiTietSanXuatUpdateComponent } from './chi-tiet-san-xuat-update.component';

describe('ChiTietSanXuat Management Update Component', () => {
  let comp: ChiTietSanXuatUpdateComponent;
  let fixture: ComponentFixture<ChiTietSanXuatUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let chiTietSanXuatService: ChiTietSanXuatService;
  let sanXuatHangNgayService: SanXuatHangNgayService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ChiTietSanXuatUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(ChiTietSanXuatUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ChiTietSanXuatUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    chiTietSanXuatService = TestBed.inject(ChiTietSanXuatService);
    sanXuatHangNgayService = TestBed.inject(SanXuatHangNgayService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call SanXuatHangNgay query and add missing value', () => {
      const chiTietSanXuat: IChiTietSanXuat = { id: 456 };
      const sanXuatHangNgay: ISanXuatHangNgay = { id: 32949 };
      chiTietSanXuat.sanXuatHangNgay = sanXuatHangNgay;

      const sanXuatHangNgayCollection: ISanXuatHangNgay[] = [{ id: 12395 }];
      jest.spyOn(sanXuatHangNgayService, 'query').mockReturnValue(of(new HttpResponse({ body: sanXuatHangNgayCollection })));
      const additionalSanXuatHangNgays = [sanXuatHangNgay];
      const expectedCollection: ISanXuatHangNgay[] = [...additionalSanXuatHangNgays, ...sanXuatHangNgayCollection];
      jest.spyOn(sanXuatHangNgayService, 'addSanXuatHangNgayToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ chiTietSanXuat });
      comp.ngOnInit();

      expect(sanXuatHangNgayService.query).toHaveBeenCalled();
      expect(sanXuatHangNgayService.addSanXuatHangNgayToCollectionIfMissing).toHaveBeenCalledWith(
        sanXuatHangNgayCollection,
        ...additionalSanXuatHangNgays
      );
      expect(comp.sanXuatHangNgaysSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const chiTietSanXuat: IChiTietSanXuat = { id: 456 };
      const sanXuatHangNgay: ISanXuatHangNgay = { id: 18342 };
      chiTietSanXuat.sanXuatHangNgay = sanXuatHangNgay;

      activatedRoute.data = of({ chiTietSanXuat });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(chiTietSanXuat));
      expect(comp.sanXuatHangNgaysSharedCollection).toContain(sanXuatHangNgay);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ChiTietSanXuat>>();
      const chiTietSanXuat = { id: 123 };
      jest.spyOn(chiTietSanXuatService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ chiTietSanXuat });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: chiTietSanXuat }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(chiTietSanXuatService.update).toHaveBeenCalledWith(chiTietSanXuat);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ChiTietSanXuat>>();
      const chiTietSanXuat = new ChiTietSanXuat();
      jest.spyOn(chiTietSanXuatService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ chiTietSanXuat });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: chiTietSanXuat }));
      saveSubject.complete();

      // THEN
      expect(chiTietSanXuatService.create).toHaveBeenCalledWith(chiTietSanXuat);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ChiTietSanXuat>>();
      const chiTietSanXuat = { id: 123 };
      jest.spyOn(chiTietSanXuatService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ chiTietSanXuat });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(chiTietSanXuatService.update).toHaveBeenCalledWith(chiTietSanXuat);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackSanXuatHangNgayById', () => {
      it('Should return tracked SanXuatHangNgay primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackSanXuatHangNgayById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
