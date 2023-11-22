import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ChiTietSanXuatComponent } from './list/chi-tiet-san-xuat.component';
import { ChiTietSanXuatDetailComponent } from './detail/chi-tiet-san-xuat-detail.component';
import { ChiTietSanXuatUpdateComponent } from './update/chi-tiet-san-xuat-update.component';
import { ChiTietSanXuatDeleteDialogComponent } from './delete/chi-tiet-san-xuat-delete-dialog.component';
import { ChiTietSanXuatRoutingModule } from './route/chi-tiet-san-xuat-routing.module';

@NgModule({
  imports: [SharedModule, ChiTietSanXuatRoutingModule],
  declarations: [
    ChiTietSanXuatComponent,
    ChiTietSanXuatDetailComponent,
    ChiTietSanXuatUpdateComponent,
    ChiTietSanXuatDeleteDialogComponent,
  ],
  entryComponents: [ChiTietSanXuatDeleteDialogComponent],
})
export class ChiTietSanXuatModule {}
