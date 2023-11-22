import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IChiTietKichBan, getChiTietKichBanIdentifier } from '../chi-tiet-kich-ban.model';

export type EntityResponseType = HttpResponse<IChiTietKichBan>;
export type EntityArrayResponseType = HttpResponse<IChiTietKichBan[]>;

@Injectable({ providedIn: 'root' })
export class ChiTietKichBanService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/chi-tiet-kich-bans');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(chiTietKichBan: IChiTietKichBan): Observable<EntityResponseType> {
    return this.http.post<IChiTietKichBan>(this.resourceUrl, chiTietKichBan, { observe: 'response' });
  }

  update(chiTietKichBan: IChiTietKichBan): Observable<EntityResponseType> {
    return this.http.put<IChiTietKichBan>(`${this.resourceUrl}/${getChiTietKichBanIdentifier(chiTietKichBan) as number}`, chiTietKichBan, {
      observe: 'response',
    });
  }

  partialUpdate(chiTietKichBan: IChiTietKichBan): Observable<EntityResponseType> {
    return this.http.patch<IChiTietKichBan>(
      `${this.resourceUrl}/${getChiTietKichBanIdentifier(chiTietKichBan) as number}`,
      chiTietKichBan,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IChiTietKichBan>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IChiTietKichBan[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addChiTietKichBanToCollectionIfMissing(
    chiTietKichBanCollection: IChiTietKichBan[],
    ...chiTietKichBansToCheck: (IChiTietKichBan | null | undefined)[]
  ): IChiTietKichBan[] {
    const chiTietKichBans: IChiTietKichBan[] = chiTietKichBansToCheck.filter(isPresent);
    if (chiTietKichBans.length > 0) {
      const chiTietKichBanCollectionIdentifiers = chiTietKichBanCollection.map(
        chiTietKichBanItem => getChiTietKichBanIdentifier(chiTietKichBanItem)!
      );
      const chiTietKichBansToAdd = chiTietKichBans.filter(chiTietKichBanItem => {
        const chiTietKichBanIdentifier = getChiTietKichBanIdentifier(chiTietKichBanItem);
        if (chiTietKichBanIdentifier == null || chiTietKichBanCollectionIdentifiers.includes(chiTietKichBanIdentifier)) {
          return false;
        }
        chiTietKichBanCollectionIdentifiers.push(chiTietKichBanIdentifier);
        return true;
      });
      return [...chiTietKichBansToAdd, ...chiTietKichBanCollection];
    }
    return chiTietKichBanCollection;
  }
}
