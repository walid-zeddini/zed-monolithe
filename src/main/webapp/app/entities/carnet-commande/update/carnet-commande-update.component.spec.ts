import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CarnetCommandeFormService } from './carnet-commande-form.service';
import { CarnetCommandeService } from '../service/carnet-commande.service';
import { ICarnetCommande } from '../carnet-commande.model';
import { IProduit } from 'app/entities/produit/produit.model';
import { ProduitService } from 'app/entities/produit/service/produit.service';
import { ICommande } from 'app/entities/commande/commande.model';
import { CommandeService } from 'app/entities/commande/service/commande.service';

import { CarnetCommandeUpdateComponent } from './carnet-commande-update.component';

describe('CarnetCommande Management Update Component', () => {
  let comp: CarnetCommandeUpdateComponent;
  let fixture: ComponentFixture<CarnetCommandeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let carnetCommandeFormService: CarnetCommandeFormService;
  let carnetCommandeService: CarnetCommandeService;
  let produitService: ProduitService;
  let commandeService: CommandeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CarnetCommandeUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(CarnetCommandeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CarnetCommandeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    carnetCommandeFormService = TestBed.inject(CarnetCommandeFormService);
    carnetCommandeService = TestBed.inject(CarnetCommandeService);
    produitService = TestBed.inject(ProduitService);
    commandeService = TestBed.inject(CommandeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Produit query and add missing value', () => {
      const carnetCommande: ICarnetCommande = { id: 456 };
      const produit: IProduit = { id: 86327 };
      carnetCommande.produit = produit;

      const produitCollection: IProduit[] = [{ id: 62184 }];
      jest.spyOn(produitService, 'query').mockReturnValue(of(new HttpResponse({ body: produitCollection })));
      const additionalProduits = [produit];
      const expectedCollection: IProduit[] = [...additionalProduits, ...produitCollection];
      jest.spyOn(produitService, 'addProduitToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ carnetCommande });
      comp.ngOnInit();

      expect(produitService.query).toHaveBeenCalled();
      expect(produitService.addProduitToCollectionIfMissing).toHaveBeenCalledWith(
        produitCollection,
        ...additionalProduits.map(expect.objectContaining)
      );
      expect(comp.produitsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Commande query and add missing value', () => {
      const carnetCommande: ICarnetCommande = { id: 456 };
      const commande: ICommande = { id: 86945 };
      carnetCommande.commande = commande;

      const commandeCollection: ICommande[] = [{ id: 95312 }];
      jest.spyOn(commandeService, 'query').mockReturnValue(of(new HttpResponse({ body: commandeCollection })));
      const additionalCommandes = [commande];
      const expectedCollection: ICommande[] = [...additionalCommandes, ...commandeCollection];
      jest.spyOn(commandeService, 'addCommandeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ carnetCommande });
      comp.ngOnInit();

      expect(commandeService.query).toHaveBeenCalled();
      expect(commandeService.addCommandeToCollectionIfMissing).toHaveBeenCalledWith(
        commandeCollection,
        ...additionalCommandes.map(expect.objectContaining)
      );
      expect(comp.commandesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const carnetCommande: ICarnetCommande = { id: 456 };
      const produit: IProduit = { id: 49173 };
      carnetCommande.produit = produit;
      const commande: ICommande = { id: 50181 };
      carnetCommande.commande = commande;

      activatedRoute.data = of({ carnetCommande });
      comp.ngOnInit();

      expect(comp.produitsSharedCollection).toContain(produit);
      expect(comp.commandesSharedCollection).toContain(commande);
      expect(comp.carnetCommande).toEqual(carnetCommande);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICarnetCommande>>();
      const carnetCommande = { id: 123 };
      jest.spyOn(carnetCommandeFormService, 'getCarnetCommande').mockReturnValue(carnetCommande);
      jest.spyOn(carnetCommandeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ carnetCommande });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: carnetCommande }));
      saveSubject.complete();

      // THEN
      expect(carnetCommandeFormService.getCarnetCommande).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(carnetCommandeService.update).toHaveBeenCalledWith(expect.objectContaining(carnetCommande));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICarnetCommande>>();
      const carnetCommande = { id: 123 };
      jest.spyOn(carnetCommandeFormService, 'getCarnetCommande').mockReturnValue({ id: null });
      jest.spyOn(carnetCommandeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ carnetCommande: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: carnetCommande }));
      saveSubject.complete();

      // THEN
      expect(carnetCommandeFormService.getCarnetCommande).toHaveBeenCalled();
      expect(carnetCommandeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICarnetCommande>>();
      const carnetCommande = { id: 123 };
      jest.spyOn(carnetCommandeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ carnetCommande });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(carnetCommandeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareProduit', () => {
      it('Should forward to produitService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(produitService, 'compareProduit');
        comp.compareProduit(entity, entity2);
        expect(produitService.compareProduit).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareCommande', () => {
      it('Should forward to commandeService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(commandeService, 'compareCommande');
        comp.compareCommande(entity, entity2);
        expect(commandeService.compareCommande).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
