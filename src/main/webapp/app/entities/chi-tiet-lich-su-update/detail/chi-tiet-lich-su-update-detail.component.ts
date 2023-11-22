import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IChiTietLichSuUpdate } from '../chi-tiet-lich-su-update.model';

@Component({
  selector: 'jhi-chi-tiet-lich-su-update-detail',
  templateUrl: './chi-tiet-lich-su-update-detail.component.html',
})
export class ChiTietLichSuUpdateDetailComponent implements OnInit {
  chiTietLichSuUpdate: IChiTietLichSuUpdate | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ chiTietLichSuUpdate }) => {
      this.chiTietLichSuUpdate = chiTietLichSuUpdate;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
