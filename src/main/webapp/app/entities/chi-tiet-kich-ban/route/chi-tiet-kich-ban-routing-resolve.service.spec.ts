import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IChiTietKichBan, ChiTietKichBan } from '../chi-tiet-kich-ban.model';
import { ChiTietKichBanService } from '../service/chi-tiet-kich-ban.service';

import { ChiTietKichBanRoutingResolveService } from './chi-tiet-kich-ban-routing-resolve.service';

describe('ChiTietKichBan routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: ChiTietKichBanRoutingResolveService;
  let service: ChiTietKichBanService;
  let resultChiTietKichBan: IChiTietKichBan | undefined;

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
    routingResolveService = TestBed.inject(ChiTietKichBanRoutingResolveService);
    service = TestBed.inject(ChiTietKichBanService);
    resultChiTietKichBan = undefined;
  });

  describe('resolve', () => {
    it('should return IChiTietKichBan returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultChiTietKichBan = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultChiTietKichBan).toEqual({ id: 123 });
    });

    it('should return new IChiTietKichBan if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultChiTietKichBan = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultChiTietKichBan).toEqual(new ChiTietKichBan());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as ChiTietKichBan })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultChiTietKichBan = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultChiTietKichBan).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
