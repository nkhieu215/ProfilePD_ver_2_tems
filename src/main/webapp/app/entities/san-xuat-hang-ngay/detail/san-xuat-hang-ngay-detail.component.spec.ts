import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SanXuatHangNgayDetailComponent } from './san-xuat-hang-ngay-detail.component';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('SanXuatHangNgay Management Detail Component', () => {
  let comp: SanXuatHangNgayDetailComponent;
  let fixture: ComponentFixture<SanXuatHangNgayDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SanXuatHangNgayDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ sanXuatHangNgay: { id: 123 } }) },
        },
        HttpClient,
        HttpHandler,
      ],
    })
      .overrideTemplate(SanXuatHangNgayDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(SanXuatHangNgayDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load sanXuatHangNgay on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.sanXuatHangNgay).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
