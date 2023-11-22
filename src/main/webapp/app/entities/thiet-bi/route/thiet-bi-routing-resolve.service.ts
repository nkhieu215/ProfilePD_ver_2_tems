import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IThietBi, ThietBi } from '../thiet-bi.model';
import { ThietBiService } from '../service/thiet-bi.service';

@Injectable({ providedIn: 'root' })
export class ThietBiRoutingResolveService implements Resolve<IThietBi> {
  constructor(protected service: ThietBiService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IThietBi> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((thietBi: HttpResponse<ThietBi>) => {
          if (thietBi.body) {
            return of(thietBi.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ThietBi());
  }
}
