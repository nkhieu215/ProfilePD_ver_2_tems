import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ILenhSanXuat, LenhSanXuat } from '../lenh-san-xuat.model';

import { LenhSanXuatService } from './lenh-san-xuat.service';

describe('LenhSanXuat Service', () => {
  let service: LenhSanXuatService;
  let httpMock: HttpTestingController;
  let elemDefault: ILenhSanXuat;
  let expectedResult: ILenhSanXuat | ILenhSanXuat[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(LenhSanXuatService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      maLenhSanXuat: 'AAAAAAA',
      sapCode: 'AAAAAAA',
      sapName: 'AAAAAAA',
      workOrderCode: 'AAAAAAA',
      version: 'AAAAAAA',
      storageCode: 'AAAAAAA',
      totalQuantity: 'AAAAAAA',
      createBy: 'AAAAAAA',
      entryTime: 'AAAAAAA',
      trangThai: 'AAAAAAA',
      comment: 'AAAAAAA',
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

    it('should create a LenhSanXuat', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new LenhSanXuat()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a LenhSanXuat', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          maLenhSanXuat: 1,
          sapCode: 'BBBBBB',
          sapName: 'BBBBBB',
          workOrderCode: 'BBBBBB',
          version: 'BBBBBB',
          storageCode: 'BBBBBB',
          totalQuantity: 'BBBBBB',
          createBy: 'BBBBBB',
          entryTime: 'BBBBBB',
          trangThai: 'BBBBBB',
          comment: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a LenhSanXuat', () => {
      const patchObject = Object.assign(
        {
          sapCode: 'BBBBBB',
          workOrderCode: 'BBBBBB',
          version: 'BBBBBB',
          storageCode: 'BBBBBB',
          createBy: 'BBBBBB',
          comment: 'BBBBBB',
        },
        new LenhSanXuat()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of LenhSanXuat', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          maLenhSanXuat: 1,
          sapCode: 'BBBBBB',
          sapName: 'BBBBBB',
          workOrderCode: 'BBBBBB',
          version: 'BBBBBB',
          storageCode: 'BBBBBB',
          totalQuantity: 'BBBBBB',
          createBy: 'BBBBBB',
          entryTime: 'BBBBBB',
          trangThai: 'BBBBBB',
          comment: 'BBBBBB',
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

    it('should delete a LenhSanXuat', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addLenhSanXuatToCollectionIfMissing', () => {
      it('should add a LenhSanXuat to an empty array', () => {
        const lenhSanXuat: ILenhSanXuat = { id: 123 };
        expectedResult = service.addLenhSanXuatToCollectionIfMissing([], lenhSanXuat);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(lenhSanXuat);
      });

      it('should not add a LenhSanXuat to an array that contains it', () => {
        const lenhSanXuat: ILenhSanXuat = { id: 123 };
        const lenhSanXuatCollection: ILenhSanXuat[] = [
          {
            ...lenhSanXuat,
          },
          { id: 456 },
        ];
        expectedResult = service.addLenhSanXuatToCollectionIfMissing(lenhSanXuatCollection, lenhSanXuat);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a LenhSanXuat to an array that doesn't contain it", () => {
        const lenhSanXuat: ILenhSanXuat = { id: 123 };
        const lenhSanXuatCollection: ILenhSanXuat[] = [{ id: 456 }];
        expectedResult = service.addLenhSanXuatToCollectionIfMissing(lenhSanXuatCollection, lenhSanXuat);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(lenhSanXuat);
      });

      it('should add only unique LenhSanXuat to an array', () => {
        const lenhSanXuatArray: ILenhSanXuat[] = [{ id: 123 }, { id: 456 }, { id: 85820 }];
        const lenhSanXuatCollection: ILenhSanXuat[] = [{ id: 123 }];
        expectedResult = service.addLenhSanXuatToCollectionIfMissing(lenhSanXuatCollection, ...lenhSanXuatArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const lenhSanXuat: ILenhSanXuat = { id: 123 };
        const lenhSanXuat2: ILenhSanXuat = { id: 456 };
        expectedResult = service.addLenhSanXuatToCollectionIfMissing([], lenhSanXuat, lenhSanXuat2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(lenhSanXuat);
        expect(expectedResult).toContain(lenhSanXuat2);
      });

      it('should accept null and undefined values', () => {
        const lenhSanXuat: ILenhSanXuat = { id: 123 };
        expectedResult = service.addLenhSanXuatToCollectionIfMissing([], null, lenhSanXuat, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(lenhSanXuat);
      });

      it('should return initial array if no LenhSanXuat is added', () => {
        const lenhSanXuatCollection: ILenhSanXuat[] = [{ id: 123 }];
        expectedResult = service.addLenhSanXuatToCollectionIfMissing(lenhSanXuatCollection, undefined, null);
        expect(expectedResult).toEqual(lenhSanXuatCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
