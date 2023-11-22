import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ChiTietLichSuUpdateService } from '../service/chi-tiet-lich-su-update.service';
import { IChiTietLichSuUpdate, ChiTietLichSuUpdate } from '../chi-tiet-lich-su-update.model';
import { ILichSuUpdate } from 'app/entities/lich-su-update/lich-su-update.model';
import { LichSuUpdateService } from 'app/entities/lich-su-update/service/lich-su-update.service';

import { ChiTietLichSuUpdateUpdateComponent } from './chi-tiet-lich-su-update-update.component';

describe('ChiTietLichSuUpdate Management Update Component', () => {
  let comp: ChiTietLichSuUpdateUpdateComponent;
  let fixture: ComponentFixture<ChiTietLichSuUpdateUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let chiTietLichSuUpdateService: ChiTietLichSuUpdateService;
  let lichSuUpdateService: LichSuUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ChiTietLichSuUpdateUpdateComponent],
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
      .overrideTemplate(ChiTietLichSuUpdateUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ChiTietLichSuUpdateUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    chiTietLichSuUpdateService = TestBed.inject(ChiTietLichSuUpdateService);
    lichSuUpdateService = TestBed.inject(LichSuUpdateService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call LichSuUpdate query and add missing value', () => {
      const chiTietLichSuUpdate: IChiTietLichSuUpdate = { id: 456 };
      const lichSuUpdate: ILichSuUpdate = { id: 37518 };
      chiTietLichSuUpdate.lichSuUpdate = lichSuUpdate;

      const lichSuUpdateCollection: ILichSuUpdate[] = [{ id: 58370 }];
      jest.spyOn(lichSuUpdateService, 'query').mockReturnValue(of(new HttpResponse({ body: lichSuUpdateCollection })));
      const additionalLichSuUpdates = [lichSuUpdate];
      const expectedCollection: ILichSuUpdate[] = [...additionalLichSuUpdates, ...lichSuUpdateCollection];
      jest.spyOn(lichSuUpdateService, 'addLichSuUpdateToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ chiTietLichSuUpdate });
      comp.ngOnInit();

      expect(lichSuUpdateService.query).toHaveBeenCalled();
      expect(lichSuUpdateService.addLichSuUpdateToCollectionIfMissing).toHaveBeenCalledWith(
        lichSuUpdateCollection,
        ...additionalLichSuUpdates
      );
      expect(comp.lichSuUpdatesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const chiTietLichSuUpdate: IChiTietLichSuUpdate = { id: 456 };
      const lichSuUpdate: ILichSuUpdate = { id: 12271 };
      chiTietLichSuUpdate.lichSuUpdate = lichSuUpdate;

      activatedRoute.data = of({ chiTietLichSuUpdate });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(chiTietLichSuUpdate));
      expect(comp.lichSuUpdatesSharedCollection).toContain(lichSuUpdate);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ChiTietLichSuUpdate>>();
      const chiTietLichSuUpdate = { id: 123 };
      jest.spyOn(chiTietLichSuUpdateService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ chiTietLichSuUpdate });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: chiTietLichSuUpdate }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(chiTietLichSuUpdateService.update).toHaveBeenCalledWith(chiTietLichSuUpdate);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ChiTietLichSuUpdate>>();
      const chiTietLichSuUpdate = new ChiTietLichSuUpdate();
      jest.spyOn(chiTietLichSuUpdateService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ chiTietLichSuUpdate });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: chiTietLichSuUpdate }));
      saveSubject.complete();

      // THEN
      expect(chiTietLichSuUpdateService.create).toHaveBeenCalledWith(chiTietLichSuUpdate);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ChiTietLichSuUpdate>>();
      const chiTietLichSuUpdate = { id: 123 };
      jest.spyOn(chiTietLichSuUpdateService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ chiTietLichSuUpdate });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(chiTietLichSuUpdateService.update).toHaveBeenCalledWith(chiTietLichSuUpdate);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackLichSuUpdateById', () => {
      it('Should return tracked LichSuUpdate primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackLichSuUpdateById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
