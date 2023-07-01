import dayjs from 'dayjs/esm';

export interface IClient {
  id: number;
  code?: string | null;
  nom?: string | null;
  prenom?: string | null;
  dateNaissance?: dayjs.Dayjs | null;
  adresse?: string | null;
  ville?: string | null;
  codePostal?: number | null;
  tel?: string | null;
  fax?: string | null;
  gsm?: string | null;
  email?: string | null;
}

export type NewClient = Omit<IClient, 'id'> & { id: null };
