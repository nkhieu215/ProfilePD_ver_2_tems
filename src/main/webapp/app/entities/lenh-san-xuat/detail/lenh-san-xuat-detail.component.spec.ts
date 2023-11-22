import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LenhSanXuatDetailComponent } from './lenh-san-xuat-detail.component';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('LenhSanXuat Management Detail Component', () => {
  let comp: LenhSanXuatDetailComponent;
  let fixture: ComponentFixture<LenhSanXuatDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LenhSanXuatDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ lenhSanXuat: { id: 123 } }) },
        },
        HttpClient,
        HttpHandler,
      ],
    })
      .overrideTemplate(LenhSanXuatDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(LenhSanXuatDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load lenhSanXuat on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.lenhSanXuat).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
