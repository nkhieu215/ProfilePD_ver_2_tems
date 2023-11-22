import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IChiTietLenhSanXuat, ChiTietLenhSanXuat } from '../chi-tiet-lenh-san-xuat.model';
import { ChiTietLenhSanXuatService } from '../service/chi-tiet-lenh-san-xuat.service';

import { ChiTietLenhSanXuatRoutingResolveService } from './chi-tiet-lenh-san-xuat-routing-resolve.service';

describe('ChiTietLenhSanXuat routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: ChiTietLenhSanXuatRoutingResolveService;
  let service: ChiTietLenhSanXuatService;
  let resultChiTietLenhSanXuat: IChiTietLenhSanXuat | undefined;

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
    routingResolveService = TestBed.inject(ChiTietLenhSanXuatRoutingResolveService);
    service = TestBed.inject(ChiTietLenhSanXuatService);
    resultChiTietLenhSanXuat = undefined;
  });

  describe('resolve', () => {
    it('should return IChiTietLenhSanXuat returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultChiTietLenhSanXuat = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultChiTietLenhSanXuat).toEqual({ id: 123 });
    });

    it('should return new IChiTietLenhSanXuat if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultChiTietLenhSanXuat = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultChiTietLenhSanXuat).toEqual(new ChiTietLenhSanXuat());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as ChiTietLenhSanXuat })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultChiTietLenhSanXuat = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultChiTietLenhSanXuat).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
