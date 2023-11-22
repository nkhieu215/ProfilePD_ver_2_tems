import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ILenhSanXuat } from '../lenh-san-xuat.model';
import { LenhSanXuatService } from '../service/lenh-san-xuat.service';

@Component({
  templateUrl: './lenh-san-xuat-delete-dialog.component.html',
})
export class LenhSanXuatDeleteDialogComponent {
  lenhSanXuat?: ILenhSanXuat;

  constructor(protected lenhSanXuatService: LenhSanXuatService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.lenhSanXuatService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
