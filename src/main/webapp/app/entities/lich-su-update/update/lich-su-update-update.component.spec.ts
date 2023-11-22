import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { LichSuUpdateService } from '../service/lich-su-update.service';
import { ILichSuUpdate, LichSuUpdate } from '../lich-su-update.model';

import { LichSuUpdateUpdateComponent } from './lich-su-update-update.component';

describe('LichSuUpdate Management Update Component', () => {
  let comp: LichSuUpdateUpdateComponent;
  let fixture: ComponentFixture<LichSuUpdateUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let lichSuUpdateService: LichSuUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [LichSuUpdateUpdateComponent],
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
      .overrideTemplate(LichSuUpdateUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(LichSuUpdateUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    lichSuUpdateService = TestBed.inject(LichSuUpdateService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const lichSuUpdate: ILichSuUpdate = { id: 456 };

      activatedRoute.data = of({ lichSuUpdate });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(lichSuUpdate));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<LichSuUpdate>>();
      const lichSuUpdate = { id: 123 };
      jest.spyOn(lichSuUpdateService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ lichSuUpdate });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: lichSuUpdate }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(lichSuUpdateService.update).toHaveBeenCalledWith(lichSuUpdate);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<LichSuUpdate>>();
      const lichSuUpdate = new LichSuUpdate();
      jest.spyOn(lichSuUpdateService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ lichSuUpdate });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: lichSuUpdate }));
      saveSubject.complete();

      // THEN
      expect(lichSuUpdateService.create).toHaveBeenCalledWith(lichSuUpdate);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<LichSuUpdate>>();
      const lichSuUpdate = { id: 123 };
      jest.spyOn(lichSuUpdateService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ lichSuUpdate });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(lichSuUpdateService.update).toHaveBeenCalledWith(lichSuUpdate);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
