import dayjs from 'dayjs/esm';

export interface IQuanLyThongSo {
  id?: number;
  maThongSo?: string | null;
  tenThongSo?: string | null;
  moTa?: string | null;
  ngayTao?: dayjs.Dayjs | null;
  ngayUpdate?: dayjs.Dayjs | null;
  updateBy?: string | null;
  status?: string | null;
}

export class QuanLyThongSo implements IQuanLyThongSo {
  constructor(
    public id?: number,
    public maThongSo?: string | null,
    public tenThongSo?: string | null,
    public moTa?: string | null,
    public ngayTao?: dayjs.Dayjs | null,
    public ngayUpdate?: dayjs.Dayjs | null,
    public updateBy?: string | null,
    public status?: string | null
  ) {}
}

export function getQuanLyThongSoIdentifier(quanLyThongSo: IQuanLyThongSo): number | undefined {
  return quanLyThongSo.id;
}
