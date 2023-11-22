import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IThongSoMay, ThongSoMay } from '../thong-so-may.model';
import { ThongSoMayService } from '../service/thong-so-may.service';

@Injectable({ providedIn: 'root' })
export class ThongSoMayRoutingResolveService implements Resolve<IThongSoMay> {
  constructor(protected service: ThongSoMayService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IThongSoMay> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((thongSoMay: HttpResponse<ThongSoMay>) => {
          if (thongSoMay.body) {
            return of(thongSoMay.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ThongSoMay());
  }
}
