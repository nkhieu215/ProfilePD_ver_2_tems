import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ILichSuUpdate, LichSuUpdate } from '../lich-su-update.model';

import { LichSuUpdateService } from './lich-su-update.service';

describe('LichSuUpdate Service', () => {
  let service: LichSuUpdateService;
  let httpMock: HttpTestingController;
  let elemDefault: ILichSuUpdate;
  let expectedResult: ILichSuUpdate | ILichSuUpdate[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(LichSuUpdateService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      maKichBan: 'AAAAAAA',
      maThietBi: 'AAAAAAA',
      loaiThietBi: 'AAAAAAA',
      dayChuyen: 'AAAAAAA',
      maSanPham: 'AAAAAAA',
      versionSanPham: 'AAAAAAA',
      timeUpdate: currentDate,
      status: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          timeUpdate: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a LichSuUpdate', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          timeUpdate: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          timeUpdate: currentDate,
        },
        returnedFromService
      );

      service.create(new LichSuUpdate()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a LichSuUpdate', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          maKichBan: 'BBBBBB',
          maThietBi: 'BBBBBB',
          loaiThietBi: 'BBBBBB',
          dayChuyen: 'BBBBBB',
          maSanPham: 'BBBBBB',
          versionSanPham: 'BBBBBB',
          timeUpdate: currentDate.format(DATE_TIME_FORMAT),
          status: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          timeUpdate: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a LichSuUpdate', () => {
      const patchObject = Object.assign(
        {
          loaiThietBi: 'BBBBBB',
          maSanPham: 'BBBBBB',
        },
        new LichSuUpdate()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          timeUpdate: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of LichSuUpdate', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          maKichBan: 'BBBBBB',
          maThietBi: 'BBBBBB',
          loaiThietBi: 'BBBBBB',
          dayChuyen: 'BBBBBB',
          maSanPham: 'BBBBBB',
          versionSanPham: 'BBBBBB',
          timeUpdate: currentDate.format(DATE_TIME_FORMAT),
          status: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          timeUpdate: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a LichSuUpdate', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addLichSuUpdateToCollectionIfMissing', () => {
      it('should add a LichSuUpdate to an empty array', () => {
        const lichSuUpdate: ILichSuUpdate = { id: 123 };
        expectedResult = service.addLichSuUpdateToCollectionIfMissing([], lichSuUpdate);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(lichSuUpdate);
      });

      it('should not add a LichSuUpdate to an array that contains it', () => {
        const lichSuUpdate: ILichSuUpdate = { id: 123 };
        const lichSuUpdateCollection: ILichSuUpdate[] = [
          {
            ...lichSuUpdate,
          },
          { id: 456 },
        ];
        expectedResult = service.addLichSuUpdateToCollectionIfMissing(lichSuUpdateCollection, lichSuUpdate);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a LichSuUpdate to an array that doesn't contain it", () => {
        const lichSuUpdate: ILichSuUpdate = { id: 123 };
        const lichSuUpdateCollection: ILichSuUpdate[] = [{ id: 456 }];
        expectedResult = service.addLichSuUpdateToCollectionIfMissing(lichSuUpdateCollection, lichSuUpdate);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(lichSuUpdate);
      });

      it('should add only unique LichSuUpdate to an array', () => {
        const lichSuUpdateArray: ILichSuUpdate[] = [{ id: 123 }, { id: 456 }, { id: 84312 }];
        const lichSuUpdateCollection: ILichSuUpdate[] = [{ id: 123 }];
        expectedResult = service.addLichSuUpdateToCollectionIfMissing(lichSuUpdateCollection, ...lichSuUpdateArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const lichSuUpdate: ILichSuUpdate = { id: 123 };
        const lichSuUpdate2: ILichSuUpdate = { id: 456 };
        expectedResult = service.addLichSuUpdateToCollectionIfMissing([], lichSuUpdate, lichSuUpdate2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(lichSuUpdate);
        expect(expectedResult).toContain(lichSuUpdate2);
      });

      it('should accept null and undefined values', () => {
        const lichSuUpdate: ILichSuUpdate = { id: 123 };
        expectedResult = service.addLichSuUpdateToCollectionIfMissing([], null, lichSuUpdate, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(lichSuUpdate);
      });

      it('should return initial array if no LichSuUpdate is added', () => {
        const lichSuUpdateCollection: ILichSuUpdate[] = [{ id: 123 }];
        expectedResult = service.addLichSuUpdateToCollectionIfMissing(lichSuUpdateCollection, undefined, null);
        expect(expectedResult).toEqual(lichSuUpdateCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
