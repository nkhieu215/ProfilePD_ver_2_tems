import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ChiTietKichBanDetailComponent } from './chi-tiet-kich-ban-detail.component';

describe('ChiTietKichBan Management Detail Component', () => {
  let comp: ChiTietKichBanDetailComponent;
  let fixture: ComponentFixture<ChiTietKichBanDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChiTietKichBanDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ chiTietKichBan: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ChiTietKichBanDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ChiTietKichBanDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load chiTietKichBan on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.chiTietKichBan).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
