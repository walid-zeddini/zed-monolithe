import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IProduit, NewProduit } from '../produit.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IProduit for edit and NewProduitFormGroupInput for create.
 */
type ProduitFormGroupInput = IProduit | PartialWithRequiredKeyOf<NewProduit>;

type ProduitFormDefaults = Pick<NewProduit, 'id'>;

type ProduitFormGroupContent = {
  id: FormControl<IProduit['id'] | NewProduit['id']>;
  code: FormControl<IProduit['code']>;
  marque: FormControl<IProduit['marque']>;
  modele: FormControl<IProduit['modele']>;
  caracteristiques: FormControl<IProduit['caracteristiques']>;
  prixUnitaire: FormControl<IProduit['prixUnitaire']>;
  quantite: FormControl<IProduit['quantite']>;
  categorie: FormControl<IProduit['categorie']>;
};

export type ProduitFormGroup = FormGroup<ProduitFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ProduitFormService {
  createProduitFormGroup(produit: ProduitFormGroupInput = { id: null }): ProduitFormGroup {
    const produitRawValue = {
      ...this.getFormDefaults(),
      ...produit,
    };
    return new FormGroup<ProduitFormGroupContent>({
      id: new FormControl(
        { value: produitRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      code: new FormControl(produitRawValue.code, {
        validators: [Validators.required, Validators.maxLength(40)],
      }),
      marque: new FormControl(produitRawValue.marque, {
        validators: [Validators.required, Validators.maxLength(70)],
      }),
      modele: new FormControl(produitRawValue.modele, {
        validators: [Validators.required, Validators.maxLength(100)],
      }),
      caracteristiques: new FormControl(produitRawValue.caracteristiques, {
        validators: [Validators.required, Validators.maxLength(100)],
      }),
      prixUnitaire: new FormControl(produitRawValue.prixUnitaire, {
        validators: [Validators.required],
      }),
      quantite: new FormControl(produitRawValue.quantite, {
        validators: [Validators.required],
      }),
      categorie: new FormControl(produitRawValue.categorie),
    });
  }

  getProduit(form: ProduitFormGroup): IProduit | NewProduit {
    return form.getRawValue() as IProduit | NewProduit;
  }

  resetForm(form: ProduitFormGroup, produit: ProduitFormGroupInput): void {
    const produitRawValue = { ...this.getFormDefaults(), ...produit };
    form.reset(
      {
        ...produitRawValue,
        id: { value: produitRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ProduitFormDefaults {
    return {
      id: null,
    };
  }
}
