import { HttpClient } from '@angular/common/http';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { IChiTietLenhSanXuat } from 'app/entities/chi-tiet-lenh-san-xuat/chi-tiet-lenh-san-xuat.model';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as XLSX from 'xlsx';
import { ILenhSanXuat } from '../lenh-san-xuat.model';
import { ngxCsv } from 'ngx-csv/ngx-csv';

@Component({
  selector: 'jhi-lenh-san-xuat-detail',
  templateUrl: './lenh-san-xuat-detail.component.html',
  styleUrls: ['./lenh-san-xuat-detail.component.css'],
})
export class LenhSanXuatDetailComponent implements OnInit {
  resourceUrl = this.applicationConfigService.getEndpointFor('/api/chi-tiet-lenh-san-xuat');
  lenhSanXuat: ILenhSanXuat | null = null;
  fileName = 'Chi-tiet-lenh-san-xuat';
  chiTietLenhSanXuats: IChiTietLenhSanXuat[] = [];
  chiTietLenhSanXuatExport: IChiTietLenhSanXuat[] = [];
  predicate!: string;
  ascending!: boolean;
  @Input() itemPerPage = 10;
  page?: number;

  // khởi tạo biến lưu dữ liệu xuất file
  data: {
    reelID?: string;
    partNumber?: string;
    vendor?: string;
    lot?: string;
    userData1?: string;
    userData2?: string;
    userData3?: string;
    userData4?: string;
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
    warmupTime?: string | null;
    storageUnit?: string;
    subStorageUnit?: string | null;
    locationOverride?: string | null;
    expirationDate?: string;
    manufacturingDate?: string;
    partClass?: string | null;
    sapCode?: string | null;
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
        this.chiTietLenhSanXuatExport = this.chiTietLenhSanXuats.filter(a => a.trangThai === 'active');
        this.dataExport(this.chiTietLenhSanXuatExport);
      });
    }
  }
  dataExport(list: IChiTietLenhSanXuat[]): void {
    for (let i = 0; i < this.chiTietLenhSanXuatExport.length; i++) {
      const data1: {
        reelID?: string;
        partNumber?: string;
        vendor?: string;
        lot?: string;
        userData1?: string;
        userData2?: string;
        userData3?: string;
        userData4?: string;
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
        warmupTime?: string | null;
        storageUnit?: string;
        subStorageUnit?: string | null;
        locationOverride?: string | null;
        expirationDate?: string;
        manufacturingDate?: string;
        partClass?: string | null;
        sapCode?: string | null;
      } = {
        reelID: list[i].reelID,
        partNumber: list[i].partNumber,
        vendor: list[i].vendor,
        lot: list[i].lot,
        userData1: list[i].userData1,
        userData2: list[i].userData2,
        userData3: list[i].userData3,
        userData4: list[i].userData4,
        userData5: list[i].userData5,
        initialQuantity: list[i].initialQuantity,
        msdLevel: list[i].msdLevel,
        msdInitialFloorTime: list[i].msdInitialFloorTime,
        msdBagSealDate: list[i].msdBagSealDate,
        marketUsage: list[i].marketUsage,
        quantityOverride: list[i].quantityOverride,
        shelfTime: list[i].shelfTime,
        spMaterialName: list[i].spMaterialName,
        warningLimit: list[i].warningLimit,
        maximumLimit: list[i].maximumLimit,
        comments: list[i].comments,
        warmupTime: list[i].warmupTime,
        storageUnit: list[i].storageUnit,
        subStorageUnit: list[i].subStorageUnit,
        locationOverride: list[i].locationOverride,
        expirationDate: list[i].expirationDate,
        manufacturingDate: list[i].manufacturingDate,
        partClass: list[i].partClass,
        sapCode: list[i].sapCode,
      };
      this.data.push(data1);
    }
    console.log(this.data);
  }
  exportCSV(): void {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '',
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
