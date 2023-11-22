import { NgxPaginationModule } from 'ngx-pagination';
import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ChiTietLenhSanXuatComponent } from './list/chi-tiet-lenh-san-xuat.component';
import { ChiTietLenhSanXuatDetailComponent } from './detail/chi-tiet-lenh-san-xuat-detail.component';
import { ChiTietLenhSanXuatUpdateComponent } from './update/chi-tiet-lenh-san-xuat-update.component';
import { ChiTietLenhSanXuatDeleteDialogComponent } from './delete/chi-tiet-lenh-san-xuat-delete-dialog.component';
import { ChiTietLenhSanXuatRoutingModule } from './route/chi-tiet-lenh-san-xuat-routing.module';

@NgModule({
  imports: [SharedModule, ChiTietLenhSanXuatRoutingModule, NgxPaginationModule],
  declarations: [
    ChiTietLenhSanXuatComponent,
    ChiTietLenhSanXuatDetailComponent,
    ChiTietLenhSanXuatUpdateComponent,
    ChiTietLenhSanXuatDeleteDialogComponent,
  ],
  entryComponents: [ChiTietLenhSanXuatDeleteDialogComponent],
})
export class ChiTietLenhSanXuatModule {}
