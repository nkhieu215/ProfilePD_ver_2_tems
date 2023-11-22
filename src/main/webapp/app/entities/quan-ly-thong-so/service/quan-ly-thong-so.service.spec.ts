import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IQuanLyThongSo, QuanLyThongSo } from '../quan-ly-thong-so.model';

import { QuanLyThongSoService } from './quan-ly-thong-so.service';

describe('QuanLyThongSo Service', () => {
  let service: QuanLyThongSoService;
  let httpMock: HttpTestingController;
  let elemDefault: IQuanLyThongSo;
  let expectedResult: IQuanLyThongSo | IQuanLyThongSo[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(QuanLyThongSoService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      maThongSo: 'AAAAAAA',
      tenThongSo: 'AAAAAAA',
      moTa: 'AAAAAAA',
      ngayTao: currentDate,
      ngayUpdate: currentDate,
      updateBy: 'AAAAAAA',
      status: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          ngayTao: currentDate.format(DATE_TIME_FORMAT),
          ngayUpdate: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a QuanLyThongSo', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          ngayTao: currentDate.format(DATE_TIME_FORMAT),
          ngayUpdate: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          ngayTao: currentDate,
          ngayUpdate: currentDate,
        },
        returnedFromService
      );

      service.create(new QuanLyThongSo()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a QuanLyThongSo', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          maThongSo: 'BBBBBB',
          tenThongSo: 'BBBBBB',
          moTa: 'BBBBBB',
          ngayTao: currentDate.format(DATE_TIME_FORMAT),
          ngayUpdate: currentDate.format(DATE_TIME_FORMAT),
          updateBy: 'BBBBBB',
          status: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          ngayTao: currentDate,
          ngayUpdate: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a QuanLyThongSo', () => {
      const patchObject = Object.assign(
        {
          maThongSo: 'BBBBBB',
          moTa: 'BBBBBB',
          ngayUpdate: currentDate.format(DATE_TIME_FORMAT),
          updateBy: 'BBBBBB',
          status: 'BBBBBB',
        },
        new QuanLyThongSo()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          ngayTao: currentDate,
          ngayUpdate: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of QuanLyThongSo', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          maThongSo: 'BBBBBB',
          tenThongSo: 'BBBBBB',
          moTa: 'BBBBBB',
          ngayTao: currentDate.format(DATE_TIME_FORMAT),
          ngayUpdate: currentDate.format(DATE_TIME_FORMAT),
          updateBy: 'BBBBBB',
          status: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          ngayTao: currentDate,
          ngayUpdate: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a QuanLyThongSo', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addQuanLyThongSoToCollectionIfMissing', () => {
      it('should add a QuanLyThongSo to an empty array', () => {
        const quanLyThongSo: IQuanLyThongSo = { id: 123 };
        expectedResult = service.addQuanLyThongSoToCollectionIfMissing([], quanLyThongSo);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(quanLyThongSo);
      });

      it('should not add a QuanLyThongSo to an array that contains it', () => {
        const quanLyThongSo: IQuanLyThongSo = { id: 123 };
        const quanLyThongSoCollection: IQuanLyThongSo[] = [
          {
            ...quanLyThongSo,
          },
          { id: 456 },
        ];
        expectedResult = service.addQuanLyThongSoToCollectionIfMissing(quanLyThongSoCollection, quanLyThongSo);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a QuanLyThongSo to an array that doesn't contain it", () => {
        const quanLyThongSo: IQuanLyThongSo = { id: 123 };
        const quanLyThongSoCollection: IQuanLyThongSo[] = [{ id: 456 }];
        expectedResult = service.addQuanLyThongSoToCollectionIfMissing(quanLyThongSoCollection, quanLyThongSo);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(quanLyThongSo);
      });

      it('should add only unique QuanLyThongSo to an array', () => {
        const quanLyThongSoArray: IQuanLyThongSo[] = [{ id: 123 }, { id: 456 }, { id: 35895 }];
        const quanLyThongSoCollection: IQuanLyThongSo[] = [{ id: 123 }];
        expectedResult = service.addQuanLyThongSoToCollectionIfMissing(quanLyThongSoCollection, ...quanLyThongSoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const quanLyThongSo: IQuanLyThongSo = { id: 123 };
        const quanLyThongSo2: IQuanLyThongSo = { id: 456 };
        expectedResult = service.addQuanLyThongSoToCollectionIfMissing([], quanLyThongSo, quanLyThongSo2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(quanLyThongSo);
        expect(expectedResult).toContain(quanLyThongSo2);
      });

      it('should accept null and undefined values', () => {
        const quanLyThongSo: IQuanLyThongSo = { id: 123 };
        expectedResult = service.addQuanLyThongSoToCollectionIfMissing([], null, quanLyThongSo, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(quanLyThongSo);
      });

      it('should return initial array if no QuanLyThongSo is added', () => {
        const quanLyThongSoCollection: IQuanLyThongSo[] = [{ id: 123 }];
        expectedResult = service.addQuanLyThongSoToCollectionIfMissing(quanLyThongSoCollection, undefined, null);
        expect(expectedResult).toEqual(quanLyThongSoCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
