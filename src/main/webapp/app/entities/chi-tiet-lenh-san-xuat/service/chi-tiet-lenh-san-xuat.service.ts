import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IChiTietLenhSanXuat, getChiTietLenhSanXuatIdentifier } from '../chi-tiet-lenh-san-xuat.model';

export type EntityResponseType = HttpResponse<IChiTietLenhSanXuat>;
export type EntityArrayResponseType = HttpResponse<IChiTietLenhSanXuat[]>;

@Injectable({ providedIn: 'root' })
export class ChiTietLenhSanXuatService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/chi-tiet-lenh-san-xuats');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(chiTietLenhSanXuat: IChiTietLenhSanXuat): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(chiTietLenhSanXuat);
    return this.http
      .post<IChiTietLenhSanXuat>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(chiTietLenhSanXuat: IChiTietLenhSanXuat): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(chiTietLenhSanXuat);
    return this.http
      .put<IChiTietLenhSanXuat>(`${this.resourceUrl}/${getChiTietLenhSanXuatIdentifier(chiTietLenhSanXuat) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(chiTietLenhSanXuat: IChiTietLenhSanXuat): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(chiTietLenhSanXuat);
    return this.http
      .patch<IChiTietLenhSanXuat>(`${this.resourceUrl}/${getChiTietLenhSanXuatIdentifier(chiTietLenhSanXuat) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IChiTietLenhSanXuat>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IChiTietLenhSanXuat[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addChiTietLenhSanXuatToCollectionIfMissing(
    chiTietLenhSanXuatCollection: IChiTietLenhSanXuat[],
    ...chiTietLenhSanXuatsToCheck: (IChiTietLenhSanXuat | null | undefined)[]
  ): IChiTietLenhSanXuat[] {
    const chiTietLenhSanXuats: IChiTietLenhSanXuat[] = chiTietLenhSanXuatsToCheck.filter(isPresent);
    if (chiTietLenhSanXuats.length > 0) {
      const chiTietLenhSanXuatCollectionIdentifiers = chiTietLenhSanXuatCollection.map(
        chiTietLenhSanXuatItem => getChiTietLenhSanXuatIdentifier(chiTietLenhSanXuatItem)!
      );
      const chiTietLenhSanXuatsToAdd = chiTietLenhSanXuats.filter(chiTietLenhSanXuatItem => {
        const chiTietLenhSanXuatIdentifier = getChiTietLenhSanXuatIdentifier(chiTietLenhSanXuatItem);
        if (chiTietLenhSanXuatIdentifier == null || chiTietLenhSanXuatCollectionIdentifiers.includes(chiTietLenhSanXuatIdentifier)) {
          return false;
        }
        chiTietLenhSanXuatCollectionIdentifiers.push(chiTietLenhSanXuatIdentifier);
        return true;
      });
      return [...chiTietLenhSanXuatsToAdd, ...chiTietLenhSanXuatCollection];
    }
    return chiTietLenhSanXuatCollection;
  }

  protected convertDateFromClient(chiTietLenhSanXuat: IChiTietLenhSanXuat): IChiTietLenhSanXuat {
    return Object.assign({}, chiTietLenhSanXuat, {
      warmupTime: chiTietLenhSanXuat.warmupTime?.isValid() ? chiTietLenhSanXuat.warmupTime.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.warmupTime = res.body.warmupTime ? dayjs(res.body.warmupTime) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((chiTietLenhSanXuat: IChiTietLenhSanXuat) => {
        chiTietLenhSanXuat.warmupTime = chiTietLenhSanXuat.warmupTime ? dayjs(chiTietLenhSanXuat.warmupTime) : undefined;
      });
    }
    return res;
  }
}
