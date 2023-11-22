import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IQuanLyThongSo, QuanLyThongSo } from '../quan-ly-thong-so.model';
import { QuanLyThongSoService } from '../service/quan-ly-thong-so.service';

@Injectable({ providedIn: 'root' })
export class QuanLyThongSoRoutingResolveService implements Resolve<IQuanLyThongSo> {
  constructor(protected service: QuanLyThongSoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IQuanLyThongSo> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((quanLyThongSo: HttpResponse<QuanLyThongSo>) => {
          if (quanLyThongSo.body) {
            return of(quanLyThongSo.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new QuanLyThongSo());
  }
}
