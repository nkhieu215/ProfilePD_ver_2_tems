import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IChiTietSanXuat } from '../chi-tiet-san-xuat.model';
import { ChiTietSanXuatService } from '../service/chi-tiet-san-xuat.service';

@Component({
  templateUrl: './chi-tiet-san-xuat-delete-dialog.component.html',
})
export class ChiTietSanXuatDeleteDialogComponent {
  chiTietSanXuat?: IChiTietSanXuat;

  constructor(protected chiTietSanXuatService: ChiTietSanXuatService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.chiTietSanXuatService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
