import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { KichBanComponent } from '../list/kich-ban.component';
import { KichBanDetailComponent } from '../detail/kich-ban-detail.component';
import { KichBanUpdateComponent } from '../update/kich-ban-update.component';
import { KichBanRoutingResolveService } from './kich-ban-routing-resolve.service';

const kichBanRoute: Routes = [
  {
    path: '',
    component: KichBanComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: KichBanDetailComponent,
    resolve: {
      kichBan: KichBanRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: KichBanUpdateComponent,
    resolve: {
      kichBan: KichBanRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: KichBanUpdateComponent,
    resolve: {
      kichBan: KichBanRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(kichBanRoute)],
  exports: [RouterModule],
})
export class KichBanRoutingModule {}
