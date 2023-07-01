import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CarnetCommandeComponent } from './list/carnet-commande.component';
import { CarnetCommandeDetailComponent } from './detail/carnet-commande-detail.component';
import { CarnetCommandeUpdateComponent } from './update/carnet-commande-update.component';
import { CarnetCommandeDeleteDialogComponent } from './delete/carnet-commande-delete-dialog.component';
import { CarnetCommandeRoutingModule } from './route/carnet-commande-routing.module';

@NgModule({
  imports: [SharedModule, CarnetCommandeRoutingModule],
  declarations: [
    CarnetCommandeComponent,
    CarnetCommandeDetailComponent,
    CarnetCommandeUpdateComponent,
    CarnetCommandeDeleteDialogComponent,
  ],
})
export class CarnetCommandeModule {}
