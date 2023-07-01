import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICarnetCommande } from '../carnet-commande.model';
import { CarnetCommandeService } from '../service/carnet-commande.service';

@Injectable({ providedIn: 'root' })
export class CarnetCommandeRoutingResolveService implements Resolve<ICarnetCommande | null> {
  constructor(protected service: CarnetCommandeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICarnetCommande | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((carnetCommande: HttpResponse<ICarnetCommande>) => {
          if (carnetCommande.body) {
            return of(carnetCommande.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
