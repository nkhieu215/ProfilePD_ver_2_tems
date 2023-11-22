import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IChiTietLichSuUpdate } from '../chi-tiet-lich-su-update.model';
import { ChiTietLichSuUpdateService } from '../service/chi-tiet-lich-su-update.service';

@Component({
  templateUrl: './chi-tiet-lich-su-update-delete-dialog.component.html',
})
export class ChiTietLichSuUpdateDeleteDialogComponent {
  chiTietLichSuUpdate?: IChiTietLichSuUpdate;

  constructor(protected chiTietLichSuUpdateService: ChiTietLichSuUpdateService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.chiTietLichSuUpdateService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
