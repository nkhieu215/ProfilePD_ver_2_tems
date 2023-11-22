import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ChiTietKichBanComponent } from '../list/chi-tiet-kich-ban.component';
import { ChiTietKichBanDetailComponent } from '../detail/chi-tiet-kich-ban-detail.component';
import { ChiTietKichBanUpdateComponent } from '../update/chi-tiet-kich-ban-update.component';
import { ChiTietKichBanRoutingResolveService } from './chi-tiet-kich-ban-routing-resolve.service';

const chiTietKichBanRoute: Routes = [
  {
    path: '',
    component: ChiTietKichBanComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ChiTietKichBanDetailComponent,
    resolve: {
      chiTietKichBan: ChiTietKichBanRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ChiTietKichBanUpdateComponent,
    resolve: {
      chiTietKichBan: ChiTietKichBanRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ChiTietKichBanUpdateComponent,
    resolve: {
      chiTietKichBan: ChiTietKichBanRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(chiTietKichBanRoute)],
  exports: [RouterModule],
})
export class ChiTietKichBanRoutingModule {}
