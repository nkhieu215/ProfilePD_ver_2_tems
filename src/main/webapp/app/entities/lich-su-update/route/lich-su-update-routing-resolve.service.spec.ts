import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ILichSuUpdate, LichSuUpdate } from '../lich-su-update.model';
import { LichSuUpdateService } from '../service/lich-su-update.service';

import { LichSuUpdateRoutingResolveService } from './lich-su-update-routing-resolve.service';

describe('LichSuUpdate routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: LichSuUpdateRoutingResolveService;
  let service: LichSuUpdateService;
  let resultLichSuUpdate: ILichSuUpdate | undefined;

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
    routingResolveService = TestBed.inject(LichSuUpdateRoutingResolveService);
    service = TestBed.inject(LichSuUpdateService);
    resultLichSuUpdate = undefined;
  });

  describe('resolve', () => {
    it('should return ILichSuUpdate returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultLichSuUpdate = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultLichSuUpdate).toEqual({ id: 123 });
    });

    it('should return new ILichSuUpdate if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultLichSuUpdate = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultLichSuUpdate).toEqual(new LichSuUpdate());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as LichSuUpdate })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultLichSuUpdate = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultLichSuUpdate).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
