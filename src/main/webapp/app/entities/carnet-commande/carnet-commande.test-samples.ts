import { ICarnetCommande, NewCarnetCommande } from './carnet-commande.model';

export const sampleWithRequiredData: ICarnetCommande = {
  id: 31803,
  qte: 49652,
  prixUnitaire: 16890,
  prixTotal: 37932,
  etat: 71568,
};

export const sampleWithPartialData: ICarnetCommande = {
  id: 62026,
  qte: 12047,
  prixUnitaire: 6714,
  prixTotal: 32574,
  etat: 75487,
};

export const sampleWithFullData: ICarnetCommande = {
  id: 91399,
  qte: 73403,
  prixUnitaire: 87219,
  prixTotal: 74283,
  etat: 8018,
};

export const sampleWithNewData: NewCarnetCommande = {
  qte: 96626,
  prixUnitaire: 42846,
  prixTotal: 32931,
  etat: 31167,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
