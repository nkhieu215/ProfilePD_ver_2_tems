import { IThietBi } from 'app/entities/thiet-bi/thiet-bi.model';

export interface IThongSoMay {
  id?: number;
  maThietBi?: string | null;
  loaiThietBi?: string | null;
  hangTms?: number | null;
  thongSo?: string | null;
  moTa?: string | null;
  trangThai?: string | null;
  phanLoai?: string | null;
  thietBi?: IThietBi | null;
}

export class ThongSoMay implements IThongSoMay {
  constructor(
    public id?: number,
    public maThietBi?: string | null,
    public loaiThietBi?: string | null,
    public hangTms?: number | null,
    public thongSo?: string | null,
    public moTa?: string | null,
    public trangThai?: string | null,
    public phanLoai?: string | null,
    public thietBi?: IThietBi | null
  ) {}
}

export function getThongSoMayIdentifier(thongSoMay: IThongSoMay): number | undefined {
  return thongSoMay.id;
}
