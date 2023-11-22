import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IChiTietLichSuUpdate, ChiTietLichSuUpdate } from '../chi-tiet-lich-su-update.model';
import { ChiTietLichSuUpdateService } from '../service/chi-tiet-lich-su-update.service';

import { ChiTietLichSuUpdateRoutingResolveService } from './chi-tiet-lich-su-update-routing-resolve.service';

describe('ChiTietLichSuUpdate routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: ChiTietLichSuUpdateRoutingResolveService;
  let service: ChiTietLichSuUpdateService;
  let resultChiTietLichSuUpdate: IChiTietLichSuUpdate | undefined;

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
    routingResolveService = TestBed.inject(ChiTietLichSuUpdateRoutingResolveService);
    service = TestBed.inject(ChiTietLichSuUpdateService);
    resultChiTietLichSuUpdate = undefined;
  });

  describe('resolve', () => {
    it('should return IChiTietLichSuUpdate returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultChiTietLichSuUpdate = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultChiTietLichSuUpdate).toEqual({ id: 123 });
    });

    it('should return new IChiTietLichSuUpdate if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultChiTietLichSuUpdate = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultChiTietLichSuUpdate).toEqual(new ChiTietLichSuUpdate());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as ChiTietLichSuUpdate })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultChiTietLichSuUpdate = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultChiTietLichSuUpdate).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
