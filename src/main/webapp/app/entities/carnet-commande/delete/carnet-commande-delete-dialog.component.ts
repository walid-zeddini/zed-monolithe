import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICarnetCommande } from '../carnet-commande.model';
import { CarnetCommandeService } from '../service/carnet-commande.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './carnet-commande-delete-dialog.component.html',
})
export class CarnetCommandeDeleteDialogComponent {
  carnetCommande?: ICarnetCommande;

  constructor(protected carnetCommandeService: CarnetCommandeService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.carnetCommandeService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
