import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ILichSuUpdate, getLichSuUpdateIdentifier } from '../lich-su-update.model';

export type EntityResponseType = HttpResponse<ILichSuUpdate>;
export type EntityArrayResponseType = HttpResponse<ILichSuUpdate[]>;

@Injectable({ providedIn: 'root' })
export class LichSuUpdateService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/lich-su-updates');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(lichSuUpdate: ILichSuUpdate): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(lichSuUpdate);
    return this.http
      .post<ILichSuUpdate>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(lichSuUpdate: ILichSuUpdate): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(lichSuUpdate);
    return this.http
      .put<ILichSuUpdate>(`${this.resourceUrl}/${getLichSuUpdateIdentifier(lichSuUpdate) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(lichSuUpdate: ILichSuUpdate): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(lichSuUpdate);
    return this.http
      .patch<ILichSuUpdate>(`${this.resourceUrl}/${getLichSuUpdateIdentifier(lichSuUpdate) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ILichSuUpdate>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ILichSuUpdate[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addLichSuUpdateToCollectionIfMissing(
    lichSuUpdateCollection: ILichSuUpdate[],
    ...lichSuUpdatesToCheck: (ILichSuUpdate | null | undefined)[]
  ): ILichSuUpdate[] {
    const lichSuUpdates: ILichSuUpdate[] = lichSuUpdatesToCheck.filter(isPresent);
    if (lichSuUpdates.length > 0) {
      const lichSuUpdateCollectionIdentifiers = lichSuUpdateCollection.map(
        lichSuUpdateItem => getLichSuUpdateIdentifier(lichSuUpdateItem)!
      );
      const lichSuUpdatesToAdd = lichSuUpdates.filter(lichSuUpdateItem => {
        const lichSuUpdateIdentifier = getLichSuUpdateIdentifier(lichSuUpdateItem);
        if (lichSuUpdateIdentifier == null || lichSuUpdateCollectionIdentifiers.includes(lichSuUpdateIdentifier)) {
          return false;
        }
        lichSuUpdateCollectionIdentifiers.push(lichSuUpdateIdentifier);
        return true;
      });
      return [...lichSuUpdatesToAdd, ...lichSuUpdateCollection];
    }
    return lichSuUpdateCollection;
  }

  protected convertDateFromClient(lichSuUpdate: ILichSuUpdate): ILichSuUpdate {
    return Object.assign({}, lichSuUpdate, {
      timeUpdate: lichSuUpdate.timeUpdate?.isValid() ? lichSuUpdate.timeUpdate.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.timeUpdate = res.body.timeUpdate ? dayjs(res.body.timeUpdate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((lichSuUpdate: ILichSuUpdate) => {
        lichSuUpdate.timeUpdate = lichSuUpdate.timeUpdate ? dayjs(lichSuUpdate.timeUpdate) : undefined;
      });
    }
    return res;
  }
}
