import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IChiTietLichSuUpdate, ChiTietLichSuUpdate } from '../chi-tiet-lich-su-update.model';

import { ChiTietLichSuUpdateService } from './chi-tiet-lich-su-update.service';

describe('ChiTietLichSuUpdate Service', () => {
  let service: ChiTietLichSuUpdateService;
  let httpMock: HttpTestingController;
  let elemDefault: IChiTietLichSuUpdate;
  let expectedResult: IChiTietLichSuUpdate | IChiTietLichSuUpdate[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ChiTietLichSuUpdateService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      maKichBan: 'AAAAAAA',
      hangLssx: 0,
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

    it('should create a ChiTietLichSuUpdate', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new ChiTietLichSuUpdate()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ChiTietLichSuUpdate', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          maKichBan: 'BBBBBB',
          hangLssx: 1,
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

    it('should partial update a ChiTietLichSuUpdate', () => {
      const patchObject = Object.assign(
        {
          hangLssx: 1,
          donVi: 'BBBBBB',
        },
        new ChiTietLichSuUpdate()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ChiTietLichSuUpdate', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          maKichBan: 'BBBBBB',
          hangLssx: 1,
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

    it('should delete a ChiTietLichSuUpdate', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addChiTietLichSuUpdateToCollectionIfMissing', () => {
      it('should add a ChiTietLichSuUpdate to an empty array', () => {
        const chiTietLichSuUpdate: IChiTietLichSuUpdate = { id: 123 };
        expectedResult = service.addChiTietLichSuUpdateToCollectionIfMissing([], chiTietLichSuUpdate);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(chiTietLichSuUpdate);
      });

      it('should not add a ChiTietLichSuUpdate to an array that contains it', () => {
        const chiTietLichSuUpdate: IChiTietLichSuUpdate = { id: 123 };
        const chiTietLichSuUpdateCollection: IChiTietLichSuUpdate[] = [
          {
            ...chiTietLichSuUpdate,
          },
          { id: 456 },
        ];
        expectedResult = service.addChiTietLichSuUpdateToCollectionIfMissing(chiTietLichSuUpdateCollection, chiTietLichSuUpdate);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ChiTietLichSuUpdate to an array that doesn't contain it", () => {
        const chiTietLichSuUpdate: IChiTietLichSuUpdate = { id: 123 };
        const chiTietLichSuUpdateCollection: IChiTietLichSuUpdate[] = [{ id: 456 }];
        expectedResult = service.addChiTietLichSuUpdateToCollectionIfMissing(chiTietLichSuUpdateCollection, chiTietLichSuUpdate);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(chiTietLichSuUpdate);
      });

      it('should add only unique ChiTietLichSuUpdate to an array', () => {
        const chiTietLichSuUpdateArray: IChiTietLichSuUpdate[] = [{ id: 123 }, { id: 456 }, { id: 61624 }];
        const chiTietLichSuUpdateCollection: IChiTietLichSuUpdate[] = [{ id: 123 }];
        expectedResult = service.addChiTietLichSuUpdateToCollectionIfMissing(chiTietLichSuUpdateCollection, ...chiTietLichSuUpdateArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const chiTietLichSuUpdate: IChiTietLichSuUpdate = { id: 123 };
        const chiTietLichSuUpdate2: IChiTietLichSuUpdate = { id: 456 };
        expectedResult = service.addChiTietLichSuUpdateToCollectionIfMissing([], chiTietLichSuUpdate, chiTietLichSuUpdate2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(chiTietLichSuUpdate);
        expect(expectedResult).toContain(chiTietLichSuUpdate2);
      });

      it('should accept null and undefined values', () => {
        const chiTietLichSuUpdate: IChiTietLichSuUpdate = { id: 123 };
        expectedResult = service.addChiTietLichSuUpdateToCollectionIfMissing([], null, chiTietLichSuUpdate, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(chiTietLichSuUpdate);
      });

      it('should return initial array if no ChiTietLichSuUpdate is added', () => {
        const chiTietLichSuUpdateCollection: IChiTietLichSuUpdate[] = [{ id: 123 }];
        expectedResult = service.addChiTietLichSuUpdateToCollectionIfMissing(chiTietLichSuUpdateCollection, undefined, null);
        expect(expectedResult).toEqual(chiTietLichSuUpdateCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
