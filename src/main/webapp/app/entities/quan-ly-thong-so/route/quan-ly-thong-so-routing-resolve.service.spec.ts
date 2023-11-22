import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IQuanLyThongSo, QuanLyThongSo } from '../quan-ly-thong-so.model';
import { QuanLyThongSoService } from '../service/quan-ly-thong-so.service';

import { QuanLyThongSoRoutingResolveService } from './quan-ly-thong-so-routing-resolve.service';

describe('QuanLyThongSo routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: QuanLyThongSoRoutingResolveService;
  let service: QuanLyThongSoService;
  let resultQuanLyThongSo: IQuanLyThongSo | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    routingResolveService = TestBed.inject(QuanLyThongSoRoutingResolveService);
    service = TestBed.inject(QuanLyThongSoService);
    resultQuanLyThongSo = undefined;
  });

  describe('resolve', () => {
    it('should return IQuanLyThongSo returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultQuanLyThongSo = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultQuanLyThongSo).toEqual({ id: 123 });
    });

    it('should return new IQuanLyThongSo if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultQuanLyThongSo = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultQuanLyThongSo).toEqual(new QuanLyThongSo());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as QuanLyThongSo })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultQuanLyThongSo = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultQuanLyThongSo).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
