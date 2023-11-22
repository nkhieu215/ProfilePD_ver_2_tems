import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IChiTietLichSuUpdate, getChiTietLichSuUpdateIdentifier } from '../chi-tiet-lich-su-update.model';

export type EntityResponseType = HttpResponse<IChiTietLichSuUpdate>;
export type EntityArrayResponseType = HttpResponse<IChiTietLichSuUpdate[]>;

@Injectable({ providedIn: 'root' })
export class ChiTietLichSuUpdateService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/chi-tiet-lich-su-updates');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(chiTietLichSuUpdate: IChiTietLichSuUpdate): Observable<EntityResponseType> {
    return this.http.post<IChiTietLichSuUpdate>(this.resourceUrl, chiTietLichSuUpdate, { observe: 'response' });
  }

  update(chiTietLichSuUpdate: IChiTietLichSuUpdate): Observable<EntityResponseType> {
    return this.http.put<IChiTietLichSuUpdate>(
      `${this.resourceUrl}/${getChiTietLichSuUpdateIdentifier(chiTietLichSuUpdate) as number}`,
      chiTietLichSuUpdate,
      { observe: 'response' }
    );
  }

  partialUpdate(chiTietLichSuUpdate: IChiTietLichSuUpdate): Observable<EntityResponseType> {
    return this.http.patch<IChiTietLichSuUpdate>(
      `${this.resourceUrl}/${getChiTietLichSuUpdateIdentifier(chiTietLichSuUpdate) as number}`,
      chiTietLichSuUpdate,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IChiTietLichSuUpdate>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IChiTietLichSuUpdate[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addChiTietLichSuUpdateToCollectionIfMissing(
    chiTietLichSuUpdateCollection: IChiTietLichSuUpdate[],
    ...chiTietLichSuUpdatesToCheck: (IChiTietLichSuUpdate | null | undefined)[]
  ): IChiTietLichSuUpdate[] {
    const chiTietLichSuUpdates: IChiTietLichSuUpdate[] = chiTietLichSuUpdatesToCheck.filter(isPresent);
    if (chiTietLichSuUpdates.length > 0) {
      const chiTietLichSuUpdateCollectionIdentifiers = chiTietLichSuUpdateCollection.map(
        chiTietLichSuUpdateItem => getChiTietLichSuUpdateIdentifier(chiTietLichSuUpdateItem)!
      );
      const chiTietLichSuUpdatesToAdd = chiTietLichSuUpdates.filter(chiTietLichSuUpdateItem => {
        const chiTietLichSuUpdateIdentifier = getChiTietLichSuUpdateIdentifier(chiTietLichSuUpdateItem);
        if (chiTietLichSuUpdateIdentifier == null || chiTietLichSuUpdateCollectionIdentifiers.includes(chiTietLichSuUpdateIdentifier)) {
          return false;
        }
        chiTietLichSuUpdateCollectionIdentifiers.push(chiTietLichSuUpdateIdentifier);
        return true;
      });
      return [...chiTietLichSuUpdatesToAdd, ...chiTietLichSuUpdateCollection];
    }
    return chiTietLichSuUpdateCollection;
  }
}
