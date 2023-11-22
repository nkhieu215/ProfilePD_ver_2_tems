import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ISanXuatHangNgay } from '../san-xuat-hang-ngay.model';
import { SanXuatHangNgayService } from '../service/san-xuat-hang-ngay.service';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: './san-xuat-hang-ngay-delete-dialog.component.html',
})
export class SanXuatHangNgayDeleteDialogComponent {
  resourceUrlAdd = this.applicationConfigService.getEndpointFor('api/san-xuat-hang-ngay/del-kich-ban');
  sanXuatHangNgay?: ISanXuatHangNgay;

  constructor(
    protected sanXuatHangNgayService: SanXuatHangNgayService,
    protected activeModal: NgbActiveModal,
    protected applicationConfigService: ApplicationConfigService,
    protected http: HttpClient
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.http.delete(`${this.resourceUrlAdd}/${id}`).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
