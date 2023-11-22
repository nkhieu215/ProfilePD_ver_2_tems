import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IKichBan, KichBan } from '../kich-ban.model';
import { KichBanService } from '../service/kich-ban.service';

@Injectable({ providedIn: 'root' })
export class KichBanRoutingResolveService implements Resolve<IKichBan> {
  constructor(protected service: KichBanService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IKichBan> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((kichBan: HttpResponse<KichBan>) => {
          if (kichBan.body) {
            return of(kichBan.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new KichBan());
  }
}
