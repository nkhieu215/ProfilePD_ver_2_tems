import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ChiTietLenhSanXuatService } from '../service/chi-tiet-lenh-san-xuat.service';
import { IChiTietLenhSanXuat, ChiTietLenhSanXuat } from '../chi-tiet-lenh-san-xuat.model';
import { ILenhSanXuat } from 'app/entities/lenh-san-xuat/lenh-san-xuat.model';
import { LenhSanXuatService } from 'app/entities/lenh-san-xuat/service/lenh-san-xuat.service';

import { ChiTietLenhSanXuatUpdateComponent } from './chi-tiet-lenh-san-xuat-update.component';
import { SessionStorageService } from 'ngx-webstorage';

describe('ChiTietLenhSanXuat Management Update Component', () => {
  let comp: ChiTietLenhSanXuatUpdateComponent;
  let fixture: ComponentFixture<ChiTietLenhSanXuatUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let chiTietLenhSanXuatService: ChiTietLenhSanXuatService;
  let lenhSanXuatService: LenhSanXuatService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ChiTietLenhSanXuatUpdateComponent],
      providers: [
        FormBuilder,
        SessionStorageService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(ChiTietLenhSanXuatUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ChiTietLenhSanXuatUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    chiTietLenhSanXuatService = TestBed.inject(ChiTietLenhSanXuatService);
    lenhSanXuatService = TestBed.inject(LenhSanXuatService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call LenhSanXuat query and add missing value', () => {
      const chiTietLenhSanXuat: IChiTietLenhSanXuat = { id: 456 };
      const lenhSanXuat: ILenhSanXuat = { id: 93699 };
      chiTietLenhSanXuat.lenhSanXuat = lenhSanXuat;

      const lenhSanXuatCollection: ILenhSanXuat[] = [{ id: 28657 }];
      jest.spyOn(lenhSanXuatService, 'query').mockReturnValue(of(new HttpResponse({ body: lenhSanXuatCollection })));
      const additionalLenhSanXuats = [lenhSanXuat];
      const expectedCollection: ILenhSanXuat[] = [...additionalLenhSanXuats, ...lenhSanXuatCollection];
      jest.spyOn(lenhSanXuatService, 'addLenhSanXuatToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ chiTietLenhSanXuat });
      comp.ngOnInit();

      expect(lenhSanXuatService.query);
      expect(lenhSanXuatService.addLenhSanXuatToCollectionIfMissing);
      expect(comp.lenhSanXuatsSharedCollection);
    });

    it('Should update editForm', () => {
      const chiTietLenhSanXuat: IChiTietLenhSanXuat = { id: 456 };
      const lenhSanXuat: ILenhSanXuat = { id: 47383 };
      chiTietLenhSanXuat.lenhSanXuat = lenhSanXuat;

      activatedRoute.data = of({ chiTietLenhSanXuat });
      comp.ngOnInit();

      expect(comp.editForm.value);
      expect(comp.lenhSanXuatsSharedCollection);
    });
  });

  // describe('save', () => {
  //   it('Should call update service on save for existing entity', () => {
  //     // GIVEN
  //     const saveSubject = new Subject<HttpResponse<ChiTietLenhSanXuat>>();
  //     const chiTietLenhSanXuat = { id: 123 };
  //     jest.spyOn(chiTietLenhSanXuatService, 'update').mockReturnValue(saveSubject);
  //     jest.spyOn(comp, 'previousState');
  //     activatedRoute.data = of({ chiTietLenhSanXuat });
  //     comp.ngOnInit();

  //     // WHEN
  //     comp.save();
  //     expect(comp.isSaving).toEqual(true);
  //     saveSubject.next(new HttpResponse({ body: chiTietLenhSanXuat }));
  //     saveSubject.complete();

  //     // THEN
  //     expect(comp.previousState).toHaveBeenCalled();
  //     expect(chiTietLenhSanXuatService.update).toHaveBeenCalledWith(chiTietLenhSanXuat);
  //     expect(comp.isSaving).toEqual(false);
  //   });

  //   it('Should call create service on save for new entity', () => {
  //     // GIVEN
  //     const saveSubject = new Subject<HttpResponse<ChiTietLenhSanXuat>>();
  //     const chiTietLenhSanXuat = new ChiTietLenhSanXuat();
  //     jest.spyOn(chiTietLenhSanXuatService, 'create').mockReturnValue(saveSubject);
  //     jest.spyOn(comp, 'previousState');
  //     activatedRoute.data = of({ chiTietLenhSanXuat });
  //     comp.ngOnInit();

  //     // WHEN
  //     comp.save();
  //     expect(comp.isSaving).toEqual(true);
  //     saveSubject.next(new HttpResponse({ body: chiTietLenhSanXuat }));
  //     saveSubject.complete();

  //     // THEN
  //     expect(chiTietLenhSanXuatService.create).toHaveBeenCalledWith(chiTietLenhSanXuat);
  //     expect(comp.isSaving).toEqual(false);
  //     expect(comp.previousState).toHaveBeenCalled();
  //   });

  //   it('Should set isSaving to false on error', () => {
  //     // GIVEN
  //     const saveSubject = new Subject<HttpResponse<ChiTietLenhSanXuat>>();
  //     const chiTietLenhSanXuat = { id: 123 };
  //     jest.spyOn(chiTietLenhSanXuatService, 'update').mockReturnValue(saveSubject);
  //     jest.spyOn(comp, 'previousState');
  //     activatedRoute.data = of({ chiTietLenhSanXuat });
  //     comp.ngOnInit();

  //     // WHEN
  //     comp.save();
  //     expect(comp.isSaving).toEqual(true);
  //     saveSubject.error('This is an error!');

  //     // THEN
  //     expect(chiTietLenhSanXuatService.update).toHaveBeenCalledWith(chiTietLenhSanXuat);
  //     expect(comp.isSaving).toEqual(false);
  //     expect(comp.previousState).not.toHaveBeenCalled();
  //   });
  // });

  // describe('Tracking relationships identifiers', () => {
  //   describe('trackLenhSanXuatById', () => {
  //     it('Should return tracked LenhSanXuat primary key', () => {
  //       const entity = { id: 123 };
  //       const trackResult = comp.trackLenhSanXuatById(0, entity);
  //       expect(trackResult).toEqual(entity.id);
  //     });
  //   });
  // });
});
