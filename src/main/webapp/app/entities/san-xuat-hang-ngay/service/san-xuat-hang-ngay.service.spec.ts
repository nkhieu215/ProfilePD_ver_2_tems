import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ISanXuatHangNgay, SanXuatHangNgay } from '../san-xuat-hang-ngay.model';

import { SanXuatHangNgayService } from './san-xuat-hang-ngay.service';

describe('SanXuatHangNgay Service', () => {
  let service: SanXuatHangNgayService;
  let httpMock: HttpTestingController;
  let elemDefault: ISanXuatHangNgay;
  let expectedResult: ISanXuatHangNgay | ISanXuatHangNgay[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(SanXuatHangNgayService);
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

    it('should create a SanXuatHangNgay', () => {
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

      service.create(new SanXuatHangNgay()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a SanXuatHangNgay', () => {
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

    it('should partial update a SanXuatHangNgay', () => {
      const patchObject = Object.assign(
        {
          maThietBi: 'BBBBBB',
          dayChuyen: 'BBBBBB',
          maSanPham: 'BBBBBB',
          versionSanPham: 'BBBBBB',
          ngayTao: currentDate.format(DATE_TIME_FORMAT),
          trangThai: 'BBBBBB',
        },
        new SanXuatHangNgay()
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

    it('should return a list of SanXuatHangNgay', () => {
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

    it('should delete a SanXuatHangNgay', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addSanXuatHangNgayToCollectionIfMissing', () => {
      it('should add a SanXuatHangNgay to an empty array', () => {
        const sanXuatHangNgay: ISanXuatHangNgay = { id: 123 };
        expectedResult = service.addSanXuatHangNgayToCollectionIfMissing([], sanXuatHangNgay);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(sanXuatHangNgay);
      });

      it('should not add a SanXuatHangNgay to an array that contains it', () => {
        const sanXuatHangNgay: ISanXuatHangNgay = { id: 123 };
        const sanXuatHangNgayCollection: ISanXuatHangNgay[] = [
          {
            ...sanXuatHangNgay,
          },
          { id: 456 },
        ];
        expectedResult = service.addSanXuatHangNgayToCollectionIfMissing(sanXuatHangNgayCollection, sanXuatHangNgay);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a SanXuatHangNgay to an array that doesn't contain it", () => {
        const sanXuatHangNgay: ISanXuatHangNgay = { id: 123 };
        const sanXuatHangNgayCollection: ISanXuatHangNgay[] = [{ id: 456 }];
        expectedResult = service.addSanXuatHangNgayToCollectionIfMissing(sanXuatHangNgayCollection, sanXuatHangNgay);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(sanXuatHangNgay);
      });

      it('should add only unique SanXuatHangNgay to an array', () => {
        const sanXuatHangNgayArray: ISanXuatHangNgay[] = [{ id: 123 }, { id: 456 }, { id: 851 }];
        const sanXuatHangNgayCollection: ISanXuatHangNgay[] = [{ id: 123 }];
        expectedResult = service.addSanXuatHangNgayToCollectionIfMissing(sanXuatHangNgayCollection, ...sanXuatHangNgayArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const sanXuatHangNgay: ISanXuatHangNgay = { id: 123 };
        const sanXuatHangNgay2: ISanXuatHangNgay = { id: 456 };
        expectedResult = service.addSanXuatHangNgayToCollectionIfMissing([], sanXuatHangNgay, sanXuatHangNgay2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(sanXuatHangNgay);
        expect(expectedResult).toContain(sanXuatHangNgay2);
      });

      it('should accept null and undefined values', () => {
        const sanXuatHangNgay: ISanXuatHangNgay = { id: 123 };
        expectedResult = service.addSanXuatHangNgayToCollectionIfMissing([], null, sanXuatHangNgay, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(sanXuatHangNgay);
      });

      it('should return initial array if no SanXuatHangNgay is added', () => {
        const sanXuatHangNgayCollection: ISanXuatHangNgay[] = [{ id: 123 }];
        expectedResult = service.addSanXuatHangNgayToCollectionIfMissing(sanXuatHangNgayCollection, undefined, null);
        expect(expectedResult).toEqual(sanXuatHangNgayCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
