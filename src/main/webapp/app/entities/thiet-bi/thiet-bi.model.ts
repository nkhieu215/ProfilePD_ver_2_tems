import dayjs from 'dayjs/esm';
import { IThongSoMay } from 'app/entities/thong-so-may/thong-so-may.model';

export interface IThietBi {
  id?: number;
  maThietBi?: string | null;
  loaiThietBi?: string | null;
  dayChuyen?: string | null;
  ngayTao?: dayjs.Dayjs | null;
  timeUpdate?: dayjs.Dayjs | null;
  updateBy?: string | null;
  status?: string | null;
  thongSoMays?: IThongSoMay[] | null;
}

export class ThietBi implements IThietBi {
  constructor(
    public id?: number,
    public maThietBi?: string | null,
    public loaiThietBi?: string | null,
    public dayChuyen?: string | null,
    public ngayTao?: dayjs.Dayjs | null,
    public timeUpdate?: dayjs.Dayjs | null,
    public updateBy?: string | null,
    public status?: string | null,
    public thongSoMays?: IThongSoMay[] | null
  ) {}
}

export function getThietBiIdentifier(thietBi: IThietBi): number | undefined {
  return thietBi.id;
}
