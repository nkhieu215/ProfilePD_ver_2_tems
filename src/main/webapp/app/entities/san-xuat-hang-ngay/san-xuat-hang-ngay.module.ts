import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { SanXuatHangNgayComponent } from './list/san-xuat-hang-ngay.component';
import { SanXuatHangNgayDetailComponent } from './detail/san-xuat-hang-ngay-detail.component';
import { SanXuatHangNgayUpdateComponent } from './update/san-xuat-hang-ngay-update.component';
import { SanXuatHangNgayDeleteDialogComponent } from './delete/san-xuat-hang-ngay-delete-dialog.component';
import { SanXuatHangNgayRoutingModule } from './route/san-xuat-hang-ngay-routing.module';

@NgModule({
  imports: [SharedModule, SanXuatHangNgayRoutingModule, NgxPaginationModule, NgMultiSelectDropDownModule],
  declarations: [
    SanXuatHangNgayComponent,
    SanXuatHangNgayDetailComponent,
    SanXuatHangNgayUpdateComponent,
    SanXuatHangNgayDeleteDialogComponent,
  ],
  entryComponents: [SanXuatHangNgayDeleteDialogComponent],
})
export class SanXuatHangNgayModule {}
