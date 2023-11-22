import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ChiTietSanXuatComponent } from '../list/chi-tiet-san-xuat.component';
import { ChiTietSanXuatDetailComponent } from '../detail/chi-tiet-san-xuat-detail.component';
import { ChiTietSanXuatUpdateComponent } from '../update/chi-tiet-san-xuat-update.component';
import { ChiTietSanXuatRoutingResolveService } from './chi-tiet-san-xuat-routing-resolve.service';

const chiTietSanXuatRoute: Routes = [
  {
    path: '',
    component: ChiTietSanXuatComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ChiTietSanXuatDetailComponent,
    resolve: {
      chiTietSanXuat: ChiTietSanXuatRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ChiTietSanXuatUpdateComponent,
    resolve: {
      chiTietSanXuat: ChiTietSanXuatRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ChiTietSanXuatUpdateComponent,
    resolve: {
      chiTietSanXuat: ChiTietSanXuatRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(chiTietSanXuatRoute)],
  exports: [RouterModule],
})
export class ChiTietSanXuatRoutingModule {}
