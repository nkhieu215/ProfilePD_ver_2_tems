import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IChiTietLichSuUpdate, ChiTietLichSuUpdate } from '../chi-tiet-lich-su-update.model';
import { ChiTietLichSuUpdateService } from '../service/chi-tiet-lich-su-update.service';

@Injectable({ providedIn: 'root' })
export class ChiTietLichSuUpdateRoutingResolveService implements Resolve<IChiTietLichSuUpdate> {
  constructor(protected service: ChiTietLichSuUpdateService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IChiTietLichSuUpdate> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((chiTietLichSuUpdate: HttpResponse<ChiTietLichSuUpdate>) => {
          if (chiTietLichSuUpdate.body) {
            return of(chiTietLichSuUpdate.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ChiTietLichSuUpdate());
  }
}
