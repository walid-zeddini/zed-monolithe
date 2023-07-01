import dayjs from 'dayjs/esm';

import { ICommande, NewCommande } from './commande.model';

export const sampleWithRequiredData: ICommande = {
  id: 5189,
  numero: 'Frozen Superviseur',
  date: dayjs('2023-06-29'),
  prixTotal: 76871,
  etat: 40062,
};

export const sampleWithPartialData: ICommande = {
  id: 27961,
  numero: 'Keyboard Boétie overriding',
  date: dayjs('2023-06-29'),
  prixTotal: 88556,
  etat: 66539,
};

export const sampleWithFullData: ICommande = {
  id: 80202,
  numero: 'purposes',
  date: dayjs('2023-06-30'),
  prixTotal: 86493,
  etat: 43401,
};

export const sampleWithNewData: NewCommande = {
  numero: 'Sausages copy b',
  date: dayjs('2023-06-30'),
  prixTotal: 24774,
  etat: 21586,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
