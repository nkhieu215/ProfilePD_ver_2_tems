import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ThietBiService } from '../service/thiet-bi.service';
import { IThietBi, ThietBi } from '../thiet-bi.model';

import { ThietBiUpdateComponent } from './thiet-bi-update.component';
import { SessionStorageService } from 'ngx-webstorage';

describe('ThietBi Management Update Component', () => {
  let comp: ThietBiUpdateComponent;
  let fixture: ComponentFixture<ThietBiUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let thietBiService: ThietBiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ThietBiUpdateComponent],
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
      .overrideTemplate(ThietBiUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ThietBiUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    thietBiService = TestBed.inject(ThietBiService);

    comp = fixture.componentInstance;
  });

  // describe('ngOnInit', () => {
  //   it('Should update editForm', () => {
  //     const thietBi: IThietBi = { id: 456 };

  //     activatedRoute.data = of({ thietBi });
  //     comp.ngOnInit();

  //     expect(comp.editForm.value).toEqual(expect.objectContaining(thietBi));
  //   });
  // });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ThietBi>>();
      const thietBi = { id: 123 };
      jest.spyOn(thietBiService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ thietBi });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: thietBi }));
      saveSubject.complete();

      // THEN
      // expect(comp.previousState).toHaveBeenCalled();
      expect(thietBiService.update).toHaveBeenCalledWith(thietBi);
      expect(comp.isSaving).toEqual(false);
    });

    //   it('Should call create service on save for new entity', () => {
    //     // GIVEN
    //     const saveSubject = new Subject<HttpResponse<ThietBi>>();
    //     const thietBi = new ThietBi();
    //     jest.spyOn(thietBiService, 'create').mockReturnValue(saveSubject);
    //     jest.spyOn(comp, 'previousState');
    //     activatedRoute.data = of({ thietBi });
    //     comp.ngOnInit();

    //     // WHEN
    //     comp.save();
    //     expect(comp.isSaving).toEqual(true);
    //     saveSubject.next(new HttpResponse({ body: thietBi }));
    //     saveSubject.complete();

    //     // THEN
    //     expect(thietBiService.create).toHaveBeenCalledWith(thietBi);
    //     expect(comp.isSaving).toEqual(false);
    //     expect(comp.previousState).toHaveBeenCalled();
    //   });

    //   it('Should set isSaving to false on error', () => {
    //     // GIVEN
    //     const saveSubject = new Subject<HttpResponse<ThietBi>>();
    //     const thietBi = { id: 123 };
    //     jest.spyOn(thietBiService, 'update').mockReturnValue(saveSubject);
    //     jest.spyOn(comp, 'previousState');
    //     activatedRoute.data = of({ thietBi });
    //     comp.ngOnInit();

    //     // WHEN
    //     comp.save();
    //     expect(comp.isSaving).toEqual(true);
    //     saveSubject.error('This is an error!');

    //     // THEN
    //     expect(thietBiService.update).toHaveBeenCalledWith(thietBi);
    //     expect(comp.isSaving).toEqual(false);
    //     expect(comp.previousState).not.toHaveBeenCalled();
    //   });
  });
});
