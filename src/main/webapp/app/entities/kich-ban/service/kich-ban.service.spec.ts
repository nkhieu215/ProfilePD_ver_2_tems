import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IKichBan, KichBan } from '../kich-ban.model';

import { KichBanService } from './kich-ban.service';

describe('KichBan Service', () => {
  let service: KichBanService;
  let httpMock: HttpTestingController;
  let elemDefault: IKichBan;
  let expectedResult: IKichBan | IKichBan[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(KichBanService);
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
      ngayTao: currentDate,
      timeUpdate: currentDate,
      updateBy: 'AAAAAAA',
      trangThai: 'AAAAAAA',
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

    it('should create a KichBan', () => {
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

      service.create(new KichBan()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a KichBan', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          maKichBan: 'BBBBBB',
          maThietBi: 'BBBBBB',
          loaiThietBi: 'BBBBBB',
          dayChuyen: 'BBBBBB',
          maSanPham: 'BBBBBB',
          versionSanPham: 'BBBBBB',
          ngayTao: currentDate.format(DATE_TIME_FORMAT),
          timeUpdate: currentDate.format(DATE_TIME_FORMAT),
          updateBy: 'BBBBBB',
          trangThai: 'BBBBBB',
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

    it('should partial update a KichBan', () => {
      const patchObject = Object.assign(
        {
          maKichBan: 'BBBBBB',
          maThietBi: 'BBBBBB',
          maSanPham: 'BBBBBB',
          updateBy: 'BBBBBB',
        },
        new KichBan()
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

    it('should return a list of KichBan', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          maKichBan: 'BBBBBB',
          maThietBi: 'BBBBBB',
          loaiThietBi: 'BBBBBB',
          dayChuyen: 'BBBBBB',
          maSanPham: 'BBBBBB',
          versionSanPham: 'BBBBBB',
          ngayTao: currentDate.format(DATE_TIME_FORMAT),
          timeUpdate: currentDate.format(DATE_TIME_FORMAT),
          updateBy: 'BBBBBB',
          trangThai: 'BBBBBB',
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

    it('should delete a KichBan', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addKichBanToCollectionIfMissing', () => {
      it('should add a KichBan to an empty array', () => {
        const kichBan: IKichBan = { id: 123 };
        expectedResult = service.addKichBanToCollectionIfMissing([], kichBan);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(kichBan);
      });

      it('should not add a KichBan to an array that contains it', () => {
        const kichBan: IKichBan = { id: 123 };
        const kichBanCollection: IKichBan[] = [
          {
            ...kichBan,
          },
          { id: 456 },
        ];
        expectedResult = service.addKichBanToCollectionIfMissing(kichBanCollection, kichBan);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a KichBan to an array that doesn't contain it", () => {
        const kichBan: IKichBan = { id: 123 };
        const kichBanCollection: IKichBan[] = [{ id: 456 }];
        expectedResult = service.addKichBanToCollectionIfMissing(kichBanCollection, kichBan);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(kichBan);
      });

      it('should add only unique KichBan to an array', () => {
        const kichBanArray: IKichBan[] = [{ id: 123 }, { id: 456 }, { id: 91167 }];
        const kichBanCollection: IKichBan[] = [{ id: 123 }];
        expectedResult = service.addKichBanToCollectionIfMissing(kichBanCollection, ...kichBanArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const kichBan: IKichBan = { id: 123 };
        const kichBan2: IKichBan = { id: 456 };
        expectedResult = service.addKichBanToCollectionIfMissing([], kichBan, kichBan2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(kichBan);
        expect(expectedResult).toContain(kichBan2);
      });

      it('should accept null and undefined values', () => {
        const kichBan: IKichBan = { id: 123 };
        expectedResult = service.addKichBanToCollectionIfMissing([], null, kichBan, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(kichBan);
      });

      it('should return initial array if no KichBan is added', () => {
        const kichBanCollection: IKichBan[] = [{ id: 123 }];
        expectedResult = service.addKichBanToCollectionIfMissing(kichBanCollection, undefined, null);
        expect(expectedResult).toEqual(kichBanCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
