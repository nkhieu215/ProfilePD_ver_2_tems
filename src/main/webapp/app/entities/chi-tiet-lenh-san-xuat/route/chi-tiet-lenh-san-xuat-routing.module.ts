import { LenhSanXuatRoutingResolveService } from './../../lenh-san-xuat/route/lenh-san-xuat-routing-resolve.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ChiTietLenhSanXuatComponent } from '../list/chi-tiet-lenh-san-xuat.component';
import { ChiTietLenhSanXuatDetailComponent } from '../detail/chi-tiet-lenh-san-xuat-detail.component';
import { ChiTietLenhSanXuatUpdateComponent } from '../update/chi-tiet-lenh-san-xuat-update.component';
import { ChiTietLenhSanXuatRoutingResolveService } from './chi-tiet-lenh-san-xuat-routing-resolve.service';

const chiTietLenhSanXuatRoute: Routes = [
  {
    path: '',
    component: ChiTietLenhSanXuatComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ChiTietLenhSanXuatDetailComponent,
    resolve: {
      lenhSanXuat: LenhSanXuatRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ChiTietLenhSanXuatUpdateComponent,
    resolve: {
      chiTietLenhSanXuat: ChiTietLenhSanXuatRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ChiTietLenhSanXuatUpdateComponent,
    resolve: {
      lenhSanXuat: LenhSanXuatRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(chiTietLenhSanXuatRoute)],
  exports: [RouterModule],
})
export class ChiTietLenhSanXuatRoutingModule {}
