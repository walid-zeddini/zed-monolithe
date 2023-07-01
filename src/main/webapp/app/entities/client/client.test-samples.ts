import dayjs from 'dayjs/esm';

import { IClient, NewClient } from './client.model';

export const sampleWithRequiredData: IClient = {
  id: 71655,
  code: 'hacking',
  nom: 'primary Poitou-Charentes Concr',
  prenom: 'asynchronous Account a',
  dateNaissance: dayjs('2023-06-30'),
  adresse: 'Bedfordshire',
  ville: "d'Azur synthesize",
  codePostal: 588,
  gsm: 'inputX',
  email: 'Ange.Durand77@gmail.com',
};

export const sampleWithPartialData: IClient = {
  id: 97390,
  code: 'connect Checking Car',
  nom: 'Automotive Shirt Soft',
  prenom: 'definition Synergized a',
  dateNaissance: dayjs('2023-06-30'),
  adresse: 'Hat Coordinateur connect',
  ville: 'EXE Bretagne Vatu',
  codePostal: 13655,
  gsm: 'Consultant paradigm Wooden',
  email: 'Adenet.Lemoine@gmail.com',
};

export const sampleWithFullData: IClient = {
  id: 18963,
  code: 'Account Computers',
  nom: 'invoice Electronics',
  prenom: 'Kids redundant Distributed',
  dateNaissance: dayjs('2023-06-29'),
  adresse: 'input',
  ville: 'b well-modulated cross-platfor',
  codePostal: 64734,
  tel: 'connect connect Borders',
  fax: 'parse c',
  gsm: 'aXXXXX',
  email: 'Ernest64@hotmail.fr',
};

export const sampleWithNewData: NewClient = {
  code: 'Practical invoice',
  nom: 'Handmade',
  prenom: 'indexing THX',
  dateNaissance: dayjs('2023-06-30'),
  adresse: 'Generic',
  ville: 'unleash wireless Chili',
  codePostal: 81557,
  gsm: 'grow Licensed Car',
  email: 'Graud.Richard83@hotmail.fr',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
