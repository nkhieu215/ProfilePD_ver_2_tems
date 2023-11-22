import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ThietBiComponent } from '../list/thiet-bi.component';
import { ThietBiDetailComponent } from '../detail/thiet-bi-detail.component';
import { ThietBiUpdateComponent } from '../update/thiet-bi-update.component';
import { ThietBiRoutingResolveService } from './thiet-bi-routing-resolve.service';

const thietBiRoute: Routes = [
  {
    path: '',
    component: ThietBiComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ThietBiDetailComponent,
    resolve: {
      thietBi: ThietBiRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ThietBiUpdateComponent,
    resolve: {
      thietBi: ThietBiRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ThietBiUpdateComponent,
    resolve: {
      thietBi: ThietBiRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(thietBiRoute)],
  exports: [RouterModule],
})
export class ThietBiRoutingModule {}
