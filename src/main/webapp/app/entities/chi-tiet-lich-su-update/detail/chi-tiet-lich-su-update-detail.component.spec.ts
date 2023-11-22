import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ChiTietLichSuUpdateDetailComponent } from './chi-tiet-lich-su-update-detail.component';

describe('ChiTietLichSuUpdate Management Detail Component', () => {
  let comp: ChiTietLichSuUpdateDetailComponent;
  let fixture: ComponentFixture<ChiTietLichSuUpdateDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChiTietLichSuUpdateDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ chiTietLichSuUpdate: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ChiTietLichSuUpdateDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ChiTietLichSuUpdateDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load chiTietLichSuUpdate on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.chiTietLichSuUpdate).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
