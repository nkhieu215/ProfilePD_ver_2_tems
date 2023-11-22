import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IKichBan, getKichBanIdentifier } from '../kich-ban.model';

export type EntityResponseType = HttpResponse<IKichBan>;
export type EntityArrayResponseType = HttpResponse<IKichBan[]>;

@Injectable({ providedIn: 'root' })
export class KichBanService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/kich-bans');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(kichBan: IKichBan): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(kichBan);
    return this.http
      .post<IKichBan>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(kichBan: IKichBan): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(kichBan);
    return this.http
      .put<IKichBan>(`${this.resourceUrl}/${getKichBanIdentifier(kichBan) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(kichBan: IKichBan): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(kichBan);
    return this.http
      .patch<IKichBan>(`${this.resourceUrl}/${getKichBanIdentifier(kichBan) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IKichBan>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IKichBan[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addKichBanToCollectionIfMissing(kichBanCollection: IKichBan[], ...kichBansToCheck: (IKichBan | null | undefined)[]): IKichBan[] {
    const kichBans: IKichBan[] = kichBansToCheck.filter(isPresent);
    if (kichBans.length > 0) {
      const kichBanCollectionIdentifiers = kichBanCollection.map(kichBanItem => getKichBanIdentifier(kichBanItem)!);
      const kichBansToAdd = kichBans.filter(kichBanItem => {
        const kichBanIdentifier = getKichBanIdentifier(kichBanItem);
        if (kichBanIdentifier == null || kichBanCollectionIdentifiers.includes(kichBanIdentifier)) {
          return false;
        }
        kichBanCollectionIdentifiers.push(kichBanIdentifier);
        return true;
      });
      return [...kichBansToAdd, ...kichBanCollection];
    }
    return kichBanCollection;
  }

  protected convertDateFromClient(kichBan: IKichBan): IKichBan {
    return Object.assign({}, kichBan, {
      ngayTao: kichBan.ngayTao?.isValid() ? kichBan.ngayTao.toJSON() : undefined,
      timeUpdate: kichBan.timeUpdate?.isValid() ? kichBan.timeUpdate.toJSON() : undefined,
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
      res.body.forEach((kichBan: IKichBan) => {
        kichBan.ngayTao = kichBan.ngayTao ? dayjs(kichBan.ngayTao) : undefined;
        kichBan.timeUpdate = kichBan.timeUpdate ? dayjs(kichBan.timeUpdate) : undefined;
      });
    }
    return res;
  }
}
