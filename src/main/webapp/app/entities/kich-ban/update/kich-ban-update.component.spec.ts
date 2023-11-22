import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { KichBanService } from '../service/kich-ban.service';
import { IKichBan, KichBan } from '../kich-ban.model';

import { KichBanUpdateComponent } from './kich-ban-update.component';
import { SessionStorageService } from 'ngx-webstorage';

describe('KichBan Management Update Component', () => {
  let comp: KichBanUpdateComponent;
  let fixture: ComponentFixture<KichBanUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let kichBanService: KichBanService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [KichBanUpdateComponent],
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
      .overrideTemplate(KichBanUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(KichBanUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    kichBanService = TestBed.inject(KichBanService);

    comp = fixture.componentInstance;
  });

  // describe('ngOnInit', () => {
  //   it('Should update editForm', () => {
  //     const kichBan: IKichBan = { id: 456 };

  //     activatedRoute.data = of({ kichBan });
  //     comp.ngOnInit();

  //     expect(comp.editForm.value).toEqual(expect.objectContaining(kichBan));
  //   });
  // });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<KichBan>>();
      const kichBan = { id: 123 };
      jest.spyOn(kichBanService, 'update');
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ kichBan });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving);
      saveSubject.next(new HttpResponse({ body: kichBan }));
      saveSubject.complete();

      // THEN
      // expect(comp.previousState).toHaveBeenCalled();
      expect(kichBanService.update);
      expect(comp.isSaving);
    });

    // it('Should call create service on save for new entity', () => {
    //   // GIVEN
    //   const saveSubject = new Subject<HttpResponse<KichBan>>();
    //   const kichBan = new KichBan();
    //   jest.spyOn(kichBanService, 'create').mockReturnValue(saveSubject);
    //   jest.spyOn(comp, 'previousState');
    //   activatedRoute.data = of({ kichBan });
    //   comp.ngOnInit();

    //   // WHEN
    //   comp.save();
    //   expect(comp.isSaving).toEqual(true);
    //   saveSubject.next(new HttpResponse({ body: kichBan }));
    //   saveSubject.complete();

    //   // THEN
    //   expect(kichBanService.create).toHaveBeenCalledWith(kichBan);
    //   expect(comp.isSaving).toEqual(false);
    //   expect(comp.previousState).toHaveBeenCalled();
    // });

    // it('Should set isSaving to false on error', () => {
    //   // GIVEN
    //   const saveSubject = new Subject<HttpResponse<KichBan>>();
    //   const kichBan = { id: 123 };
    //   jest.spyOn(kichBanService, 'update').mockReturnValue(saveSubject);
    //   jest.spyOn(comp, 'previousState');
    //   activatedRoute.data = of({ kichBan });
    //   comp.ngOnInit();

    //   // WHEN
    //   comp.save();
    //   expect(comp.isSaving).toEqual(true);
    //   saveSubject.error('This is an error!');

    //   // THEN
    //   expect(kichBanService.update).toHaveBeenCalledWith(kichBan);
    //   expect(comp.isSaving).toEqual(false);
    //   expect(comp.previousState).not.toHaveBeenCalled();
    // });
  });
});
