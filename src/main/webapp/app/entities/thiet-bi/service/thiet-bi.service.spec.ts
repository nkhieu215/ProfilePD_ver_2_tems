import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IThietBi, ThietBi } from '../thiet-bi.model';

import { ThietBiService } from './thiet-bi.service';

describe('ThietBi Service', () => {
  let service: ThietBiService;
  let httpMock: HttpTestingController;
  let elemDefault: IThietBi;
  let expectedResult: IThietBi | IThietBi[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ThietBiService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      maThietBi: 'AAAAAAA',
      loaiThietBi: 'AAAAAAA',
      dayChuyen: 'AAAAAAA',
      ngayTao: currentDate,
      timeUpdate: currentDate,
      updateBy: 'AAAAAAA',
      status: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          ngayTao: currentDate.format(DATE_TIME_FORMAT),
          timeUpdate: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a ThietBi', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          ngayTao: currentDate.format(DATE_TIME_FORMAT),
          timeUpdate: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          ngayTao: currentDate,
          timeUpdate: currentDate,
        },
        returnedFromService
      );

      service.create(new ThietBi()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ThietBi', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          maThietBi: 'BBBBBB',
          loaiThietBi: 'BBBBBB',
          dayChuyen: 'BBBBBB',
          ngayTao: currentDate.format(DATE_TIME_FORMAT),
          timeUpdate: currentDate.format(DATE_TIME_FORMAT),
          updateBy: 'BBBBBB',
          status: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          ngayTao: currentDate,
          timeUpdate: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ThietBi', () => {
      const patchObject = Object.assign(
        {
          dayChuyen: 'BBBBBB',
          ngayTao: currentDate.format(DATE_TIME_FORMAT),
          updateBy: 'BBBBBB',
        },
        new ThietBi()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          ngayTao: currentDate,
          timeUpdate: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ThietBi', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          maThietBi: 'BBBBBB',
          loaiThietBi: 'BBBBBB',
          dayChuyen: 'BBBBBB',
          ngayTao: currentDate.format(DATE_TIME_FORMAT),
          timeUpdate: currentDate.format(DATE_TIME_FORMAT),
          updateBy: 'BBBBBB',
          status: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          ngayTao: currentDate,
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

    it('should delete a ThietBi', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addThietBiToCollectionIfMissing', () => {
      it('should add a ThietBi to an empty array', () => {
        const thietBi: IThietBi = { id: 123 };
        expectedResult = service.addThietBiToCollectionIfMissing([], thietBi);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(thietBi);
      });

      it('should not add a ThietBi to an array that contains it', () => {
        const thietBi: IThietBi = { id: 123 };
        const thietBiCollection: IThietBi[] = [
          {
            ...thietBi,
          },
          { id: 456 },
        ];
        expectedResult = service.addThietBiToCollectionIfMissing(thietBiCollection, thietBi);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ThietBi to an array that doesn't contain it", () => {
        const thietBi: IThietBi = { id: 123 };
        const thietBiCollection: IThietBi[] = [{ id: 456 }];
        expectedResult = service.addThietBiToCollectionIfMissing(thietBiCollection, thietBi);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(thietBi);
      });

      it('should add only unique ThietBi to an array', () => {
        const thietBiArray: IThietBi[] = [{ id: 123 }, { id: 456 }, { id: 80019 }];
        const thietBiCollection: IThietBi[] = [{ id: 123 }];
        expectedResult = service.addThietBiToCollectionIfMissing(thietBiCollection, ...thietBiArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const thietBi: IThietBi = { id: 123 };
        const thietBi2: IThietBi = { id: 456 };
        expectedResult = service.addThietBiToCollectionIfMissing([], thietBi, thietBi2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(thietBi);
        expect(expectedResult).toContain(thietBi2);
      });

      it('should accept null and undefined values', () => {
        const thietBi: IThietBi = { id: 123 };
        expectedResult = service.addThietBiToCollectionIfMissing([], null, thietBi, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(thietBi);
      });

      it('should return initial array if no ThietBi is added', () => {
        const thietBiCollection: IThietBi[] = [{ id: 123 }];
        expectedResult = service.addThietBiToCollectionIfMissing(thietBiCollection, undefined, null);
        expect(expectedResult).toEqual(thietBiCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
