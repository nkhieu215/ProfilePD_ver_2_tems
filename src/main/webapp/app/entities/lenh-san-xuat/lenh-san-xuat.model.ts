import { IChiTietLenhSanXuat } from 'app/entities/chi-tiet-lenh-san-xuat/chi-tiet-lenh-san-xuat.model';

export interface ILenhSanXuat {
  id?: number;
  maLenhSanXuat?: string;
  sapCode?: string | null;
  sapName?: string | null;
  workOrderCode?: string | null;
  version?: string | null;
  storageCode?: string | null;
  totalQuantity?: string | null;
  createBy?: string | null;
  entryTime?: string | null;
  trangThai?: string | null;
  comment?: string | null;
  chiTietLenhSanXuats?: IChiTietLenhSanXuat[] | null;
}

export class LenhSanXuat implements ILenhSanXuat {
  constructor(
    public id?: number,
    public maLenhSanXuat?: string,
    public sapCode?: string | null,
    public sapName?: string | null,
    public workOrderCode?: string | null,
    public version?: string | null,
    public storageCode?: string | null,
    public totalQuantity?: string | null,
    public createBy?: string | null,
    public entryTime?: string | null,
    public trangThai?: string | null,
    public comment?: string | null,
    public chiTietLenhSanXuats?: IChiTietLenhSanXuat[] | null
  ) {}
}

export function getLenhSanXuatIdentifier(lenhSanXuat: ILenhSanXuat): number | undefined {
  return lenhSanXuat.id;
}
