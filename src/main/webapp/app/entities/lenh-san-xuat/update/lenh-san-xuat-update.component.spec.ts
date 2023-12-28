import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { LenhSanXuatService } from '../service/lenh-san-xuat.service';
import { ILenhSanXuat, LenhSanXuat } from '../lenh-san-xuat.model';

import { LenhSanXuatUpdateComponent } from './lenh-san-xuat-update.component';
import { SessionStorageService } from 'ngx-webstorage';

describe('LenhSanXuat Management Update Component', () => {
  let comp: LenhSanXuatUpdateComponent;
  let fixture: ComponentFixture<LenhSanXuatUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let lenhSanXuatService: LenhSanXuatService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [LenhSanXuatUpdateComponent],
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
      .overrideTemplate(LenhSanXuatUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(LenhSanXuatUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    lenhSanXuatService = TestBed.inject(LenhSanXuatService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const lenhSanXuat: ILenhSanXuat = { id: 456 };

      activatedRoute.data = of({ lenhSanXuat });
      comp.ngOnInit();

      expect(comp.editForm.value);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<LenhSanXuat>>();
      const lenhSanXuat = { id: 123 };
      jest.spyOn(lenhSanXuatService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ lenhSanXuat });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving);
      saveSubject.next(new HttpResponse({ body: lenhSanXuat }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState);
      expect(lenhSanXuatService.update);
      expect(comp.isSaving);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<LenhSanXuat>>();
      const lenhSanXuat = new LenhSanXuat();
      jest.spyOn(lenhSanXuatService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ lenhSanXuat });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving);
      saveSubject.next(new HttpResponse({ body: lenhSanXuat }));
      saveSubject.complete();

      // THEN
      expect(lenhSanXuatService.create);
      expect(comp.isSaving);
      expect(comp.previousState);
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<LenhSanXuat>>();
      const lenhSanXuat = { id: 123 };
      jest.spyOn(lenhSanXuatService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ lenhSanXuat });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving);
      saveSubject.error('This is an error!');

      // THEN
      expect(lenhSanXuatService.update);
      expect(comp.isSaving);
      expect(comp.previousState);
    });
  });
});
