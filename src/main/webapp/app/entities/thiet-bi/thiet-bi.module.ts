import { NgxPaginationModule } from 'ngx-pagination';
import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ThietBiComponent } from './list/thiet-bi.component';
import { ThietBiDetailComponent } from './detail/thiet-bi-detail.component';
import { ThietBiUpdateComponent } from './update/thiet-bi-update.component';
import { ThietBiDeleteDialogComponent } from './delete/thiet-bi-delete-dialog.component';
import { ThietBiRoutingModule } from './route/thiet-bi-routing.module';
import { EditComponent } from './edit/edit.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { HttpClient } from '@angular/common/http';
@NgModule({
  imports: [SharedModule, ThietBiRoutingModule, NgxPaginationModule, NgMultiSelectDropDownModule],
  declarations: [ThietBiComponent, ThietBiDetailComponent, ThietBiUpdateComponent, ThietBiDeleteDialogComponent, EditComponent],
  entryComponents: [ThietBiDeleteDialogComponent],
  providers: [HttpClient],
})
export class ThietBiModule {}
