import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IChiTietKichBan, ChiTietKichBan } from '../chi-tiet-kich-ban.model';
import { ChiTietKichBanService } from '../service/chi-tiet-kich-ban.service';

@Injectable({ providedIn: 'root' })
export class ChiTietKichBanRoutingResolveService implements Resolve<IChiTietKichBan> {
  constructor(protected service: ChiTietKichBanService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IChiTietKichBan> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((chiTietKichBan: HttpResponse<ChiTietKichBan>) => {
          if (chiTietKichBan.body) {
            return of(chiTietKichBan.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ChiTietKichBan());
  }
}
