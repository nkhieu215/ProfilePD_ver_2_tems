import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { QuanLyThongSoDetailComponent } from './quan-ly-thong-so-detail.component';

describe('QuanLyThongSo Management Detail Component', () => {
  let comp: QuanLyThongSoDetailComponent;
  let fixture: ComponentFixture<QuanLyThongSoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuanLyThongSoDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ quanLyThongSo: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(QuanLyThongSoDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(QuanLyThongSoDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load quanLyThongSo on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.quanLyThongSo).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
