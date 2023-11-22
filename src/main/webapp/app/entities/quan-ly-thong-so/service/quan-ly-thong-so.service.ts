import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IQuanLyThongSo, getQuanLyThongSoIdentifier } from '../quan-ly-thong-so.model';

export type EntityResponseType = HttpResponse<IQuanLyThongSo>;
export type EntityArrayResponseType = HttpResponse<IQuanLyThongSo[]>;

@Injectable({ providedIn: 'root' })
export class QuanLyThongSoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/quan-ly-thong-sos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(quanLyThongSo: IQuanLyThongSo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(quanLyThongSo);
    return this.http
      .post<IQuanLyThongSo>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(quanLyThongSo: IQuanLyThongSo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(quanLyThongSo);
    return this.http
      .put<IQuanLyThongSo>(`${this.resourceUrl}/${getQuanLyThongSoIdentifier(quanLyThongSo) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(quanLyThongSo: IQuanLyThongSo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(quanLyThongSo);
    return this.http
      .patch<IQuanLyThongSo>(`${this.resourceUrl}/${getQuanLyThongSoIdentifier(quanLyThongSo) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IQuanLyThongSo>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IQuanLyThongSo[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addQuanLyThongSoToCollectionIfMissing(
    quanLyThongSoCollection: IQuanLyThongSo[],
    ...quanLyThongSosToCheck: (IQuanLyThongSo | null | undefined)[]
  ): IQuanLyThongSo[] {
    const quanLyThongSos: IQuanLyThongSo[] = quanLyThongSosToCheck.filter(isPresent);
    if (quanLyThongSos.length > 0) {
      const quanLyThongSoCollectionIdentifiers = quanLyThongSoCollection.map(
        quanLyThongSoItem => getQuanLyThongSoIdentifier(quanLyThongSoItem)!
      );
      const quanLyThongSosToAdd = quanLyThongSos.filter(quanLyThongSoItem => {
        const quanLyThongSoIdentifier = getQuanLyThongSoIdentifier(quanLyThongSoItem);
        if (quanLyThongSoIdentifier == null || quanLyThongSoCollectionIdentifiers.includes(quanLyThongSoIdentifier)) {
          return false;
        }
        quanLyThongSoCollectionIdentifiers.push(quanLyThongSoIdentifier);
        return true;
      });
      return [...quanLyThongSosToAdd, ...quanLyThongSoCollection];
    }
    return quanLyThongSoCollection;
  }

  protected convertDateFromClient(quanLyThongSo: IQuanLyThongSo): IQuanLyThongSo {
    return Object.assign({}, quanLyThongSo, {
      ngayTao: quanLyThongSo.ngayTao?.isValid() ? quanLyThongSo.ngayTao.toJSON() : undefined,
      ngayUpdate: quanLyThongSo.ngayUpdate?.isValid() ? quanLyThongSo.ngayUpdate.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.ngayTao = res.body.ngayTao ? dayjs(res.body.ngayTao) : undefined;
      res.body.ngayUpdate = res.body.ngayUpdate ? dayjs(res.body.ngayUpdate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((quanLyThongSo: IQuanLyThongSo) => {
        quanLyThongSo.ngayTao = quanLyThongSo.ngayTao ? dayjs(quanLyThongSo.ngayTao) : undefined;
        quanLyThongSo.ngayUpdate = quanLyThongSo.ngayUpdate ? dayjs(quanLyThongSo.ngayUpdate) : undefined;
      });
    }
    return res;
  }
}
