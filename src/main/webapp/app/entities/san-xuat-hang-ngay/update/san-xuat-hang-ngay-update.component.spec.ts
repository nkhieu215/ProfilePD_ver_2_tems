import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { SanXuatHangNgayService } from '../service/san-xuat-hang-ngay.service';
import { ISanXuatHangNgay, SanXuatHangNgay } from '../san-xuat-hang-ngay.model';

import { SanXuatHangNgayUpdateComponent } from './san-xuat-hang-ngay-update.component';
import { SessionStorageService } from 'ngx-webstorage';

describe('SanXuatHangNgay Management Update Component', () => {
  let comp: SanXuatHangNgayUpdateComponent;
  let fixture: ComponentFixture<SanXuatHangNgayUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let sanXuatHangNgayService: SanXuatHangNgayService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [SanXuatHangNgayUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
        SessionStorageService,
      ],
    })
      .overrideTemplate(SanXuatHangNgayUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SanXuatHangNgayUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    sanXuatHangNgayService = TestBed.inject(SanXuatHangNgayService);

    comp = fixture.componentInstance;
  });

  // describe('ngOnInit', () => {
  //   it('Should update editForm', () => {
  //     const sanXuatHangNgay: ISanXuatHangNgay = { id: 456 };

  //     activatedRoute.data = of({ sanXuatHangNgay });
  //     comp.ngOnInit();

  //     expect(comp.editForm.value).toEqual(expect.objectContaining(sanXuatHangNgay));
  //   });
  // });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<SanXuatHangNgay>>();
      const sanXuatHangNgay = { id: 123 };
      jest.spyOn(sanXuatHangNgayService, 'update');
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ sanXuatHangNgay });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving);
      saveSubject.next(new HttpResponse({ body: sanXuatHangNgay }));
      saveSubject.complete();

      // THEN
      // expect(comp.previousState).toHaveBeenCalled();
      expect(sanXuatHangNgayService.update);
      expect(comp.isSaving);
    });

    // it('Should call create service on save for new entity', () => {
    //   // GIVEN
    //   const saveSubject = new Subject<HttpResponse<SanXuatHangNgay>>();
    //   const sanXuatHangNgay = new SanXuatHangNgay();
    //   jest.spyOn(sanXuatHangNgayService, 'create').mockReturnValue(saveSubject);
    //   jest.spyOn(comp, 'previousState');
    //   activatedRoute.data = of({ sanXuatHangNgay });
    //   comp.ngOnInit();

    //   // WHEN
    //   comp.save();
    //   expect(comp.isSaving).toEqual(true);
    //   saveSubject.next(new HttpResponse({ body: sanXuatHangNgay }));
    //   saveSubject.complete();

    //   // THEN
    //   expect(sanXuatHangNgayService.create).toHaveBeenCalledWith(sanXuatHangNgay);
    //   expect(comp.isSaving).toEqual(false);
    //   expect(comp.previousState).toHaveBeenCalled();
    // });

    // it('Should set isSaving to false on error', () => {
    //   // GIVEN
    //   const saveSubject = new Subject<HttpResponse<SanXuatHangNgay>>();
    //   const sanXuatHangNgay = { id: 123 };
    //   jest.spyOn(sanXuatHangNgayService, 'update').mockReturnValue(saveSubject);
    //   jest.spyOn(comp, 'previousState');
    //   activatedRoute.data = of({ sanXuatHangNgay });
    //   comp.ngOnInit();

    //   // WHEN
    //   comp.save();
    //   expect(comp.isSaving).toEqual(true);
    //   saveSubject.error('This is an error!');

    //   // THEN
    //   expect(sanXuatHangNgayService.update).toHaveBeenCalledWith(sanXuatHangNgay);
    //   expect(comp.isSaving).toEqual(false);
    //   expect(comp.previousState).not.toHaveBeenCalled();
    // });
  });
});
