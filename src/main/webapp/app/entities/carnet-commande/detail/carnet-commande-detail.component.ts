import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICarnetCommande } from '../carnet-commande.model';

@Component({
  selector: 'jhi-carnet-commande-detail',
  templateUrl: './carnet-commande-detail.component.html',
})
export class CarnetCommandeDetailComponent implements OnInit {
  carnetCommande: ICarnetCommande | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ carnetCommande }) => {
      this.carnetCommande = carnetCommande;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
