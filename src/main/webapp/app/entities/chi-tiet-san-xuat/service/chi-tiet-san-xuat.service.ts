import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IChiTietSanXuat, getChiTietSanXuatIdentifier } from '../chi-tiet-san-xuat.model';

export type EntityResponseType = HttpResponse<IChiTietSanXuat>;
export type EntityArrayResponseType = HttpResponse<IChiTietSanXuat[]>;

@Injectable({ providedIn: 'root' })
export class ChiTietSanXuatService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/chi-tiet-san-xuats');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(chiTietSanXuat: IChiTietSanXuat): Observable<EntityResponseType> {
    return this.http.post<IChiTietSanXuat>(this.resourceUrl, chiTietSanXuat, { observe: 'response' });
  }

  update(chiTietSanXuat: IChiTietSanXuat): Observable<EntityResponseType> {
    return this.http.put<IChiTietSanXuat>(`${this.resourceUrl}/${getChiTietSanXuatIdentifier(chiTietSanXuat) as number}`, chiTietSanXuat, {
      observe: 'response',
    });
  }

  partialUpdate(chiTietSanXuat: IChiTietSanXuat): Observable<EntityResponseType> {
    return this.http.patch<IChiTietSanXuat>(
      `${this.resourceUrl}/${getChiTietSanXuatIdentifier(chiTietSanXuat) as number}`,
      chiTietSanXuat,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IChiTietSanXuat>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IChiTietSanXuat[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addChiTietSanXuatToCollectionIfMissing(
    chiTietSanXuatCollection: IChiTietSanXuat[],
    ...chiTietSanXuatsToCheck: (IChiTietSanXuat | null | undefined)[]
  ): IChiTietSanXuat[] {
    const chiTietSanXuats: IChiTietSanXuat[] = chiTietSanXuatsToCheck.filter(isPresent);
    if (chiTietSanXuats.length > 0) {
      const chiTietSanXuatCollectionIdentifiers = chiTietSanXuatCollection.map(
        chiTietSanXuatItem => getChiTietSanXuatIdentifier(chiTietSanXuatItem)!
      );
      const chiTietSanXuatsToAdd = chiTietSanXuats.filter(chiTietSanXuatItem => {
        const chiTietSanXuatIdentifier = getChiTietSanXuatIdentifier(chiTietSanXuatItem);
        if (chiTietSanXuatIdentifier == null || chiTietSanXuatCollectionIdentifiers.includes(chiTietSanXuatIdentifier)) {
          return false;
        }
        chiTietSanXuatCollectionIdentifiers.push(chiTietSanXuatIdentifier);
        return true;
      });
      return [...chiTietSanXuatsToAdd, ...chiTietSanXuatCollection];
    }
    return chiTietSanXuatCollection;
  }
}
