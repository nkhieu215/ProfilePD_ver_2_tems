import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ThongSoMayService } from '../service/thong-so-may.service';
import { IThongSoMay, ThongSoMay } from '../thong-so-may.model';
import { IThietBi } from 'app/entities/thiet-bi/thiet-bi.model';
import { ThietBiService } from 'app/entities/thiet-bi/service/thiet-bi.service';

import { ThongSoMayUpdateComponent } from './thong-so-may-update.component';

describe('ThongSoMay Management Update Component', () => {
  let comp: ThongSoMayUpdateComponent;
  let fixture: ComponentFixture<ThongSoMayUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let thongSoMayService: ThongSoMayService;
  let thietBiService: ThietBiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ThongSoMayUpdateComponent],
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
      .overrideTemplate(ThongSoMayUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ThongSoMayUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    thongSoMayService = TestBed.inject(ThongSoMayService);
    thietBiService = TestBed.inject(ThietBiService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call ThietBi query and add missing value', () => {
      const thongSoMay: IThongSoMay = { id: 456 };
      const thietBi: IThietBi = { id: 96023 };
      thongSoMay.thietBi = thietBi;

      const thietBiCollection: IThietBi[] = [{ id: 41508 }];
      jest.spyOn(thietBiService, 'query').mockReturnValue(of(new HttpResponse({ body: thietBiCollection })));
      const additionalThietBis = [thietBi];
      const expectedCollection: IThietBi[] = [...additionalThietBis, ...thietBiCollection];
      jest.spyOn(thietBiService, 'addThietBiToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ thongSoMay });
      comp.ngOnInit();

      expect(thietBiService.query).toHaveBeenCalled();
      expect(thietBiService.addThietBiToCollectionIfMissing).toHaveBeenCalledWith(thietBiCollection, ...additionalThietBis);
      expect(comp.thietBisSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const thongSoMay: IThongSoMay = { id: 456 };
      const thietBi: IThietBi = { id: 86145 };
      thongSoMay.thietBi = thietBi;

      activatedRoute.data = of({ thongSoMay });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(thongSoMay));
      expect(comp.thietBisSharedCollection).toContain(thietBi);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ThongSoMay>>();
      const thongSoMay = { id: 123 };
      jest.spyOn(thongSoMayService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ thongSoMay });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: thongSoMay }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(thongSoMayService.update).toHaveBeenCalledWith(thongSoMay);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ThongSoMay>>();
      const thongSoMay = new ThongSoMay();
      jest.spyOn(thongSoMayService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ thongSoMay });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: thongSoMay }));
      saveSubject.complete();

      // THEN
      expect(thongSoMayService.create).toHaveBeenCalledWith(thongSoMay);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ThongSoMay>>();
      const thongSoMay = { id: 123 };
      jest.spyOn(thongSoMayService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ thongSoMay });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(thongSoMayService.update).toHaveBeenCalledWith(thongSoMay);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackThietBiById', () => {
      it('Should return tracked ThietBi primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackThietBiById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
