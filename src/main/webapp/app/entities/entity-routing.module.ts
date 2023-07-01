import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'produit',
        data: { pageTitle: 'zedMonolitheApp.produit.home.title' },
        loadChildren: () => import('./produit/produit.module').then(m => m.ProduitModule),
      },
      {
        path: 'client',
        data: { pageTitle: 'zedMonolitheApp.client.home.title' },
        loadChildren: () => import('./client/client.module').then(m => m.ClientModule),
      },
      {
        path: 'categorie',
        data: { pageTitle: 'zedMonolitheApp.categorie.home.title' },
        loadChildren: () => import('./categorie/categorie.module').then(m => m.CategorieModule),
      },
      {
        path: 'commande',
        data: { pageTitle: 'zedMonolitheApp.commande.home.title' },
        loadChildren: () => import('./commande/commande.module').then(m => m.CommandeModule),
      },
      {
        path: 'carnet-commande',
        data: { pageTitle: 'zedMonolitheApp.carnetCommande.home.title' },
        loadChildren: () => import('./carnet-commande/carnet-commande.module').then(m => m.CarnetCommandeModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
