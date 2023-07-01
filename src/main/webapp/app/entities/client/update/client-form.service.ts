import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IClient, NewClient } from '../client.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IClient for edit and NewClientFormGroupInput for create.
 */
type ClientFormGroupInput = IClient | PartialWithRequiredKeyOf<NewClient>;

type ClientFormDefaults = Pick<NewClient, 'id'>;

type ClientFormGroupContent = {
  id: FormControl<IClient['id'] | NewClient['id']>;
  code: FormControl<IClient['code']>;
  nom: FormControl<IClient['nom']>;
  prenom: FormControl<IClient['prenom']>;
  dateNaissance: FormControl<IClient['dateNaissance']>;
  adresse: FormControl<IClient['adresse']>;
  ville: FormControl<IClient['ville']>;
  codePostal: FormControl<IClient['codePostal']>;
  tel: FormControl<IClient['tel']>;
  fax: FormControl<IClient['fax']>;
  gsm: FormControl<IClient['gsm']>;
  email: FormControl<IClient['email']>;
};

export type ClientFormGroup = FormGroup<ClientFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ClientFormService {
  createClientFormGroup(client: ClientFormGroupInput = { id: null }): ClientFormGroup {
    const clientRawValue = {
      ...this.getFormDefaults(),
      ...client,
    };
    return new FormGroup<ClientFormGroupContent>({
      id: new FormControl(
        { value: clientRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      code: new FormControl(clientRawValue.code, {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(20)],
      }),
      nom: new FormControl(clientRawValue.nom, {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(30)],
      }),
      prenom: new FormControl(clientRawValue.prenom, {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(30)],
      }),
      dateNaissance: new FormControl(clientRawValue.dateNaissance, {
        validators: [Validators.required],
      }),
      adresse: new FormControl(clientRawValue.adresse, {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
      }),
      ville: new FormControl(clientRawValue.ville, {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(30)],
      }),
      codePostal: new FormControl(clientRawValue.codePostal, {
        validators: [Validators.required],
      }),
      tel: new FormControl(clientRawValue.tel, {
        validators: [Validators.minLength(6), Validators.maxLength(30)],
      }),
      fax: new FormControl(clientRawValue.fax, {
        validators: [Validators.minLength(6), Validators.maxLength(30)],
      }),
      gsm: new FormControl(clientRawValue.gsm, {
        validators: [Validators.required, Validators.minLength(6), Validators.maxLength(30)],
      }),
      email: new FormControl(clientRawValue.email, {
        validators: [Validators.required, Validators.minLength(6), Validators.maxLength(30)],
      }),
    });
  }

  getClient(form: ClientFormGroup): IClient | NewClient {
    return form.getRawValue() as IClient | NewClient;
  }

  resetForm(form: ClientFormGroup, client: ClientFormGroupInput): void {
    const clientRawValue = { ...this.getFormDefaults(), ...client };
    form.reset(
      {
        ...clientRawValue,
        id: { value: clientRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ClientFormDefaults {
    return {
      id: null,
    };
  }
}
