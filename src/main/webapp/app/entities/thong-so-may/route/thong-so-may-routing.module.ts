import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ThongSoMayComponent } from '../list/thong-so-may.component';
import { ThongSoMayDetailComponent } from '../detail/thong-so-may-detail.component';
import { ThongSoMayUpdateComponent } from '../update/thong-so-may-update.component';
import { ThongSoMayRoutingResolveService } from './thong-so-may-routing-resolve.service';

const thongSoMayRoute: Routes = [
  {
    path: '',
    component: ThongSoMayComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ThongSoMayDetailComponent,
    resolve: {
      thongSoMay: ThongSoMayRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ThongSoMayUpdateComponent,
    resolve: {
      thongSoMay: ThongSoMayRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ThongSoMayUpdateComponent,
    resolve: {
      thongSoMay: ThongSoMayRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(thongSoMayRoute)],
  exports: [RouterModule],
})
export class ThongSoMayRoutingModule {}
