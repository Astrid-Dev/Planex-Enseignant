import {Classe} from "./Classe";

export interface GroupeCours {
  id?: number,
  nom: string,
  lettre_debut: string,
  lettre_fin: string,
  classeId?: number,
  classe?: Classe,
  createdAt?: string,
  updatedAt?: string,
  nbre_etudiants?: number
}
