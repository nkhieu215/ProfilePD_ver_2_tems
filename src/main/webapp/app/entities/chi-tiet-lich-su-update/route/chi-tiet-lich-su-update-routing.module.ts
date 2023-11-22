import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ChiTietLichSuUpdateComponent } from '../list/chi-tiet-lich-su-update.component';
import { ChiTietLichSuUpdateDetailComponent } from '../detail/chi-tiet-lich-su-update-detail.component';
import { ChiTietLichSuUpdateUpdateComponent } from '../update/chi-tiet-lich-su-update-update.component';
import { ChiTietLichSuUpdateRoutingResolveService } from './chi-tiet-lich-su-update-routing-resolve.service';

const chiTietLichSuUpdateRoute: Routes = [
  {
    path: '',
    component: ChiTietLichSuUpdateComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ChiTietLichSuUpdateDetailComponent,
    resolve: {
      chiTietLichSuUpdate: ChiTietLichSuUpdateRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ChiTietLichSuUpdateUpdateComponent,
    resolve: {
      chiTietLichSuUpdate: ChiTietLichSuUpdateRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ChiTietLichSuUpdateUpdateComponent,
    resolve: {
      chiTietLichSuUpdate: ChiTietLichSuUpdateRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(chiTietLichSuUpdateRoute)],
  exports: [RouterModule],
})
export class ChiTietLichSuUpdateRoutingModule {}
