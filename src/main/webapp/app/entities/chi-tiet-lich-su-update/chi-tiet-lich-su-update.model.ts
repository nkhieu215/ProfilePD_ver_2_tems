import { ILichSuUpdate } from 'app/entities/lich-su-update/lich-su-update.model';

export interface IChiTietLichSuUpdate {
  id?: number;
  maKichBan?: string | null;
  hangLssx?: number | null;
  thongSo?: string | null;
  minValue?: number | null;
  maxValue?: number | null;
  trungbinh?: number | null;
  donVi?: string | null;
  lichSuUpdate?: ILichSuUpdate | null;
}

export class ChiTietLichSuUpdate implements IChiTietLichSuUpdate {
  constructor(
    public id?: number,
    public maKichBan?: string | null,
    public hangLssx?: number | null,
    public thongSo?: string | null,
    public minValue?: number | null,
    public maxValue?: number | null,
    public trungbinh?: number | null,
    public donVi?: string | null,
    public lichSuUpdate?: ILichSuUpdate | null
  ) {}
}

export function getChiTietLichSuUpdateIdentifier(chiTietLichSuUpdate: IChiTietLichSuUpdate): number | undefined {
  return chiTietLichSuUpdate.id;
}
