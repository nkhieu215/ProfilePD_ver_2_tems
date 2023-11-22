import dayjs from 'dayjs/esm';
import { IChiTietKichBan } from 'app/entities/chi-tiet-kich-ban/chi-tiet-kich-ban.model';

export interface IKichBan {
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
  updateBy?: string | null;
  trangThai?: string | null;
  signal?: number | null;
  chiTietKichBans?: IChiTietKichBan[] | null;
}

export class KichBan implements IKichBan {
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
    public updateBy?: string | null,
    public trangThai?: string | null,
    public signal?: number | null,
    public chiTietKichBans?: IChiTietKichBan[] | null
  ) {}
}

export function getKichBanIdentifier(kichBan: IKichBan): number | undefined {
  return kichBan.id;
}
