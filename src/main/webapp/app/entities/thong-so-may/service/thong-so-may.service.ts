import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IThongSoMay, getThongSoMayIdentifier } from '../thong-so-may.model';

export type EntityResponseType = HttpResponse<IThongSoMay>;
export type EntityArrayResponseType = HttpResponse<IThongSoMay[]>;

@Injectable({ providedIn: 'root' })
export class ThongSoMayService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/thong-so-mays');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(thongSoMay: IThongSoMay): Observable<EntityResponseType> {
    return this.http.post<IThongSoMay>(this.resourceUrl, thongSoMay, { observe: 'response' });
  }

  update(thongSoMay: IThongSoMay): Observable<EntityResponseType> {
    return this.http.put<IThongSoMay>(`${this.resourceUrl}/${getThongSoMayIdentifier(thongSoMay) as number}`, thongSoMay, {
      observe: 'response',
    });
  }

  partialUpdate(thongSoMay: IThongSoMay): Observable<EntityResponseType> {
    return this.http.patch<IThongSoMay>(`${this.resourceUrl}/${getThongSoMayIdentifier(thongSoMay) as number}`, thongSoMay, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IThongSoMay>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IThongSoMay[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addThongSoMayToCollectionIfMissing(
    thongSoMayCollection: IThongSoMay[],
    ...thongSoMaysToCheck: (IThongSoMay | null | undefined)[]
  ): IThongSoMay[] {
    const thongSoMays: IThongSoMay[] = thongSoMaysToCheck.filter(isPresent);
    if (thongSoMays.length > 0) {
      const thongSoMayCollectionIdentifiers = thongSoMayCollection.map(thongSoMayItem => getThongSoMayIdentifier(thongSoMayItem)!);
      const thongSoMaysToAdd = thongSoMays.filter(thongSoMayItem => {
        const thongSoMayIdentifier = getThongSoMayIdentifier(thongSoMayItem);
        if (thongSoMayIdentifier == null || thongSoMayCollectionIdentifiers.includes(thongSoMayIdentifier)) {
          return false;
        }
        thongSoMayCollectionIdentifiers.push(thongSoMayIdentifier);
        return true;
      });
      return [...thongSoMaysToAdd, ...thongSoMayCollection];
    }
    return thongSoMayCollection;
  }
}
