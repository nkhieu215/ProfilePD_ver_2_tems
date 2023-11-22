import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuanLyThongSoService } from './../service/quan-ly-thong-so.service';
import { Component } from '@angular/core';

@Component({
  selector: 'jhi-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent {
  // @Input() modalTitle: string;
  // @Input() modalMessage: string;

  constructor(protected quanLyThongSoService: QuanLyThongSoService, protected activeModal: NgbActiveModal) {}

  // closeModal() {
  //   const modal = document.querySelector('.modal');
  //   if (modal) {
  //     modal.classList.remove('show-modal');
  //   }
  // }
}
