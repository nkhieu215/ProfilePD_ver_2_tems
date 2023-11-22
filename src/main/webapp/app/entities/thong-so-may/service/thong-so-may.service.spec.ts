import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IThongSoMay, ThongSoMay } from '../thong-so-may.model';

import { ThongSoMayService } from './thong-so-may.service';

describe('ThongSoMay Service', () => {
  let service: ThongSoMayService;
  let httpMock: HttpTestingController;
  let elemDefault: IThongSoMay;
  let expectedResult: IThongSoMay | IThongSoMay[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ThongSoMayService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      maThietBi: 'AAAAAAA',
      loaiThietBi: 'AAAAAAA',
      hangTms: 0,
      thongSo: 'AAAAAAA',
      moTa: 'AAAAAAA',
      trangThai: 'AAAAAAA',
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

    it('should create a ThongSoMay', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new ThongSoMay()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ThongSoMay', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          maThietBi: 'BBBBBB',
          loaiThietBi: 'BBBBBB',
          hangTms: 1,
          thongSo: 'BBBBBB',
          moTa: 'BBBBBB',
          trangThai: 'BBBBBB',
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

    it('should partial update a ThongSoMay', () => {
      const patchObject = Object.assign(
        {
          maThietBi: 'BBBBBB',
          thongSo: 'BBBBBB',
          moTa: 'BBBBBB',
          trangThai: 'BBBBBB',
          phanLoai: 'BBBBBB',
        },
        new ThongSoMay()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ThongSoMay', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          maThietBi: 'BBBBBB',
          loaiThietBi: 'BBBBBB',
          hangTms: 1,
          thongSo: 'BBBBBB',
          moTa: 'BBBBBB',
          trangThai: 'BBBBBB',
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

    it('should delete a ThongSoMay', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addThongSoMayToCollectionIfMissing', () => {
      it('should add a ThongSoMay to an empty array', () => {
        const thongSoMay: IThongSoMay = { id: 123 };
        expectedResult = service.addThongSoMayToCollectionIfMissing([], thongSoMay);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(thongSoMay);
      });

      it('should not add a ThongSoMay to an array that contains it', () => {
        const thongSoMay: IThongSoMay = { id: 123 };
        const thongSoMayCollection: IThongSoMay[] = [
          {
            ...thongSoMay,
          },
          { id: 456 },
        ];
        expectedResult = service.addThongSoMayToCollectionIfMissing(thongSoMayCollection, thongSoMay);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ThongSoMay to an array that doesn't contain it", () => {
        const thongSoMay: IThongSoMay = { id: 123 };
        const thongSoMayCollection: IThongSoMay[] = [{ id: 456 }];
        expectedResult = service.addThongSoMayToCollectionIfMissing(thongSoMayCollection, thongSoMay);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(thongSoMay);
      });

      it('should add only unique ThongSoMay to an array', () => {
        const thongSoMayArray: IThongSoMay[] = [{ id: 123 }, { id: 456 }, { id: 75210 }];
        const thongSoMayCollection: IThongSoMay[] = [{ id: 123 }];
        expectedResult = service.addThongSoMayToCollectionIfMissing(thongSoMayCollection, ...thongSoMayArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const thongSoMay: IThongSoMay = { id: 123 };
        const thongSoMay2: IThongSoMay = { id: 456 };
        expectedResult = service.addThongSoMayToCollectionIfMissing([], thongSoMay, thongSoMay2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(thongSoMay);
        expect(expectedResult).toContain(thongSoMay2);
      });

      it('should accept null and undefined values', () => {
        const thongSoMay: IThongSoMay = { id: 123 };
        expectedResult = service.addThongSoMayToCollectionIfMissing([], null, thongSoMay, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(thongSoMay);
      });

      it('should return initial array if no ThongSoMay is added', () => {
        const thongSoMayCollection: IThongSoMay[] = [{ id: 123 }];
        expectedResult = service.addThongSoMayToCollectionIfMissing(thongSoMayCollection, undefined, null);
        expect(expectedResult).toEqual(thongSoMayCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
