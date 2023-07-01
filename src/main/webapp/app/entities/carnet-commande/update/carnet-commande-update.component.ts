import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { CarnetCommandeFormService, CarnetCommandeFormGroup } from './carnet-commande-form.service';
import { ICarnetCommande } from '../carnet-commande.model';
import { CarnetCommandeService } from '../service/carnet-commande.service';
import { IProduit } from 'app/entities/produit/produit.model';
import { ProduitService } from 'app/entities/produit/service/produit.service';
import { ICommande } from 'app/entities/commande/commande.model';
import { CommandeService } from 'app/entities/commande/service/commande.service';

@Component({
  selector: 'jhi-carnet-commande-update',
  templateUrl: './carnet-commande-update.component.html',
})
export class CarnetCommandeUpdateComponent implements OnInit {
  isSaving = false;
  carnetCommande: ICarnetCommande | null = null;

  produitsSharedCollection: IProduit[] = [];
  commandesSharedCollection: ICommande[] = [];

  editForm: CarnetCommandeFormGroup = this.carnetCommandeFormService.createCarnetCommandeFormGroup();

  constructor(
    protected carnetCommandeService: CarnetCommandeService,
    protected carnetCommandeFormService: CarnetCommandeFormService,
    protected produitService: ProduitService,
    protected commandeService: CommandeService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareProduit = (o1: IProduit | null, o2: IProduit | null): boolean => this.produitService.compareProduit(o1, o2);

  compareCommande = (o1: ICommande | null, o2: ICommande | null): boolean => this.commandeService.compareCommande(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ carnetCommande }) => {
      this.carnetCommande = carnetCommande;
      if (carnetCommande) {
        this.updateForm(carnetCommande);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const carnetCommande = this.carnetCommandeFormService.getCarnetCommande(this.editForm);
    if (carnetCommande.id !== null) {
      this.subscribeToSaveResponse(this.carnetCommandeService.update(carnetCommande));
    } else {
      this.subscribeToSaveResponse(this.carnetCommandeService.create(carnetCommande));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICarnetCommande>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(carnetCommande: ICarnetCommande): void {
    this.carnetCommande = carnetCommande;
    this.carnetCommandeFormService.resetForm(this.editForm, carnetCommande);

    this.produitsSharedCollection = this.produitService.addProduitToCollectionIfMissing<IProduit>(
      this.produitsSharedCollection,
      carnetCommande.produit
    );
    this.commandesSharedCollection = this.commandeService.addCommandeToCollectionIfMissing<ICommande>(
      this.commandesSharedCollection,
      carnetCommande.commande
    );
  }

  protected loadRelationshipsOptions(): void {
    this.produitService
      .query()
      .pipe(map((res: HttpResponse<IProduit[]>) => res.body ?? []))
      .pipe(
        map((produits: IProduit[]) => this.produitService.addProduitToCollectionIfMissing<IProduit>(produits, this.carnetCommande?.produit))
      )
      .subscribe((produits: IProduit[]) => (this.produitsSharedCollection = produits));

    this.commandeService
      .query()
      .pipe(map((res: HttpResponse<ICommande[]>) => res.body ?? []))
      .pipe(
        map((commandes: ICommande[]) =>
          this.commandeService.addCommandeToCollectionIfMissing<ICommande>(commandes, this.carnetCommande?.commande)
        )
      )
      .subscribe((commandes: ICommande[]) => (this.commandesSharedCollection = commandes));
  }
}
