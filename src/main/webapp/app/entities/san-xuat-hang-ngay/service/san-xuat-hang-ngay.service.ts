import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISanXuatHangNgay, getSanXuatHangNgayIdentifier } from '../san-xuat-hang-ngay.model';

export type EntityResponseType = HttpResponse<ISanXuatHangNgay>;
export type EntityArrayResponseType = HttpResponse<ISanXuatHangNgay[]>;

@Injectable({ providedIn: 'root' })
export class SanXuatHangNgayService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/san-xuat-hang-ngays');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(sanXuatHangNgay: ISanXuatHangNgay): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(sanXuatHangNgay);
    return this.http
      .post<ISanXuatHangNgay>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(sanXuatHangNgay: ISanXuatHangNgay): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(sanXuatHangNgay);
    return this.http
      .put<ISanXuatHangNgay>(`${this.resourceUrl}/${getSanXuatHangNgayIdentifier(sanXuatHangNgay) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(sanXuatHangNgay: ISanXuatHangNgay): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(sanXuatHangNgay);
    return this.http
      .patch<ISanXuatHangNgay>(`${this.resourceUrl}/${getSanXuatHangNgayIdentifier(sanXuatHangNgay) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISanXuatHangNgay>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISanXuatHangNgay[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addSanXuatHangNgayToCollectionIfMissing(
    sanXuatHangNgayCollection: ISanXuatHangNgay[],
    ...sanXuatHangNgaysToCheck: (ISanXuatHangNgay | null | undefined)[]
  ): ISanXuatHangNgay[] {
    const sanXuatHangNgays: ISanXuatHangNgay[] = sanXuatHangNgaysToCheck.filter(isPresent);
    if (sanXuatHangNgays.length > 0) {
      const sanXuatHangNgayCollectionIdentifiers = sanXuatHangNgayCollection.map(
        sanXuatHangNgayItem => getSanXuatHangNgayIdentifier(sanXuatHangNgayItem)!
      );
      const sanXuatHangNgaysToAdd = sanXuatHangNgays.filter(sanXuatHangNgayItem => {
        const sanXuatHangNgayIdentifier = getSanXuatHangNgayIdentifier(sanXuatHangNgayItem);
        if (sanXuatHangNgayIdentifier == null || sanXuatHangNgayCollectionIdentifiers.includes(sanXuatHangNgayIdentifier)) {
          return false;
        }
        sanXuatHangNgayCollectionIdentifiers.push(sanXuatHangNgayIdentifier);
        return true;
      });
      return [...sanXuatHangNgaysToAdd, ...sanXuatHangNgayCollection];
    }
    return sanXuatHangNgayCollection;
  }

  protected convertDateFromClient(sanXuatHangNgay: ISanXuatHangNgay): ISanXuatHangNgay {
    return Object.assign({}, sanXuatHangNgay, {
      ngayTao: sanXuatHangNgay.ngayTao?.isValid() ? sanXuatHangNgay.ngayTao.toJSON() : undefined,
      timeUpdate: sanXuatHangNgay.timeUpdate?.isValid() ? sanXuatHangNgay.timeUpdate.toJSON() : undefined,
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
      res.body.forEach((sanXuatHangNgay: ISanXuatHangNgay) => {
        sanXuatHangNgay.ngayTao = sanXuatHangNgay.ngayTao ? dayjs(sanXuatHangNgay.ngayTao) : undefined;
        sanXuatHangNgay.timeUpdate = sanXuatHangNgay.timeUpdate ? dayjs(sanXuatHangNgay.timeUpdate) : undefined;
      });
    }
    return res;
  }
}
