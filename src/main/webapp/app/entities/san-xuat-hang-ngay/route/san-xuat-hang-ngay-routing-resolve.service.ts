import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISanXuatHangNgay, SanXuatHangNgay } from '../san-xuat-hang-ngay.model';
import { SanXuatHangNgayService } from '../service/san-xuat-hang-ngay.service';

@Injectable({ providedIn: 'root' })
export class SanXuatHangNgayRoutingResolveService implements Resolve<ISanXuatHangNgay> {
  constructor(protected service: SanXuatHangNgayService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISanXuatHangNgay> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((sanXuatHangNgay: HttpResponse<SanXuatHangNgay>) => {
          if (sanXuatHangNgay.body) {
            return of(sanXuatHangNgay.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SanXuatHangNgay());
  }
}
