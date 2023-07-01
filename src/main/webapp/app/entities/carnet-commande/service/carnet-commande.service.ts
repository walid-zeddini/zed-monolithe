import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICarnetCommande, NewCarnetCommande } from '../carnet-commande.model';

export type PartialUpdateCarnetCommande = Partial<ICarnetCommande> & Pick<ICarnetCommande, 'id'>;

export type EntityResponseType = HttpResponse<ICarnetCommande>;
export type EntityArrayResponseType = HttpResponse<ICarnetCommande[]>;

@Injectable({ providedIn: 'root' })
export class CarnetCommandeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/carnet-commandes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(carnetCommande: NewCarnetCommande): Observable<EntityResponseType> {
    return this.http.post<ICarnetCommande>(this.resourceUrl, carnetCommande, { observe: 'response' });
  }

  update(carnetCommande: ICarnetCommande): Observable<EntityResponseType> {
    return this.http.put<ICarnetCommande>(`${this.resourceUrl}/${this.getCarnetCommandeIdentifier(carnetCommande)}`, carnetCommande, {
      observe: 'response',
    });
  }

  partialUpdate(carnetCommande: PartialUpdateCarnetCommande): Observable<EntityResponseType> {
    return this.http.patch<ICarnetCommande>(`${this.resourceUrl}/${this.getCarnetCommandeIdentifier(carnetCommande)}`, carnetCommande, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICarnetCommande>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICarnetCommande[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCarnetCommandeIdentifier(carnetCommande: Pick<ICarnetCommande, 'id'>): number {
    return carnetCommande.id;
  }

  compareCarnetCommande(o1: Pick<ICarnetCommande, 'id'> | null, o2: Pick<ICarnetCommande, 'id'> | null): boolean {
    return o1 && o2 ? this.getCarnetCommandeIdentifier(o1) === this.getCarnetCommandeIdentifier(o2) : o1 === o2;
  }

  addCarnetCommandeToCollectionIfMissing<Type extends Pick<ICarnetCommande, 'id'>>(
    carnetCommandeCollection: Type[],
    ...carnetCommandesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const carnetCommandes: Type[] = carnetCommandesToCheck.filter(isPresent);
    if (carnetCommandes.length > 0) {
      const carnetCommandeCollectionIdentifiers = carnetCommandeCollection.map(
        carnetCommandeItem => this.getCarnetCommandeIdentifier(carnetCommandeItem)!
      );
      const carnetCommandesToAdd = carnetCommandes.filter(carnetCommandeItem => {
        const carnetCommandeIdentifier = this.getCarnetCommandeIdentifier(carnetCommandeItem);
        if (carnetCommandeCollectionIdentifiers.includes(carnetCommandeIdentifier)) {
          return false;
        }
        carnetCommandeCollectionIdentifiers.push(carnetCommandeIdentifier);
        return true;
      });
      return [...carnetCommandesToAdd, ...carnetCommandeCollection];
    }
    return carnetCommandeCollection;
  }
}
