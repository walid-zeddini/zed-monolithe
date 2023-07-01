import { IProduit } from 'app/entities/produit/produit.model';
import { ICommande } from 'app/entities/commande/commande.model';

export interface ICarnetCommande {
  id: number;
  qte?: number | null;
  prixUnitaire?: number | null;
  prixTotal?: number | null;
  etat?: number | null;
  produit?: Pick<IProduit, 'id'> | null;
  commande?: Pick<ICommande, 'id'> | null;
}

export type NewCarnetCommande = Omit<ICarnetCommande, 'id'> & { id: null };
