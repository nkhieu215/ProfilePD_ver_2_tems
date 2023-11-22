import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IKichBan } from '../kich-ban.model';
import { HttpClient } from '@angular/common/http';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { IChiTietKichBan } from 'app/entities/chi-tiet-kich-ban/chi-tiet-kich-ban.model';

import * as XLSX from 'xlsx';

@Component({
  selector: 'jhi-kich-ban-detail',
  templateUrl: './kich-ban-detail.component.html',
  styleUrls: ['./kich-ban-detail.component.css'],
})
export class KichBanDetailComponent implements OnInit {
  resourceUrl = this.applicationConfigService.getEndpointFor('api/kich-ban/thong-so-kich-ban');
  predicate!: string;
  ascending!: boolean;
  kichBan: IKichBan | null = null;
  chiTietKichBans: IChiTietKichBan[] | null = [];
  kichBans: IKichBan[] | null = [];

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ kichBan }) => {
      this.kichBan = kichBan;
      console.log('kichban:', kichBan);
    });
    // lay thong tin thong so thiet bi
    if (this.kichBan?.id) {
      this.http.get<any>(`${this.resourceUrl}/${this.kichBan.id}`).subscribe(res => {
        this.chiTietKichBans = res;
        console.log('res :', res);
        console.log('chi tiet kich ban :', this.chiTietKichBans);
      });
    }
  }

  exportToExcel(): void {
    if (this.kichBans && this.chiTietKichBans) {
      // const exportDataKB = this.kichBans.map(res => ({
      //   'Mã kịch bản': res.maKichBan,
      //   'Nhóm thiết bị': res.maThietBi,
      //   'Mã thiết bị': res.loaiThietBi,
      //   'Dây chuyền': res.dayChuyen,
      //   'Nhóm sản phẩm': res.maSanPham,
      //   'Version sản phẩm': res.versionSanPham,
      //   'Ngày tạo': res.ngayTao,
      //   'Ngày cập nhật': res.timeUpdate,
      //   'Update By': res.updateBy,
      //   'Trạng thái': res.trangThai,
      // }));

      const exportData = this.chiTietKichBans.map(item => ({
        'Thông số': item.thongSo,
        Min: item.minValue,
        Max: item.maxValue,
        'Trung bình': item.trungbinh,
        'Đơn vị': item.donVi,
      }));

      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
      // const ws2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportDataKB);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'KichBanChiTiet');
      XLSX.writeFile(wb, 'kich-ban-chi-tiet.xlsx');
    }
  }

  previousState(): void {
    window.history.back();
  }
}
