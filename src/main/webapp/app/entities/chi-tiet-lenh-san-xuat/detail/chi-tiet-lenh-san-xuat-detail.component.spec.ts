import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ChiTietLenhSanXuatDetailComponent } from './chi-tiet-lenh-san-xuat-detail.component';

describe('ChiTietLenhSanXuat Management Detail Component', () => {
  let comp: ChiTietLenhSanXuatDetailComponent;
  let fixture: ComponentFixture<ChiTietLenhSanXuatDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChiTietLenhSanXuatDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ chiTietLenhSanXuat: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ChiTietLenhSanXuatDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ChiTietLenhSanXuatDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load chiTietLenhSanXuat on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.chiTietLenhSanXuat).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
