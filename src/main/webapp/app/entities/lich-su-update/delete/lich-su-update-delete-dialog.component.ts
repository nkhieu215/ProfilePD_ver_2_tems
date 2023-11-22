import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ILichSuUpdate } from '../lich-su-update.model';
import { LichSuUpdateService } from '../service/lich-su-update.service';

@Component({
  templateUrl: './lich-su-update-delete-dialog.component.html',
})
export class LichSuUpdateDeleteDialogComponent {
  lichSuUpdate?: ILichSuUpdate;

  constructor(protected lichSuUpdateService: LichSuUpdateService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.lichSuUpdateService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
