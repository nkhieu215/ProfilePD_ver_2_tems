import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ChiTietLichSuUpdateComponent } from './list/chi-tiet-lich-su-update.component';
import { ChiTietLichSuUpdateDetailComponent } from './detail/chi-tiet-lich-su-update-detail.component';
import { ChiTietLichSuUpdateUpdateComponent } from './update/chi-tiet-lich-su-update-update.component';
import { ChiTietLichSuUpdateDeleteDialogComponent } from './delete/chi-tiet-lich-su-update-delete-dialog.component';
import { ChiTietLichSuUpdateRoutingModule } from './route/chi-tiet-lich-su-update-routing.module';

@NgModule({
  imports: [SharedModule, ChiTietLichSuUpdateRoutingModule],
  declarations: [
    ChiTietLichSuUpdateComponent,
    ChiTietLichSuUpdateDetailComponent,
    ChiTietLichSuUpdateUpdateComponent,
    ChiTietLichSuUpdateDeleteDialogComponent,
  ],
  entryComponents: [ChiTietLichSuUpdateDeleteDialogComponent],
})
export class ChiTietLichSuUpdateModule {}
