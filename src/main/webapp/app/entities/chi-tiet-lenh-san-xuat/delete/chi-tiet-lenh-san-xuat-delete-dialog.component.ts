import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IChiTietLenhSanXuat } from '../chi-tiet-lenh-san-xuat.model';
import { ChiTietLenhSanXuatService } from '../service/chi-tiet-lenh-san-xuat.service';

@Component({
  templateUrl: './chi-tiet-lenh-san-xuat-delete-dialog.component.html',
})
export class ChiTietLenhSanXuatDeleteDialogComponent {
  chiTietLenhSanXuat?: IChiTietLenhSanXuat;

  constructor(protected chiTietLenhSanXuatService: ChiTietLenhSanXuatService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.chiTietLenhSanXuatService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
