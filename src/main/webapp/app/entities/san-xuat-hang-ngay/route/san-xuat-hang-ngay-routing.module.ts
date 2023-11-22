import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { SanXuatHangNgayComponent } from '../list/san-xuat-hang-ngay.component';
import { SanXuatHangNgayDetailComponent } from '../detail/san-xuat-hang-ngay-detail.component';
import { SanXuatHangNgayUpdateComponent } from '../update/san-xuat-hang-ngay-update.component';
import { SanXuatHangNgayRoutingResolveService } from './san-xuat-hang-ngay-routing-resolve.service';

const sanXuatHangNgayRoute: Routes = [
  {
    path: '',
    component: SanXuatHangNgayComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SanXuatHangNgayDetailComponent,
    resolve: {
      sanXuatHangNgay: SanXuatHangNgayRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SanXuatHangNgayUpdateComponent,
    resolve: {
      sanXuatHangNgay: SanXuatHangNgayRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SanXuatHangNgayUpdateComponent,
    resolve: {
      sanXuatHangNgay: SanXuatHangNgayRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(sanXuatHangNgayRoute)],
  exports: [RouterModule],
})
export class SanXuatHangNgayRoutingModule {}
