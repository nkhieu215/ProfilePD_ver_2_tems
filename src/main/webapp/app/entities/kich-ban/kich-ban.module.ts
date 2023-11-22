import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { KichBanComponent } from './list/kich-ban.component';
import { KichBanDetailComponent } from './detail/kich-ban-detail.component';
import { KichBanUpdateComponent } from './update/kich-ban-update.component';
import { KichBanDeleteDialogComponent } from './delete/kich-ban-delete-dialog.component';
import { KichBanRoutingModule } from './route/kich-ban-routing.module';

@NgModule({
  imports: [SharedModule, KichBanRoutingModule, NgxPaginationModule, NgMultiSelectDropDownModule],
  declarations: [KichBanComponent, KichBanDetailComponent, KichBanUpdateComponent, KichBanDeleteDialogComponent],
  entryComponents: [KichBanDeleteDialogComponent],
})
export class KichBanModule {}
