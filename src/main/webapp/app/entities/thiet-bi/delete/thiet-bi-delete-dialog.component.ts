import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IThietBi } from '../thiet-bi.model';
import { ThietBiService } from '../service/thiet-bi.service';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: './thiet-bi-delete-dialog.component.html',
})
export class ThietBiDeleteDialogComponent {
  resourceUrlAdd = this.applicationConfigService.getEndpointFor('api/thiet-bi/del-thiet-bi');

  thietBi?: IThietBi;

  constructor(
    protected thietBiService: ThietBiService,
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
    // this.thietBiService.delete(id).subscribe(() => {
    //   this.activeModal.close('deleted');
    // });
  }
}
