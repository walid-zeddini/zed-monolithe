import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICarnetCommande, NewCarnetCommande } from '../carnet-commande.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICarnetCommande for edit and NewCarnetCommandeFormGroupInput for create.
 */
type CarnetCommandeFormGroupInput = ICarnetCommande | PartialWithRequiredKeyOf<NewCarnetCommande>;

type CarnetCommandeFormDefaults = Pick<NewCarnetCommande, 'id'>;

type CarnetCommandeFormGroupContent = {
  id: FormControl<ICarnetCommande['id'] | NewCarnetCommande['id']>;
  qte: FormControl<ICarnetCommande['qte']>;
  prixUnitaire: FormControl<ICarnetCommande['prixUnitaire']>;
  prixTotal: FormControl<ICarnetCommande['prixTotal']>;
  etat: FormControl<ICarnetCommande['etat']>;
  produit: FormControl<ICarnetCommande['produit']>;
  commande: FormControl<ICarnetCommande['commande']>;
};

export type CarnetCommandeFormGroup = FormGroup<CarnetCommandeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CarnetCommandeFormService {
  createCarnetCommandeFormGroup(carnetCommande: CarnetCommandeFormGroupInput = { id: null }): CarnetCommandeFormGroup {
    const carnetCommandeRawValue = {
      ...this.getFormDefaults(),
      ...carnetCommande,
    };
    return new FormGroup<CarnetCommandeFormGroupContent>({
      id: new FormControl(
        { value: carnetCommandeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      qte: new FormControl(carnetCommandeRawValue.qte, {
        validators: [Validators.required],
      }),
      prixUnitaire: new FormControl(carnetCommandeRawValue.prixUnitaire, {
        validators: [Validators.required],
      }),
      prixTotal: new FormControl(carnetCommandeRawValue.prixTotal, {
        validators: [Validators.required],
      }),
      etat: new FormControl(carnetCommandeRawValue.etat, {
        validators: [Validators.required],
      }),
      produit: new FormControl(carnetCommandeRawValue.produit),
      commande: new FormControl(carnetCommandeRawValue.commande),
    });
  }

  getCarnetCommande(form: CarnetCommandeFormGroup): ICarnetCommande | NewCarnetCommande {
    return form.getRawValue() as ICarnetCommande | NewCarnetCommande;
  }

  resetForm(form: CarnetCommandeFormGroup, carnetCommande: CarnetCommandeFormGroupInput): void {
    const carnetCommandeRawValue = { ...this.getFormDefaults(), ...carnetCommande };
    form.reset(
      {
        ...carnetCommandeRawValue,
        id: { value: carnetCommandeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CarnetCommandeFormDefaults {
    return {
      id: null,
    };
  }
}
