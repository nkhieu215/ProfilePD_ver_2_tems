import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IThietBi, getThietBiIdentifier } from '../thiet-bi.model';

export type EntityResponseType = HttpResponse<IThietBi>;
export type EntityArrayResponseType = HttpResponse<IThietBi[]>;

@Injectable({ providedIn: 'root' })
export class ThietBiService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/thiet-bis');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(thietBi: IThietBi): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(thietBi);
    return this.http
      .post<IThietBi>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(thietBi: IThietBi): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(thietBi);
    return this.http
      .put<IThietBi>(`${this.resourceUrl}/${getThietBiIdentifier(thietBi) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(thietBi: IThietBi): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(thietBi);
    return this.http
      .patch<IThietBi>(`${this.resourceUrl}/${getThietBiIdentifier(thietBi) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IThietBi>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IThietBi[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addThietBiToCollectionIfMissing(thietBiCollection: IThietBi[], ...thietBisToCheck: (IThietBi | null | undefined)[]): IThietBi[] {
    const thietBis: IThietBi[] = thietBisToCheck.filter(isPresent);
    if (thietBis.length > 0) {
      const thietBiCollectionIdentifiers = thietBiCollection.map(thietBiItem => getThietBiIdentifier(thietBiItem)!);
      const thietBisToAdd = thietBis.filter(thietBiItem => {
        const thietBiIdentifier = getThietBiIdentifier(thietBiItem);
        if (thietBiIdentifier == null || thietBiCollectionIdentifiers.includes(thietBiIdentifier)) {
          return false;
        }
        thietBiCollectionIdentifiers.push(thietBiIdentifier);
        return true;
      });
      return [...thietBisToAdd, ...thietBiCollection];
    }
    return thietBiCollection;
  }

  protected convertDateFromClient(thietBi: IThietBi): IThietBi {
    return Object.assign({}, thietBi, {
      ngayTao: thietBi.ngayTao?.isValid() ? thietBi.ngayTao.toJSON() : undefined,
      timeUpdate: thietBi.timeUpdate?.isValid() ? thietBi.timeUpdate.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.ngayTao = res.body.ngayTao ? dayjs(res.body.ngayTao) : undefined;
      res.body.timeUpdate = res.body.timeUpdate ? dayjs(res.body.timeUpdate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((thietBi: IThietBi) => {
        thietBi.ngayTao = thietBi.ngayTao ? dayjs(thietBi.ngayTao) : undefined;
        thietBi.timeUpdate = thietBi.timeUpdate ? dayjs(thietBi.timeUpdate) : undefined;
      });
    }
    return res;
  }
}
