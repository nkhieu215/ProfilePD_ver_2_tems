import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'thiet-bi',
        data: { pageTitle: 'Thiết bị' },
        loadChildren: () => import('./thiet-bi/thiet-bi.module').then(m => m.ThietBiModule),
      },
      {
        path: 'thong-so-may',
        data: { pageTitle: 'Thông số máy' },
        loadChildren: () => import('./thong-so-may/thong-so-may.module').then(m => m.ThongSoMayModule),
      },
      {
        path: 'san-xuat-hang-ngay',
        data: { pageTitle: 'Sản xuất hàng ngày' },
        loadChildren: () => import('./san-xuat-hang-ngay/san-xuat-hang-ngay.module').then(m => m.SanXuatHangNgayModule),
      },
      {
        path: 'chi-tiet-san-xuat',
        data: { pageTitle: 'Chi tiết sản xuất' },
        loadChildren: () => import('./chi-tiet-san-xuat/chi-tiet-san-xuat.module').then(m => m.ChiTietSanXuatModule),
      },
      {
        path: 'lich-su-update',
        data: { pageTitle: 'LichSuUpdates' },
        loadChildren: () => import('./lich-su-update/lich-su-update.module').then(m => m.LichSuUpdateModule),
      },
      {
        path: 'chi-tiet-lich-su-update',
        data: { pageTitle: 'ChiTietLichSuUpdates' },
        loadChildren: () => import('./chi-tiet-lich-su-update/chi-tiet-lich-su-update.module').then(m => m.ChiTietLichSuUpdateModule),
      },
      {
        path: 'kich-ban',
        data: { pageTitle: 'Kịch bản' },
        loadChildren: () => import('./kich-ban/kich-ban.module').then(m => m.KichBanModule),
      },
      {
        path: 'chi-tiet-kich-ban',
        data: { pageTitle: 'Chi tiết kịch bản' },
        loadChildren: () => import('./chi-tiet-kich-ban/chi-tiet-kich-ban.module').then(m => m.ChiTietKichBanModule),
      },
      {
        path: 'quan-ly-thong-so',
        data: { pageTitle: 'Quản lý thông số' },
        loadChildren: () => import('./quan-ly-thong-so/quan-ly-thong-so.module').then(m => m.QuanLyThongSoModule),
      },
      {
        path: 'lenh-san-xuat',
        data: { pageTitle: 'Lệnh sản xuất' },
        loadChildren: () => import('./lenh-san-xuat/lenh-san-xuat.module').then(m => m.LenhSanXuatModule),
      },
      {
        path: 'chi-tiet-lenh-san-xuat',
        data: { page: 'Chi tiết lệnh sản xuất' },
        loadChildren: () => import('./chi-tiet-lenh-san-xuat/chi-tiet-lenh-san-xuat.module').then(m => m.ChiTietLenhSanXuatModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
