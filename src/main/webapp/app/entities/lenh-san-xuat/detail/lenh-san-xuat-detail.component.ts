import { HttpClient } from '@angular/common/http';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { IChiTietLenhSanXuat } from 'app/entities/chi-tiet-lenh-san-xuat/chi-tiet-lenh-san-xuat.model';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILenhSanXuat } from '../lenh-san-xuat.model';

@Component({
  selector: 'jhi-lenh-san-xuat-detail',
  templateUrl: './lenh-san-xuat-detail.component.html',
  styleUrls: ['./lenh-san-xuat-detail.component.css'],
})
export class LenhSanXuatDetailComponent implements OnInit {
  resourceUrl = this.applicationConfigService.getEndpointFor('/api/chi-tiet-lenh-san-xuat');
  lenhSanXuat: ILenhSanXuat | null = null;
  chiTietLenhSanXuats: IChiTietLenhSanXuat[] | null = [];
  predicate!: string;
  ascending!: boolean;

  @ViewChild('dvData') dvData!: ElementRef;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected applicationConfigService: ApplicationConfigService,
    protected http: HttpClient
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ lenhSanXuat }) => {
      this.lenhSanXuat = lenhSanXuat;
    });
    if (this.lenhSanXuat?.id) {
      this.http.get<any>(`${this.resourceUrl}/${this.lenhSanXuat.id}`).subscribe(res => {
        this.chiTietLenhSanXuats = res;
        console.log('res', res);
        console.log('lenhSanXuat', this.chiTietLenhSanXuats);
      });
    }
  }

  previousState(): void {
    window.history.back();
  }

  // exportTableToCSV(): void {
  //   const args: [HTMLTableElement, string] = [this.dvData.nativeElement.querySelector('table'), 'export.csv'];
  //   this.exportTableToCSV029(...args);
  // }

  // exportTableToCSV029(table: HTMLTableElement, filename: string): void {
  //   const rows = Array.from(table.querySelectorAll('tr:has(td'));
  //   const tmpColDelim = String.fromCharCode(11);
  //   const tmpRowDelim = String.fromCharCode(0);
  //   const colDelim = '","';
  //   const rowDelim = '"\r\n"';

  //   const csv = '"' + rows.map((row) => {
  //     const cols = Array.from(row.querySelectorAll('td'));
  //     return cols.map((col) => {
  //       const text = col.textContent ?? '';
  //       return text.replace(/"/g, '""'); // escape double quotes
  //     }).join(tmpColDelim);
  //   }).join(tmpRowDelim)
  //     .split(tmpRowDelim).join(rowDelim)
  //     .split(tmpColDelim).join(colDelim) + '"';

  //   if ((window.navigator as any).msSaveBlob) {
  //     const blob = new Blob([decodeURIComponent(csv)], { type: 'text/csv;charset=utf8' });

  //     window.navigator.msSaveBlob (blob, filename);
  //   } else if (window.Blob && window.URL) {
  //     const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  //     const csvUrl = URL.createObjectURL(blob);

  //     const link = document.createElement('a');
  //     link.href = csvUrl;
  //     link.style.visibility = 'hidden';
  //     link.download = filename;

  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   } else {
  //     const csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);

  //     const link = document.createElement('a');
  //     link.href = csvData;
  //     link.style.visibility = 'hidden';
  //     link.download = filename;

  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   }
  // }
}
