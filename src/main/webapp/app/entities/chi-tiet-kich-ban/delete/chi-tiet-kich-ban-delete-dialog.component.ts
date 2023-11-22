import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IChiTietKichBan } from '../chi-tiet-kich-ban.model';
import { ChiTietKichBanService } from '../service/chi-tiet-kich-ban.service';

@Component({
  templateUrl: './chi-tiet-kich-ban-delete-dialog.component.html',
})
export class ChiTietKichBanDeleteDialogComponent {
  chiTietKichBan?: IChiTietKichBan;

  constructor(protected chiTietKichBanService: ChiTietKichBanService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.chiTietKichBanService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
