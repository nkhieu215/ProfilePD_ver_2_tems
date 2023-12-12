import dayjs from 'dayjs/esm';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ILenhSanXuat, getLenhSanXuatIdentifier } from '../lenh-san-xuat.model';

export type EntityResponseType = HttpResponse<ILenhSanXuat>;
export type EntityArrayResponseType = HttpResponse<ILenhSanXuat[]>;

@Injectable({ providedIn: 'root' })
export class LenhSanXuatService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/lenh-san-xuats');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(lenhSanXuat: ILenhSanXuat): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(lenhSanXuat);
    return this.http
      .post<ILenhSanXuat>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(lenhSanXuat: ILenhSanXuat): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(lenhSanXuat);
    return this.http
      .put<ILenhSanXuat>(`${this.resourceUrl}/${getLenhSanXuatIdentifier(lenhSanXuat) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(lenhSanXuat: ILenhSanXuat): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(lenhSanXuat);
    return this.http
      .patch<ILenhSanXuat>(`${this.resourceUrl}/${getLenhSanXuatIdentifier(lenhSanXuat) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ILenhSanXuat>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ILenhSanXuat[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addLenhSanXuatToCollectionIfMissing(
    lenhSanXuatCollection: ILenhSanXuat[],
    ...lenhSanXuatsToCheck: (ILenhSanXuat | null | undefined)[]
  ): ILenhSanXuat[] {
    const lenhSanXuats: ILenhSanXuat[] = lenhSanXuatsToCheck.filter(isPresent);
    if (lenhSanXuats.length > 0) {
      const lenhSanXuatCollectionIdentifiers = lenhSanXuatCollection.map(lenhSanXuatItem => getLenhSanXuatIdentifier(lenhSanXuatItem)!);
      const lenhSanXuatsToAdd = lenhSanXuats.filter(lenhSanXuatItem => {
        const lenhSanXuatIdentifier = getLenhSanXuatIdentifier(lenhSanXuatItem);
        if (lenhSanXuatIdentifier == null || lenhSanXuatCollectionIdentifiers.includes(lenhSanXuatIdentifier)) {
          return false;
        }
        lenhSanXuatCollectionIdentifiers.push(lenhSanXuatIdentifier);
        return true;
      });
      return [...lenhSanXuatsToAdd, ...lenhSanXuatCollection];
    }
    return lenhSanXuatCollection;
  }
  convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((lenhSanXuat: ILenhSanXuat) => {
        lenhSanXuat.entryTime = lenhSanXuat.entryTime ? dayjs(lenhSanXuat.entryTime) : undefined;
        lenhSanXuat.timeUpdate = lenhSanXuat.timeUpdate ? dayjs(lenhSanXuat.timeUpdate) : undefined;
      });
    }
    return res;
  }
  protected convertDateFromClient(lenhSanXuat: ILenhSanXuat): ILenhSanXuat {
    return Object.assign({}, lenhSanXuat, {
      ngayTao: lenhSanXuat.entryTime?.isValid() ? lenhSanXuat.entryTime.toJSON() : undefined,
      ngayUpdate: lenhSanXuat.timeUpdate?.isValid() ? lenhSanXuat.timeUpdate.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.entryTime = res.body.entryTime ? dayjs(res.body.entryTime) : undefined;
      res.body.timeUpdate = res.body.timeUpdate ? dayjs(res.body.timeUpdate) : undefined;
    }
    return res;
  }
}
