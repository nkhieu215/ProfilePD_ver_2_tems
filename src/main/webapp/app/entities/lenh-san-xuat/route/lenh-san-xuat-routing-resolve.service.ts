import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ILenhSanXuat, LenhSanXuat } from '../lenh-san-xuat.model';
import { LenhSanXuatService } from '../service/lenh-san-xuat.service';

@Injectable({ providedIn: 'root' })
export class LenhSanXuatRoutingResolveService implements Resolve<ILenhSanXuat> {
  constructor(protected service: LenhSanXuatService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILenhSanXuat> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((lenhSanXuat: HttpResponse<LenhSanXuat>) => {
          if (lenhSanXuat.body) {
            return of(lenhSanXuat.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new LenhSanXuat());
  }
}
