import dayjs from 'dayjs/esm';
import { IChiTietSanXuat } from 'app/entities/chi-tiet-san-xuat/chi-tiet-san-xuat.model';

export interface ISanXuatHangNgay {
  id?: number;
  maKichBan?: string | null;
  maThietBi?: string | null;
  loaiThietBi?: string | null;
  dayChuyen?: string | null;
  nhomSanPham?: string | null;
  maSanPham?: string | null;
  versionSanPham?: string | null;
  ngayTao?: dayjs.Dayjs | null;
  timeUpdate?: dayjs.Dayjs | null;
  trangThai?: string | null;
  signal?: number | null;
  chiTietSanXuats?: IChiTietSanXuat[] | null;
}

export class SanXuatHangNgay implements ISanXuatHangNgay {
  constructor(
    public id?: number,
    public maKichBan?: string | null,
    public maThietBi?: string | null,
    public loaiThietBi?: string | null,
    public dayChuyen?: string | null,
    public nhomSanPham?: string | null,
    public maSanPham?: string | null,
    public versionSanPham?: string | null,
    public ngayTao?: dayjs.Dayjs | null,
    public timeUpdate?: dayjs.Dayjs | null,
    public trangThai?: string | null,
    public signal?: number | null,
    public chiTietSanXuats?: IChiTietSanXuat[] | null
  ) {}
}

export function getSanXuatHangNgayIdentifier(sanXuatHangNgay: ISanXuatHangNgay): number | undefined {
  return sanXuatHangNgay.id;
}
