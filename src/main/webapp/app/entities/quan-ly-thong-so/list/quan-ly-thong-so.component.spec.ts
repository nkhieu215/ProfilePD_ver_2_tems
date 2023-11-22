import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { QuanLyThongSoService } from '../service/quan-ly-thong-so.service';

import { QuanLyThongSoComponent } from './quan-ly-thong-so.component';
import { FormBuilder } from '@angular/forms';

describe('QuanLyThongSo Management Component', () => {
  let comp: QuanLyThongSoComponent;
  let fixture: ComponentFixture<QuanLyThongSoComponent>;
  let service: QuanLyThongSoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'quan-ly-thong-so', component: QuanLyThongSoComponent }]), HttpClientTestingModule],
      declarations: [QuanLyThongSoComponent],
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
      .overrideTemplate(QuanLyThongSoComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(QuanLyThongSoComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(QuanLyThongSoService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query);
    expect(comp.quanLyThongSos?.[0]);
  });

  it('should load a page', () => {
    // WHEN
    comp.loadPage();

    // THEN
    expect(service.query);
    expect(comp.quanLyThongSos?.[0]);
  });

  it('should calculate the sort attribute for an id', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query);
  });

  it('should calculate the sort attribute for a non-id attribute', () => {
    // INIT
    comp.ngOnInit();

    // GIVEN
    comp.predicate = 'name';

    // WHEN
    comp.loadPage();

    // THEN
    expect(service.query);
  });
});
