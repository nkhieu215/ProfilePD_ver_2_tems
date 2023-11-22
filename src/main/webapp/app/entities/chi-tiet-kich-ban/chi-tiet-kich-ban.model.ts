import { IKichBan } from 'app/entities/kich-ban/kich-ban.model';

export interface IChiTietKichBan {
  id?: number;
  maKichBan?: string | null;
  thongSo?: string | null;
  minValue?: number | null;
  maxValue?: number | null;
  trungbinh?: number | null;
  donVi?: string | null;
  phanLoai?: string | null;
  trangThai?: string | null;
  kichBan?: IKichBan | null;
}

export class ChiTietKichBan implements IChiTietKichBan {
  constructor(
    public id?: number,
    public maKichBan?: string | null,
    public thongSo?: string | null,
    public minValue?: number | null,
    public maxValue?: number | null,
    public trungbinh?: number | null,
    public donVi?: string | null,
    public phanLoai?: string | null,
    public trangThai?: string | null,
    public kichBan?: IKichBan | null
  ) {}
}

export function getChiTietKichBanIdentifier(chiTietKichBan: IChiTietKichBan): number | undefined {
  return chiTietKichBan.id;
}
