import {Filiere} from "./Filiere";
import {Niveau} from "./Niveau";

export interface Classe {
  id?: number,
  code: string,
  intitule: string,
  intitule_en: string,
  est_divisee: number,
  filiereId?: number | null,
  niveauId?: number | null,
  filiere?: string | Filiere,
  niveau?: string | Niveau,
  createdAt?: string,
  updatedAt?: string,
  defaultFiliere?: string,
  defaultNiveau?: string,
}
