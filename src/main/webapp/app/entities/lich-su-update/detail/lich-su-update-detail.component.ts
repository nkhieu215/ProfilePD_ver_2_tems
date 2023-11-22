import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILichSuUpdate } from '../lich-su-update.model';

@Component({
  selector: 'jhi-lich-su-update-detail',
  templateUrl: './lich-su-update-detail.component.html',
})
export class LichSuUpdateDetailComponent implements OnInit {
  lichSuUpdate: ILichSuUpdate | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ lichSuUpdate }) => {
      this.lichSuUpdate = lichSuUpdate;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
