import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LichSuUpdateDetailComponent } from './lich-su-update-detail.component';

describe('LichSuUpdate Management Detail Component', () => {
  let comp: LichSuUpdateDetailComponent;
  let fixture: ComponentFixture<LichSuUpdateDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LichSuUpdateDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ lichSuUpdate: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(LichSuUpdateDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(LichSuUpdateDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load lichSuUpdate on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.lichSuUpdate).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
