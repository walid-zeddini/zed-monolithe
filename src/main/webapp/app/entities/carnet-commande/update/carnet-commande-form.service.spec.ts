import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../carnet-commande.test-samples';

import { CarnetCommandeFormService } from './carnet-commande-form.service';

describe('CarnetCommande Form Service', () => {
  let service: CarnetCommandeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarnetCommandeFormService);
  });

  describe('Service methods', () => {
    describe('createCarnetCommandeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCarnetCommandeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            qte: expect.any(Object),
            prixUnitaire: expect.any(Object),
            prixTotal: expect.any(Object),
            etat: expect.any(Object),
            produit: expect.any(Object),
            commande: expect.any(Object),
          })
        );
      });

      it('passing ICarnetCommande should create a new form with FormGroup', () => {
        const formGroup = service.createCarnetCommandeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            qte: expect.any(Object),
            prixUnitaire: expect.any(Object),
            prixTotal: expect.any(Object),
            etat: expect.any(Object),
            produit: expect.any(Object),
            commande: expect.any(Object),
          })
        );
      });
    });

    describe('getCarnetCommande', () => {
      it('should return NewCarnetCommande for default CarnetCommande initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCarnetCommandeFormGroup(sampleWithNewData);

        const carnetCommande = service.getCarnetCommande(formGroup) as any;

        expect(carnetCommande).toMatchObject(sampleWithNewData);
      });

      it('should return NewCarnetCommande for empty CarnetCommande initial value', () => {
        const formGroup = service.createCarnetCommandeFormGroup();

        const carnetCommande = service.getCarnetCommande(formGroup) as any;

        expect(carnetCommande).toMatchObject({});
      });

      it('should return ICarnetCommande', () => {
        const formGroup = service.createCarnetCommandeFormGroup(sampleWithRequiredData);

        const carnetCommande = service.getCarnetCommande(formGroup) as any;

        expect(carnetCommande).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICarnetCommande should not enable id FormControl', () => {
        const formGroup = service.createCarnetCommandeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCarnetCommande should disable id FormControl', () => {
        const formGroup = service.createCarnetCommandeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
