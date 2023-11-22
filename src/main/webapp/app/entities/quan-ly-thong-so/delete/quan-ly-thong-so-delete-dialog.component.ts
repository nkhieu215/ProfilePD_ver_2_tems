import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IQuanLyThongSo } from '../quan-ly-thong-so.model';
import { QuanLyThongSoService } from '../service/quan-ly-thong-so.service';

@Component({
  templateUrl: './quan-ly-thong-so-delete-dialog.component.html',
})
export class QuanLyThongSoDeleteDialogComponent {
  quanLyThongSo?: IQuanLyThongSo;

  constructor(protected quanLyThongSoService: QuanLyThongSoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.quanLyThongSoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
