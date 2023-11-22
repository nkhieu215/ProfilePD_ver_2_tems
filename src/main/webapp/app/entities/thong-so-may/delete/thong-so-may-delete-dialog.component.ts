import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IThongSoMay } from '../thong-so-may.model';
import { ThongSoMayService } from '../service/thong-so-may.service';

@Component({
  templateUrl: './thong-so-may-delete-dialog.component.html',
})
export class ThongSoMayDeleteDialogComponent {
  thongSoMay?: IThongSoMay;

  constructor(protected thongSoMayService: ThongSoMayService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.thongSoMayService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
