import { ICategorie } from 'app/entities/categorie/categorie.model';

export interface IProduit {
  id: number;
  code?: string | null;
  marque?: string | null;
  modele?: string | null;
  caracteristiques?: string | null;
  prixUnitaire?: number | null;
  quantite?: number | null;
  categorie?: Pick<ICategorie, 'id'> | null;
}

export type NewProduit = Omit<IProduit, 'id'> & { id: null };
