import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IChiTietSanXuat } from '../chi-tiet-san-xuat.model';

@Component({
  selector: 'jhi-chi-tiet-san-xuat-detail',
  templateUrl: './chi-tiet-san-xuat-detail.component.html',
})
export class ChiTietSanXuatDetailComponent implements OnInit {
  chiTietSanXuat: IChiTietSanXuat | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ chiTietSanXuat }) => {
      this.chiTietSanXuat = chiTietSanXuat;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
