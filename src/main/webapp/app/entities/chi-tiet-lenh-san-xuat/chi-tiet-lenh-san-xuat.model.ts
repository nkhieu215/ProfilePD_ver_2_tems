import dayjs from 'dayjs/esm';
import { ILenhSanXuat } from 'app/entities/lenh-san-xuat/lenh-san-xuat.model';

export interface IChiTietLenhSanXuat {
  id?: number;
  reelID?: number;
  partNumber?: string;
  vendor?: string;
  lot?: string;
  userData1?: string;
  userData2?: string;
  userData3?: string;
  userData4?: number;
  userData5?: number;
  initialQuantity?: number;
  msdLevel?: string | null;
  msdInitialFloorTime?: string | null;
  msdBagSealDate?: string | null;
  marketUsage?: string | null;
  quantityOverride?: number;
  shelfTime?: string | null;
  spMaterialName?: string | null;
  warningLimit?: string | null;
  maximumLimit?: string | null;
  comments?: string | null;
  warmupTime?: dayjs.Dayjs | null;
  storageUnit?: string;
  subStorageUnit?: string | null;
  locationOverride?: string | null;
  expirationDate?: string;
  manufacturingDate?: string;
  partClass?: string | null;
  sapCode?: number | null;
  trangThai?: string | null;
  checked?: number | null;
  lenhSanXuat?: ILenhSanXuat | null;
}

export class ChiTietLenhSanXuat implements IChiTietLenhSanXuat {
  constructor(
    public id?: number,
    public reelID?: number,
    public partNumber?: string,
    public vendor?: string,
    public lot?: string,
    public userData1?: string,
    public userData2?: string,
    public userData3?: string,
    public userData4?: number,
    public userData5?: number,
    public initialQuantity?: number,
    public msdLevel?: string | null,
    public msdInitialFloorTime?: string | null,
    public msdBagSealDate?: string | null,
    public marketUsage?: string | null,
    public quantityOverride?: number,
    public shelfTime?: string | null,
    public spMaterialName?: string | null,
    public warningLimit?: string | null,
    public maximumLimit?: string | null,
    public comments?: string | null,
    public warmupTime?: dayjs.Dayjs | null,
    public storageUnit?: string,
    public subStorageUnit?: string | null,
    public locationOverride?: string | null,
    public expirationDate?: string,
    public manufacturingDate?: string,
    public partClass?: string | null,
    public sapCode?: number | null,
    public trangThai?: string | null,
    public checked?: number | null,
    public lenhSanXuat?: ILenhSanXuat | null
  ) {}
}

export function getChiTietLenhSanXuatIdentifier(chiTietLenhSanXuat: IChiTietLenhSanXuat): number | undefined {
  return chiTietLenhSanXuat.id;
}
