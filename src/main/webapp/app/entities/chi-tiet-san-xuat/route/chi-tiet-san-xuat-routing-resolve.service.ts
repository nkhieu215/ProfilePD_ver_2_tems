import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IChiTietSanXuat, ChiTietSanXuat } from '../chi-tiet-san-xuat.model';
import { ChiTietSanXuatService } from '../service/chi-tiet-san-xuat.service';

@Injectable({ providedIn: 'root' })
export class ChiTietSanXuatRoutingResolveService implements Resolve<IChiTietSanXuat> {
  constructor(protected service: ChiTietSanXuatService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IChiTietSanXuat> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((chiTietSanXuat: HttpResponse<ChiTietSanXuat>) => {
          if (chiTietSanXuat.body) {
            return of(chiTietSanXuat.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ChiTietSanXuat());
  }
}
