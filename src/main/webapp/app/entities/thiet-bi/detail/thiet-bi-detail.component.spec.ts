import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ThietBiDetailComponent } from './thiet-bi-detail.component';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('ThietBi Management Detail Component', () => {
  let comp: ThietBiDetailComponent;
  let fixture: ComponentFixture<ThietBiDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThietBiDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ thietBi: { id: 123 } }) },
        },
        HttpClient,
        HttpHandler,
      ],
    })
      .overrideTemplate(ThietBiDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ThietBiDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load thietBi on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.thietBi).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
