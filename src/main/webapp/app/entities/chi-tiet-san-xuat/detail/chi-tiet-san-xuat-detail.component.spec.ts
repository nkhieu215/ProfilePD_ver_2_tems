import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ChiTietSanXuatDetailComponent } from './chi-tiet-san-xuat-detail.component';

describe('ChiTietSanXuat Management Detail Component', () => {
  let comp: ChiTietSanXuatDetailComponent;
  let fixture: ComponentFixture<ChiTietSanXuatDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChiTietSanXuatDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ chiTietSanXuat: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ChiTietSanXuatDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ChiTietSanXuatDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load chiTietSanXuat on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.chiTietSanXuat).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
