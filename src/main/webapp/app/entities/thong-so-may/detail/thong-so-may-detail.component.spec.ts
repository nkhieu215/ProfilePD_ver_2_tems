import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ThongSoMayDetailComponent } from './thong-so-may-detail.component';

describe('ThongSoMay Management Detail Component', () => {
  let comp: ThongSoMayDetailComponent;
  let fixture: ComponentFixture<ThongSoMayDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThongSoMayDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ thongSoMay: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ThongSoMayDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ThongSoMayDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load thongSoMay on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.thongSoMay).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
