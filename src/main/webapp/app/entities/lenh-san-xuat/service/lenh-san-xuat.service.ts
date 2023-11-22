import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    return this.http.post<ILenhSanXuat>(this.resourceUrl, lenhSanXuat, { observe: 'response' });
  }

  update(lenhSanXuat: ILenhSanXuat): Observable<EntityResponseType> {
    return this.http.put<ILenhSanXuat>(`${this.resourceUrl}/${getLenhSanXuatIdentifier(lenhSanXuat) as number}`, lenhSanXuat, {
      observe: 'response',
    });
  }

  partialUpdate(lenhSanXuat: ILenhSanXuat): Observable<EntityResponseType> {
    return this.http.patch<ILenhSanXuat>(`${this.resourceUrl}/${getLenhSanXuatIdentifier(lenhSanXuat) as number}`, lenhSanXuat, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILenhSanXuat>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILenhSanXuat[]>(this.resourceUrl, { params: options, observe: 'response' });
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
}
