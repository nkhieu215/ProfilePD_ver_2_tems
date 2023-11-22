import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ThongSoMayComponent } from './list/thong-so-may.component';
import { ThongSoMayDetailComponent } from './detail/thong-so-may-detail.component';
import { ThongSoMayUpdateComponent } from './update/thong-so-may-update.component';
import { ThongSoMayDeleteDialogComponent } from './delete/thong-so-may-delete-dialog.component';
import { ThongSoMayRoutingModule } from './route/thong-so-may-routing.module';

@NgModule({
  imports: [SharedModule, ThongSoMayRoutingModule, ReactiveFormsModule],
  declarations: [ThongSoMayComponent, ThongSoMayDetailComponent, ThongSoMayUpdateComponent, ThongSoMayDeleteDialogComponent],
  entryComponents: [ThongSoMayDeleteDialogComponent],
})
export class ThongSoMayModule {}
