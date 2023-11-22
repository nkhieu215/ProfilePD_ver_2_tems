import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IChiTietKichBan } from '../chi-tiet-kich-ban.model';

@Component({
  selector: 'jhi-chi-tiet-kich-ban-detail',
  templateUrl: './chi-tiet-kich-ban-detail.component.html',
})
export class ChiTietKichBanDetailComponent implements OnInit {
  chiTietKichBan: IChiTietKichBan | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ chiTietKichBan }) => {
      this.chiTietKichBan = chiTietKichBan;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
