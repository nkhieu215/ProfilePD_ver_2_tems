import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IThongSoMay } from '../thong-so-may.model';

@Component({
  selector: 'jhi-thong-so-may-detail',
  templateUrl: './thong-so-may-detail.component.html',
})
export class ThongSoMayDetailComponent implements OnInit {
  thongSoMay: IThongSoMay | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ thongSoMay }) => {
      this.thongSoMay = thongSoMay;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
