import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { LichSuUpdateComponent } from '../list/lich-su-update.component';
import { LichSuUpdateDetailComponent } from '../detail/lich-su-update-detail.component';
import { LichSuUpdateUpdateComponent } from '../update/lich-su-update-update.component';
import { LichSuUpdateRoutingResolveService } from './lich-su-update-routing-resolve.service';

const lichSuUpdateRoute: Routes = [
  {
    path: '',
    component: LichSuUpdateComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LichSuUpdateDetailComponent,
    resolve: {
      lichSuUpdate: LichSuUpdateRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LichSuUpdateUpdateComponent,
    resolve: {
      lichSuUpdate: LichSuUpdateRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LichSuUpdateUpdateComponent,
    resolve: {
      lichSuUpdate: LichSuUpdateRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(lichSuUpdateRoute)],
  exports: [RouterModule],
})
export class LichSuUpdateRoutingModule {}
