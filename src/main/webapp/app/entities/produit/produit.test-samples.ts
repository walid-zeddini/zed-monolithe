import { IProduit, NewProduit } from './produit.model';

export const sampleWithRequiredData: IProduit = {
  id: 91013,
  code: 'Garden',
  marque: 'Limousin Ball',
  modele: 'Avon Superviseur deposit',
  caracteristiques: 'violet Sleek input',
  prixUnitaire: 63729,
  quantite: 19750,
};

export const sampleWithPartialData: IProduit = {
  id: 15736,
  code: 'Du b leverage',
  marque: 'sensor',
  modele: 'e-tailers',
  caracteristiques: 'Ruble',
  prixUnitaire: 86168,
  quantite: 6498,
};

export const sampleWithFullData: IProduit = {
  id: 78338,
  code: 'Towels mesh',
  marque: 'encryption',
  modele: 'tan tangible wireless',
  caracteristiques: 'des Rubber Shoes',
  prixUnitaire: 45256,
  quantite: 37937,
};

export const sampleWithNewData: NewProduit = {
  code: 'Rupiah Saint-Dominique Berkshire',
  marque: 'Developpeur Nord-Pas-de-Calais quantifying',
  modele: 'transmit',
  caracteristiques: 'quantify c Forint',
  prixUnitaire: 28096,
  quantite: 61810,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
