import dayjs from 'dayjs/esm';
import { IClient } from 'app/entities/client/client.model';

export interface ICommande {
  id: number;
  numero?: string | null;
  date?: dayjs.Dayjs | null;
  prixTotal?: number | null;
  etat?: number | null;
  client?: Pick<IClient, 'id'> | null;
}

export type NewCommande = Omit<ICommande, 'id'> & { id: null };
