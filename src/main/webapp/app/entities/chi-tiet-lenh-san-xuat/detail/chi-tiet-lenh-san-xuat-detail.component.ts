import { ngxCsv } from 'ngx-csv/ngx-csv';
import dayjs from 'dayjs';
import { HttpClient } from '@angular/common/http';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { ILenhSanXuat } from './../../lenh-san-xuat/lenh-san-xuat.model';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as XLSX from 'xlsx';

import { IChiTietLenhSanXuat } from '../chi-tiet-lenh-san-xuat.model';

@Component({
  selector: 'jhi-chi-tiet-lenh-san-xuat-detail',
  templateUrl: './chi-tiet-lenh-san-xuat-detail.component.html',
  styleUrls: ['./chi-tiet-lenh-san-xuat-detail.component.css'],
})
export class ChiTietLenhSanXuatDetailComponent implements OnInit {
  resourceUrl = this.applicationConfigService.getEndpointFor('/api/chi-tiet-lenh-san-xuat');

  chiTietLenhSanXuat: IChiTietLenhSanXuat | null = null;
  lenhSanXuat: ILenhSanXuat | null = null;
  chiTietLenhSanXuats: IChiTietLenhSanXuat[] = [];
  lenhSanXuats: ILenhSanXuat[] = [];

  @Input() itemPerPage = 10;
  page?: number;

  predicate!: string;
  ascending!: boolean;

  fileName = 'Chi-tiet-lenh-san-xuat';

  data: {
    reelID?: number;
    partNumber?: string;
    vendor?: string;
    lot?: string;
    userData1?: string;
    userData2?: string;
    userData3?: string;
    userData4?: number;
    userData5?: number;
    initialQuantity?: number;
    msdLevel?: string | null;
    msdInitialFloorTime?: string | null;
    msdBagSealDate?: string | null;
    marketUsage?: string | null;
    quantityOverride?: number;
    shelfTime?: string | null;
    spMaterialName?: string | null;
    warningLimit?: string | null;
    maximumLimit?: string | null;
    comments?: string | null;
    warmupTime?: dayjs.Dayjs | null;
    storageUnit?: string;
    subStorageUnit?: string | null;
    locationOverride?: string | null;
    expirationDate?: string;
    manufacturingDate?: string;
    partClass?: string | null;
    sapCode?: number | null;
  }[] = [];

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
        // this.dataExport(this.chiTietLenhSanXuats);
      });
    }
  }

  exportCSV(): void {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: false,
      title: 'Your title',
      useBom: true,
      noDownload: false,
      headers: [
        'ReelID',
        'PartNumber',
        'Vendor',
        'Lot',
        'UserData1',
        'UserData2',
        'UserData3',
        'UserData4',
        'UserData5',
        'InitialQuantity',
        'MsdLevel',
        'MsdInitialFloorTime',
        'MsdBagSealDate',
        'MarketUsage',
        'QuantityOverride',
        'ShelfTime',
        'SpMaterialName',
        'WarningLimit',
        'MaximumLimit',
        'Comments',
        'WarmupTime',
        'StorageUnit',
        'SubStorageUnit',
        'LocationOverride',
        'ExpirationDate',
        'ManufacturingDate',
        'PartClass',
        'SapCode',
      ],
    };
    new ngxCsv(this.data, this.fileName, options);
  }

  exportToExcel(): void {
    // const data = document.getElementById("table-data");
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.data);
    // create workbook
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'ChiTietSanXuatHangNgay');
    XLSX.writeFile(wb, `${this.fileName}.xlsx`);
  }

  previousState(): void {
    window.history.back();
  }
}
