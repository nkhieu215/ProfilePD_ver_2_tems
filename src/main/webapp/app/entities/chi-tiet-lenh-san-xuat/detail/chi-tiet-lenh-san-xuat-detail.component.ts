import { ILenhSanXuat } from './../../lenh-san-xuat/lenh-san-xuat.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IChiTietLenhSanXuat } from '../chi-tiet-lenh-san-xuat.model';

@Component({
  selector: 'jhi-chi-tiet-lenh-san-xuat-detail',
  templateUrl: './chi-tiet-lenh-san-xuat-detail.component.html',
})
export class ChiTietLenhSanXuatDetailComponent implements OnInit {
  chiTietLenhSanXuat: IChiTietLenhSanXuat | null = null;
  lenhSanXuat: ILenhSanXuat | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ chiTietLenhSanXuat }) => {
      this.chiTietLenhSanXuat = chiTietLenhSanXuat;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
