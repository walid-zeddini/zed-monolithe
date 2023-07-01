import { ICategorie, NewCategorie } from './categorie.model';

export const sampleWithRequiredData: ICategorie = {
  id: 37918,
  code: 'connect',
  libelle: 'Fish Specialiste XSS',
};

export const sampleWithPartialData: ICategorie = {
  id: 44271,
  code: 'bifurcated Plastic',
  libelle: 'systems',
};

export const sampleWithFullData: ICategorie = {
  id: 25809,
  code: 'Directeur alliance monitor',
  libelle: 'programming',
};

export const sampleWithNewData: NewCategorie = {
  code: 'Kina',
  libelle: 'a Borders drive',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
