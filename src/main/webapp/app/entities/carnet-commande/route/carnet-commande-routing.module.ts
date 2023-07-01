import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CarnetCommandeComponent } from '../list/carnet-commande.component';
import { CarnetCommandeDetailComponent } from '../detail/carnet-commande-detail.component';
import { CarnetCommandeUpdateComponent } from '../update/carnet-commande-update.component';
import { CarnetCommandeRoutingResolveService } from './carnet-commande-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const carnetCommandeRoute: Routes = [
  {
    path: '',
    component: CarnetCommandeComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CarnetCommandeDetailComponent,
    resolve: {
      carnetCommande: CarnetCommandeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CarnetCommandeUpdateComponent,
    resolve: {
      carnetCommande: CarnetCommandeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CarnetCommandeUpdateComponent,
    resolve: {
      carnetCommande: CarnetCommandeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(carnetCommandeRoute)],
  exports: [RouterModule],
})
export class CarnetCommandeRoutingModule {}
