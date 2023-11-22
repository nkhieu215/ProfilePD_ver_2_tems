import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ChiTietKichBanService } from '../service/chi-tiet-kich-ban.service';
import { IChiTietKichBan, ChiTietKichBan } from '../chi-tiet-kich-ban.model';
import { IKichBan } from 'app/entities/kich-ban/kich-ban.model';
import { KichBanService } from 'app/entities/kich-ban/service/kich-ban.service';

import { ChiTietKichBanUpdateComponent } from './chi-tiet-kich-ban-update.component';

describe('ChiTietKichBan Management Update Component', () => {
  let comp: ChiTietKichBanUpdateComponent;
  let fixture: ComponentFixture<ChiTietKichBanUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let chiTietKichBanService: ChiTietKichBanService;
  let kichBanService: KichBanService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ChiTietKichBanUpdateComponent],
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
      .overrideTemplate(ChiTietKichBanUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ChiTietKichBanUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    chiTietKichBanService = TestBed.inject(ChiTietKichBanService);
    kichBanService = TestBed.inject(KichBanService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call KichBan query and add missing value', () => {
      const chiTietKichBan: IChiTietKichBan = { id: 456 };
      const kichBan: IKichBan = { id: 29292 };
      chiTietKichBan.kichBan = kichBan;

      const kichBanCollection: IKichBan[] = [{ id: 39393 }];
      jest.spyOn(kichBanService, 'query').mockReturnValue(of(new HttpResponse({ body: kichBanCollection })));
      const additionalKichBans = [kichBan];
      const expectedCollection: IKichBan[] = [...additionalKichBans, ...kichBanCollection];
      jest.spyOn(kichBanService, 'addKichBanToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ chiTietKichBan });
      comp.ngOnInit();

      expect(kichBanService.query).toHaveBeenCalled();
      expect(kichBanService.addKichBanToCollectionIfMissing).toHaveBeenCalledWith(kichBanCollection, ...additionalKichBans);
      expect(comp.kichBansSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const chiTietKichBan: IChiTietKichBan = { id: 456 };
      const kichBan: IKichBan = { id: 87448 };
      chiTietKichBan.kichBan = kichBan;

      activatedRoute.data = of({ chiTietKichBan });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(chiTietKichBan));
      expect(comp.kichBansSharedCollection).toContain(kichBan);
    });
  });

  // describe('save', () => {
  //   it('Should call update service on save for existing entity', () => {
  //     // GIVEN
  //     const saveSubject = new Subject<HttpResponse<ChiTietKichBan>>();
  //     const chiTietKichBan = { id: 123 };
  //     jest.spyOn(chiTietKichBanService, 'update').mockReturnValue(saveSubject);
  //     jest.spyOn(comp, 'previousState');
  //     activatedRoute.data = of({ chiTietKichBan });
  //     comp.ngOnInit();

  //     // WHEN
  //     comp.save();
  //     expect(comp.isSaving).toEqual(true);
  //     saveSubject.next(new HttpResponse({ body: chiTietKichBan }));
  //     saveSubject.complete();

  //     // THEN
  //     expect(comp.previousState).toHaveBeenCalled();
  //     expect(chiTietKichBanService.update).toHaveBeenCalledWith(chiTietKichBan);
  //     expect(comp.isSaving).toEqual(false);
  //   });

  //   it('Should call create service on save for new entity', () => {
  //     // GIVEN
  //     const saveSubject = new Subject<HttpResponse<ChiTietKichBan>>();
  //     const chiTietKichBan = new ChiTietKichBan();
  //     jest.spyOn(chiTietKichBanService, 'create').mockReturnValue(saveSubject);
  //     jest.spyOn(comp, 'previousState');
  //     activatedRoute.data = of({ chiTietKichBan });
  //     comp.ngOnInit();

  //     // WHEN
  //     comp.save();
  //     expect(comp.isSaving);

  //     saveSubject.complete();

  //     // THEN
  //     expect(chiTietKichBanService.create);
  //     expect(comp.isSaving);
  //     expect(comp.previousState);
  //   });

  //   it('Should set isSaving to false on error', () => {
  //     // GIVEN
  //     const saveSubject = new Subject<HttpResponse<ChiTietKichBan>>();
  //     const chiTietKichBan = { id: 123 };
  //     jest.spyOn(chiTietKichBanService, 'update').mockReturnValue(saveSubject);
  //     jest.spyOn(comp, 'previousState');
  //     activatedRoute.data = of({ chiTietKichBan });
  //     comp.ngOnInit();

  //     // WHEN
  //     comp.save();
  //     expect(comp.save());
  //     saveSubject.error('This is an error!');

  //     // THEN
  //     expect(chiTietKichBanService.update);
  //     expect(comp.isSaving);
  //     expect(comp.previousState);
  //   });
  // });

  describe('Tracking relationships identifiers', () => {
    describe('trackKichBanById', () => {
      it('Should return tracked KichBan primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackKichBanById(0, entity);
        expect(trackResult);
      });
    });
  });
});
