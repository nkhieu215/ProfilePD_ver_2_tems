import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ChiTietKichBanComponent } from './list/chi-tiet-kich-ban.component';
import { ChiTietKichBanDetailComponent } from './detail/chi-tiet-kich-ban-detail.component';
import { ChiTietKichBanUpdateComponent } from './update/chi-tiet-kich-ban-update.component';
import { ChiTietKichBanDeleteDialogComponent } from './delete/chi-tiet-kich-ban-delete-dialog.component';
import { ChiTietKichBanRoutingModule } from './route/chi-tiet-kich-ban-routing.module';

@NgModule({
  imports: [SharedModule, ChiTietKichBanRoutingModule],
  declarations: [
    ChiTietKichBanComponent,
    ChiTietKichBanDetailComponent,
    ChiTietKichBanUpdateComponent,
    ChiTietKichBanDeleteDialogComponent,
  ],
  entryComponents: [ChiTietKichBanDeleteDialogComponent],
})
export class ChiTietKichBanModule {}
