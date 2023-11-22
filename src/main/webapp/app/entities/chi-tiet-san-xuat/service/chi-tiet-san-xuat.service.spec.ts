import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IChiTietSanXuat, ChiTietSanXuat } from '../chi-tiet-san-xuat.model';

import { ChiTietSanXuatService } from './chi-tiet-san-xuat.service';

describe('ChiTietSanXuat Service', () => {
  let service: ChiTietSanXuatService;
  let httpMock: HttpTestingController;
  let elemDefault: IChiTietSanXuat;
  let expectedResult: IChiTietSanXuat | IChiTietSanXuat[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ChiTietSanXuatService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      maKichBan: 'AAAAAAA',
      trangThai: 'AAAAAAA',
      thongSo: 'AAAAAAA',
      minValue: 0,
      maxValue: 0,
      trungbinh: 0,
      donVi: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a ChiTietSanXuat', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new ChiTietSanXuat()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ChiTietSanXuat', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          maKichBan: 'BBBBBB',
          hangSxhn: 1,
          thongSo: 'BBBBBB',
          minValue: 1,
          maxValue: 1,
          trungbinh: 1,
          donVi: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ChiTietSanXuat', () => {
      const patchObject = Object.assign(
        {
          maKichBan: 'BBBBBB',
          hangSxhn: 1,
          thongSo: 'BBBBBB',
          maxValue: 1,
          donVi: 'BBBBBB',
        },
        new ChiTietSanXuat()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ChiTietSanXuat', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          maKichBan: 'BBBBBB',
          hangSxhn: 1,
          thongSo: 'BBBBBB',
          minValue: 1,
          maxValue: 1,
          trungbinh: 1,
          donVi: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a ChiTietSanXuat', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addChiTietSanXuatToCollectionIfMissing', () => {
      it('should add a ChiTietSanXuat to an empty array', () => {
        const chiTietSanXuat: IChiTietSanXuat = { id: 123 };
        expectedResult = service.addChiTietSanXuatToCollectionIfMissing([], chiTietSanXuat);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(chiTietSanXuat);
      });

      it('should not add a ChiTietSanXuat to an array that contains it', () => {
        const chiTietSanXuat: IChiTietSanXuat = { id: 123 };
        const chiTietSanXuatCollection: IChiTietSanXuat[] = [
          {
            ...chiTietSanXuat,
          },
          { id: 456 },
        ];
        expectedResult = service.addChiTietSanXuatToCollectionIfMissing(chiTietSanXuatCollection, chiTietSanXuat);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ChiTietSanXuat to an array that doesn't contain it", () => {
        const chiTietSanXuat: IChiTietSanXuat = { id: 123 };
        const chiTietSanXuatCollection: IChiTietSanXuat[] = [{ id: 456 }];
        expectedResult = service.addChiTietSanXuatToCollectionIfMissing(chiTietSanXuatCollection, chiTietSanXuat);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(chiTietSanXuat);
      });

      it('should add only unique ChiTietSanXuat to an array', () => {
        const chiTietSanXuatArray: IChiTietSanXuat[] = [{ id: 123 }, { id: 456 }, { id: 82031 }];
        const chiTietSanXuatCollection: IChiTietSanXuat[] = [{ id: 123 }];
        expectedResult = service.addChiTietSanXuatToCollectionIfMissing(chiTietSanXuatCollection, ...chiTietSanXuatArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const chiTietSanXuat: IChiTietSanXuat = { id: 123 };
        const chiTietSanXuat2: IChiTietSanXuat = { id: 456 };
        expectedResult = service.addChiTietSanXuatToCollectionIfMissing([], chiTietSanXuat, chiTietSanXuat2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(chiTietSanXuat);
        expect(expectedResult).toContain(chiTietSanXuat2);
      });

      it('should accept null and undefined values', () => {
        const chiTietSanXuat: IChiTietSanXuat = { id: 123 };
        expectedResult = service.addChiTietSanXuatToCollectionIfMissing([], null, chiTietSanXuat, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(chiTietSanXuat);
      });

      it('should return initial array if no ChiTietSanXuat is added', () => {
        const chiTietSanXuatCollection: IChiTietSanXuat[] = [{ id: 123 }];
        expectedResult = service.addChiTietSanXuatToCollectionIfMissing(chiTietSanXuatCollection, undefined, null);
        expect(expectedResult).toEqual(chiTietSanXuatCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
