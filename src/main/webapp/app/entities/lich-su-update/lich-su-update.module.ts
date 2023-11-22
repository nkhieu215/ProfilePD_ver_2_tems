import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { LichSuUpdateComponent } from './list/lich-su-update.component';
import { LichSuUpdateDetailComponent } from './detail/lich-su-update-detail.component';
import { LichSuUpdateUpdateComponent } from './update/lich-su-update-update.component';
import { LichSuUpdateDeleteDialogComponent } from './delete/lich-su-update-delete-dialog.component';
import { LichSuUpdateRoutingModule } from './route/lich-su-update-routing.module';

@NgModule({
  imports: [SharedModule, LichSuUpdateRoutingModule],
  declarations: [LichSuUpdateComponent, LichSuUpdateDetailComponent, LichSuUpdateUpdateComponent, LichSuUpdateDeleteDialogComponent],
  entryComponents: [LichSuUpdateDeleteDialogComponent],
})
export class LichSuUpdateModule {}
