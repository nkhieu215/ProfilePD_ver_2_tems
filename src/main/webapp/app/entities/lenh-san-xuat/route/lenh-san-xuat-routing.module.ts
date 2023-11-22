import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { LenhSanXuatComponent } from '../list/lenh-san-xuat.component';
import { LenhSanXuatDetailComponent } from '../detail/lenh-san-xuat-detail.component';
import { LenhSanXuatUpdateComponent } from '../update/lenh-san-xuat-update.component';
import { LenhSanXuatRoutingResolveService } from './lenh-san-xuat-routing-resolve.service';

const lenhSanXuatRoute: Routes = [
  {
    path: '',
    component: LenhSanXuatComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LenhSanXuatDetailComponent,
    resolve: {
      lenhSanXuat: LenhSanXuatRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LenhSanXuatUpdateComponent,
    resolve: {
      lenhSanXuat: LenhSanXuatRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LenhSanXuatUpdateComponent,
    resolve: {
      lenhSanXuat: LenhSanXuatRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(lenhSanXuatRoute)],
  exports: [RouterModule],
})
export class LenhSanXuatRoutingModule {}
