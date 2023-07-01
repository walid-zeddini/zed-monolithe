export interface ICategorie {
  id: number;
  code?: string | null;
  libelle?: string | null;
}

export type NewCategorie = Omit<ICategorie, 'id'> & { id: null };
