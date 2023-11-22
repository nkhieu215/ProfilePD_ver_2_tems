import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ILichSuUpdate, LichSuUpdate } from '../lich-su-update.model';
import { LichSuUpdateService } from '../service/lich-su-update.service';

@Injectable({ providedIn: 'root' })
export class LichSuUpdateRoutingResolveService implements Resolve<ILichSuUpdate> {
  constructor(protected service: LichSuUpdateService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILichSuUpdate> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((lichSuUpdate: HttpResponse<LichSuUpdate>) => {
          if (lichSuUpdate.body) {
            return of(lichSuUpdate.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new LichSuUpdate());
  }
}
