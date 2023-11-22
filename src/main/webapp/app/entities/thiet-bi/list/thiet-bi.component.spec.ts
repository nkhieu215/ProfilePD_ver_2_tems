import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ThietBiService } from '../service/thiet-bi.service';

import { ThietBiComponent } from './thiet-bi.component';
import { FormBuilder } from '@angular/forms';

describe('ThietBi Management Component', () => {
  let comp: ThietBiComponent;
  let fixture: ComponentFixture<ThietBiComponent>;
  let service: ThietBiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'thiet-bi', component: ThietBiComponent }]), HttpClientTestingModule],
      declarations: [ThietBiComponent],
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
      .overrideTemplate(ThietBiComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ThietBiComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ThietBiService);

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
    expect(comp.thietBis?.[0]);
  });

  it('should load a page', () => {
    // WHEN
    comp.loadPage();

    // THEN
    expect(service.query);
    expect(comp.thietBis?.[0]);
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
