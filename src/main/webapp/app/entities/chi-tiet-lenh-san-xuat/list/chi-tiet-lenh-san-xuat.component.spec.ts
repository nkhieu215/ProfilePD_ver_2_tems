import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ChiTietLenhSanXuatService } from '../service/chi-tiet-lenh-san-xuat.service';

import { ChiTietLenhSanXuatComponent } from './chi-tiet-lenh-san-xuat.component';
import { FormBuilder } from '@angular/forms';

describe('ChiTietLenhSanXuat Management Component', () => {
  let comp: ChiTietLenhSanXuatComponent;
  let fixture: ComponentFixture<ChiTietLenhSanXuatComponent>;
  let service: ChiTietLenhSanXuatService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'chi-tiet-lenh-san-xuat', component: ChiTietLenhSanXuatComponent }]),
        HttpClientTestingModule,
      ],
      declarations: [ChiTietLenhSanXuatComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              })
            ),
          },
        },
        FormBuilder,
      ],
    })
      .overrideTemplate(ChiTietLenhSanXuatComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ChiTietLenhSanXuatComponent);
    comp = fixture.componentInstance;
    // service = TestBed.inject(ChiTietLenhSanXuatService);
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(comp.ngOnInit());
  });

  // it('should load a page', () => {
  //   // WHEN
  //   comp.loadPage(1);

  //   // THEN
  //   expect(service.query).toHaveBeenCalled();
  //   expect(comp.chiTietLenhSanXuats?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  // });

  // it('should calculate the sort attribute for an id', () => {
  //   // WHEN
  //   comp.ngOnInit();

  //   // THEN
  //   expect(service.query).toHaveBeenCalledWith(expect.objectContaining({ sort: ['id,desc'] }));
  // });

  // it('should calculate the sort attribute for a non-id attribute', () => {
  //   // INIT
  //   comp.ngOnInit();

  //   // GIVEN
  //   comp.predicate = 'name';

  //   // WHEN
  //   comp.loadPage(1);

  //   // THEN
  //   expect(service.query).toHaveBeenLastCalledWith(expect.objectContaining({ sort: ['name,desc', 'id'] }));
  // });
});
