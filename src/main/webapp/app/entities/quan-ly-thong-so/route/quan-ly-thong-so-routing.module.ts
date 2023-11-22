import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { QuanLyThongSoComponent } from '../list/quan-ly-thong-so.component';
import { QuanLyThongSoDetailComponent } from '../detail/quan-ly-thong-so-detail.component';
import { QuanLyThongSoUpdateComponent } from '../update/quan-ly-thong-so-update.component';
import { QuanLyThongSoRoutingResolveService } from './quan-ly-thong-so-routing-resolve.service';

const quanLyThongSoRoute: Routes = [
  {
    path: '',
    component: QuanLyThongSoComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: QuanLyThongSoDetailComponent,
    resolve: {
      quanLyThongSo: QuanLyThongSoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: QuanLyThongSoUpdateComponent,
    resolve: {
      quanLyThongSo: QuanLyThongSoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: QuanLyThongSoUpdateComponent,
    resolve: {
      quanLyThongSo: QuanLyThongSoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(quanLyThongSoRoute)],
  exports: [RouterModule],
})
export class QuanLyThongSoRoutingModule {}
