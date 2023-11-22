import { ISanXuatHangNgay } from 'app/entities/san-xuat-hang-ngay/san-xuat-hang-ngay.model';

export interface IChiTietSanXuat {
  id?: number;
  maKichBan?: string | null;
  hangSxhn?: number | null;
  thongSo?: string | null;
  minValue?: number | null;
  maxValue?: number | null;
  trungbinh?: number | null;
  donVi?: string | null;
  trangThai?: string | null;
  sanXuatHangNgay?: ISanXuatHangNgay | null;
}

export class ChiTietSanXuat implements IChiTietSanXuat {
  constructor(
    public id?: number,
    public maKichBan?: string | null,
    public hangSxhn?: number | null,
    public thongSo?: string | null,
    public minValue?: number | null,
    public maxValue?: number | null,
    public trungbinh?: number | null,
    public donVi?: string | null,
    public trangThai?: string | null,
    public sanXuatHangNgay?: ISanXuatHangNgay | null
  ) {}
}

export function getChiTietSanXuatIdentifier(chiTietSanXuat: IChiTietSanXuat): number | undefined {
  return chiTietSanXuat.id;
}
