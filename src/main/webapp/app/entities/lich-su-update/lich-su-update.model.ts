import dayjs from 'dayjs/esm';
import { IChiTietLichSuUpdate } from 'app/entities/chi-tiet-lich-su-update/chi-tiet-lich-su-update.model';

export interface ILichSuUpdate {
  id?: number;
  maKichBan?: string | null;
  maThietBi?: string | null;
  loaiThietBi?: string | null;
  dayChuyen?: string | null;
  maSanPham?: string | null;
  versionSanPham?: string | null;
  timeUpdate?: dayjs.Dayjs | null;
  status?: string | null;
  chiTietLichSus?: IChiTietLichSuUpdate[] | null;
}

export class LichSuUpdate implements ILichSuUpdate {
  constructor(
    public id?: number,
    public maKichBan?: string | null,
    public maThietBi?: string | null,
    public loaiThietBi?: string | null,
    public dayChuyen?: string | null,
    public maSanPham?: string | null,
    public versionSanPham?: string | null,
    public timeUpdate?: dayjs.Dayjs | null,
    public status?: string | null,
    public chiTietLichSus?: IChiTietLichSuUpdate[] | null
  ) {}
}

export function getLichSuUpdateIdentifier(lichSuUpdate: ILichSuUpdate): number | undefined {
  return lichSuUpdate.id;
}
