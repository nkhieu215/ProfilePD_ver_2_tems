import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IChiTietLenhSanXuat, ChiTietLenhSanXuat } from '../chi-tiet-lenh-san-xuat.model';
import { ChiTietLenhSanXuatService } from '../service/chi-tiet-lenh-san-xuat.service';

@Injectable({ providedIn: 'root' })
export class ChiTietLenhSanXuatRoutingResolveService implements Resolve<IChiTietLenhSanXuat> {
  constructor(protected service: ChiTietLenhSanXuatService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IChiTietLenhSanXuat> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((chiTietLenhSanXuat: HttpResponse<ChiTietLenhSanXuat>) => {
          if (chiTietLenhSanXuat.body) {
            return of(chiTietLenhSanXuat.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ChiTietLenhSanXuat());
  }
}
