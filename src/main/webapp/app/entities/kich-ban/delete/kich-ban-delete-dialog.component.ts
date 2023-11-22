import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IKichBan } from '../kich-ban.model';
import { KichBanService } from '../service/kich-ban.service';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: './kich-ban-delete-dialog.component.html',
})
export class KichBanDeleteDialogComponent {
  resourceUrlAdd = this.applicationConfigService.getEndpointFor('api/kich-ban/del-kich-ban');
  kichBan?: IKichBan;

  constructor(
    protected kichBanService: KichBanService,
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
    // this.kichBanService.delete(id).subscribe(() => {
    //   this.activeModal.close('deleted');
    // });
  }
}
