import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IChiTietLenhSanXuat, ChiTietLenhSanXuat } from '../chi-tiet-lenh-san-xuat.model';

import { ChiTietLenhSanXuatService } from './chi-tiet-lenh-san-xuat.service';

describe('ChiTietLenhSanXuat Service', () => {
  let service: ChiTietLenhSanXuatService;
  let httpMock: HttpTestingController;
  let elemDefault: IChiTietLenhSanXuat;
  let expectedResult: IChiTietLenhSanXuat | IChiTietLenhSanXuat[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ChiTietLenhSanXuatService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      reelID: 0,
      partNumber: 'AAAAAAA',
      vendor: 'AAAAAAA',
      lot: 'AAAAAAA',
      userData1: 'AAAAAAA',
      userData2: 'AAAAAAA',
      userData3: 'AAAAAAA',
      userData4: 0,
      userData5: 0,
      initialQuantity: 0,
      msdLevel: 'AAAAAAA',
      msdInitialFloorTime: 'AAAAAAA',
      msdBagSealDate: 'AAAAAAA',
      marketUsage: 'AAAAAAA',
      quantityOverride: 0,
      shelfTime: 'AAAAAAA',
      spMaterialName: 'AAAAAAA',
      warningLimit: 'AAAAAAA',
      maximumLimit: 'AAAAAAA',
      comments: 'AAAAAAA',
      warmupTime: currentDate,
      storageUnit: 'AAAAAAA',
      subStorageUnit: 'AAAAAAA',
      locationOverride: 'AAAAAAA',
      expirationDate: 'AAAAAAA',
      manufacturingDate: 'AAAAAAA',
      partClass: 'AAAAAAA',
      sapCode: 0,
      trangThai: 'AAAAAAA',
      checked: 0,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          warmupTime: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a ChiTietLenhSanXuat', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          warmupTime: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          warmupTime: currentDate,
        },
        returnedFromService
      );

      service.create(new ChiTietLenhSanXuat()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ChiTietLenhSanXuat', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          reelID: 1,
          partNumber: 'BBBBBB',
          vendor: 'BBBBBB',
          lot: 'BBBBBB',
          userData1: 'BBBBBB',
          userData2: 'BBBBBB',
          userData3: 'BBBBBB',
          userData4: 1,
          userData5: 1,
          initialQuantity: 1,
          msdLevel: 'BBBBBB',
          msdInitialFloorTime: 'BBBBBB',
          msdBagSealDate: 'BBBBBB',
          marketUsage: 'BBBBBB',
          quantityOverride: 1,
          shelfTime: 'BBBBBB',
          spMaterialName: 'BBBBBB',
          warningLimit: 'BBBBBB',
          maximumLimit: 'BBBBBB',
          comments: 'BBBBBB',
          warmupTime: currentDate.format(DATE_TIME_FORMAT),
          storageUnit: 'BBBBBB',
          subStorageUnit: 'BBBBBB',
          locationOverride: 'BBBBBB',
          expirationDate: 'BBBBBB',
          manufacturingDate: 'BBBBBB',
          partClass: 'BBBBBB',
          sapCode: 1,
          trangThai: 'BBBBBB',
          checked: 1,
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          warmupTime: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ChiTietLenhSanXuat', () => {
      const patchObject = Object.assign(
        {
          partNumber: 'BBBBBB',
          vendor: 'BBBBBB',
          lot: 'BBBBBB',
          userData1: 'BBBBBB',
          userData3: 'BBBBBB',
          userData4: 1,
          msdLevel: 'BBBBBB',
          marketUsage: 'BBBBBB',
          quantityOverride: 1,
          shelfTime: 'BBBBBB',
          spMaterialName: 'BBBBBB',
          warningLimit: 'BBBBBB',
          maximumLimit: 'BBBBBB',
          warmupTime: currentDate.format(DATE_TIME_FORMAT),
          subStorageUnit: 'BBBBBB',
          manufacturingDate: 'BBBBBB',
          partClass: 'BBBBBB',
          checked: 1,
        },
        new ChiTietLenhSanXuat()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          warmupTime: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ChiTietLenhSanXuat', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          reelID: 1,
          partNumber: 'BBBBBB',
          vendor: 'BBBBBB',
          lot: 'BBBBBB',
          userData1: 'BBBBBB',
          userData2: 'BBBBBB',
          userData3: 'BBBBBB',
          userData4: 1,
          userData5: 1,
          initialQuantity: 1,
          msdLevel: 'BBBBBB',
          msdInitialFloorTime: 'BBBBBB',
          msdBagSealDate: 'BBBBBB',
          marketUsage: 'BBBBBB',
          quantityOverride: 1,
          shelfTime: 'BBBBBB',
          spMaterialName: 'BBBBBB',
          warningLimit: 'BBBBBB',
          maximumLimit: 'BBBBBB',
          comments: 'BBBBBB',
          warmupTime: currentDate.format(DATE_TIME_FORMAT),
          storageUnit: 'BBBBBB',
          subStorageUnit: 'BBBBBB',
          locationOverride: 'BBBBBB',
          expirationDate: 'BBBBBB',
          manufacturingDate: 'BBBBBB',
          partClass: 'BBBBBB',
          sapCode: 1,
          trangThai: 'BBBBBB',
          checked: 1,
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          warmupTime: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a ChiTietLenhSanXuat', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addChiTietLenhSanXuatToCollectionIfMissing', () => {
      it('should add a ChiTietLenhSanXuat to an empty array', () => {
        const chiTietLenhSanXuat: IChiTietLenhSanXuat = { id: 123 };
        expectedResult = service.addChiTietLenhSanXuatToCollectionIfMissing([], chiTietLenhSanXuat);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(chiTietLenhSanXuat);
      });

      it('should not add a ChiTietLenhSanXuat to an array that contains it', () => {
        const chiTietLenhSanXuat: IChiTietLenhSanXuat = { id: 123 };
        const chiTietLenhSanXuatCollection: IChiTietLenhSanXuat[] = [
          {
            ...chiTietLenhSanXuat,
          },
          { id: 456 },
        ];
        expectedResult = service.addChiTietLenhSanXuatToCollectionIfMissing(chiTietLenhSanXuatCollection, chiTietLenhSanXuat);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ChiTietLenhSanXuat to an array that doesn't contain it", () => {
        const chiTietLenhSanXuat: IChiTietLenhSanXuat = { id: 123 };
        const chiTietLenhSanXuatCollection: IChiTietLenhSanXuat[] = [{ id: 456 }];
        expectedResult = service.addChiTietLenhSanXuatToCollectionIfMissing(chiTietLenhSanXuatCollection, chiTietLenhSanXuat);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(chiTietLenhSanXuat);
      });

      it('should add only unique ChiTietLenhSanXuat to an array', () => {
        const chiTietLenhSanXuatArray: IChiTietLenhSanXuat[] = [{ id: 123 }, { id: 456 }, { id: 38175 }];
        const chiTietLenhSanXuatCollection: IChiTietLenhSanXuat[] = [{ id: 123 }];
        expectedResult = service.addChiTietLenhSanXuatToCollectionIfMissing(chiTietLenhSanXuatCollection, ...chiTietLenhSanXuatArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const chiTietLenhSanXuat: IChiTietLenhSanXuat = { id: 123 };
        const chiTietLenhSanXuat2: IChiTietLenhSanXuat = { id: 456 };
        expectedResult = service.addChiTietLenhSanXuatToCollectionIfMissing([], chiTietLenhSanXuat, chiTietLenhSanXuat2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(chiTietLenhSanXuat);
        expect(expectedResult).toContain(chiTietLenhSanXuat2);
      });

      it('should accept null and undefined values', () => {
        const chiTietLenhSanXuat: IChiTietLenhSanXuat = { id: 123 };
        expectedResult = service.addChiTietLenhSanXuatToCollectionIfMissing([], null, chiTietLenhSanXuat, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(chiTietLenhSanXuat);
      });

      it('should return initial array if no ChiTietLenhSanXuat is added', () => {
        const chiTietLenhSanXuatCollection: IChiTietLenhSanXuat[] = [{ id: 123 }];
        expectedResult = service.addChiTietLenhSanXuatToCollectionIfMissing(chiTietLenhSanXuatCollection, undefined, null);
        expect(expectedResult).toEqual(chiTietLenhSanXuatCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
