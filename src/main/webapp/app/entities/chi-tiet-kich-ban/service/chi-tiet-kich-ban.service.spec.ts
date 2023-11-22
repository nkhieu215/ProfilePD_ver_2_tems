import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IChiTietKichBan, ChiTietKichBan } from '../chi-tiet-kich-ban.model';

import { ChiTietKichBanService } from './chi-tiet-kich-ban.service';

describe('ChiTietKichBan Service', () => {
  let service: ChiTietKichBanService;
  let httpMock: HttpTestingController;
  let elemDefault: IChiTietKichBan;
  let expectedResult: IChiTietKichBan | IChiTietKichBan[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ChiTietKichBanService);
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
      phanLoai: 'AAAAAAA',
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

    it('should create a ChiTietKichBan', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new ChiTietKichBan()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ChiTietKichBan', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          maKichBan: 'BBBBBB',
          hangMkb: 1,
          thongSo: 'BBBBBB',
          minValue: 1,
          maxValue: 1,
          trungbinh: 1,
          donVi: 'BBBBBB',
          phanLoai: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ChiTietKichBan', () => {
      const patchObject = Object.assign(
        {
          maKichBan: 'BBBBBB',
          thongSo: 'BBBBBB',
          maxValue: 1,
        },
        new ChiTietKichBan()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ChiTietKichBan', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          maKichBan: 'BBBBBB',
          hangMkb: 1,
          thongSo: 'BBBBBB',
          minValue: 1,
          maxValue: 1,
          trungbinh: 1,
          donVi: 'BBBBBB',
          phanLoai: 'BBBBBB',
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

    it('should delete a ChiTietKichBan', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addChiTietKichBanToCollectionIfMissing', () => {
      it('should add a ChiTietKichBan to an empty array', () => {
        const chiTietKichBan: IChiTietKichBan = { id: 123 };
        expectedResult = service.addChiTietKichBanToCollectionIfMissing([], chiTietKichBan);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(chiTietKichBan);
      });

      it('should not add a ChiTietKichBan to an array that contains it', () => {
        const chiTietKichBan: IChiTietKichBan = { id: 123 };
        const chiTietKichBanCollection: IChiTietKichBan[] = [
          {
            ...chiTietKichBan,
          },
          { id: 456 },
        ];
        expectedResult = service.addChiTietKichBanToCollectionIfMissing(chiTietKichBanCollection, chiTietKichBan);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ChiTietKichBan to an array that doesn't contain it", () => {
        const chiTietKichBan: IChiTietKichBan = { id: 123 };
        const chiTietKichBanCollection: IChiTietKichBan[] = [{ id: 456 }];
        expectedResult = service.addChiTietKichBanToCollectionIfMissing(chiTietKichBanCollection, chiTietKichBan);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(chiTietKichBan);
      });

      it('should add only unique ChiTietKichBan to an array', () => {
        const chiTietKichBanArray: IChiTietKichBan[] = [{ id: 123 }, { id: 456 }, { id: 3240 }];
        const chiTietKichBanCollection: IChiTietKichBan[] = [{ id: 123 }];
        expectedResult = service.addChiTietKichBanToCollectionIfMissing(chiTietKichBanCollection, ...chiTietKichBanArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const chiTietKichBan: IChiTietKichBan = { id: 123 };
        const chiTietKichBan2: IChiTietKichBan = { id: 456 };
        expectedResult = service.addChiTietKichBanToCollectionIfMissing([], chiTietKichBan, chiTietKichBan2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(chiTietKichBan);
        expect(expectedResult).toContain(chiTietKichBan2);
      });

      it('should accept null and undefined values', () => {
        const chiTietKichBan: IChiTietKichBan = { id: 123 };
        expectedResult = service.addChiTietKichBanToCollectionIfMissing([], null, chiTietKichBan, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(chiTietKichBan);
      });

      it('should return initial array if no ChiTietKichBan is added', () => {
        const chiTietKichBanCollection: IChiTietKichBan[] = [{ id: 123 }];
        expectedResult = service.addChiTietKichBanToCollectionIfMissing(chiTietKichBanCollection, undefined, null);
        expect(expectedResult).toEqual(chiTietKichBanCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
