import {Classe} from "./Classe";
import {Td} from "./Td";

export interface Ue {
  id?: number,
  code: string,
  intitule: string,
  intitule_en: string,
  est_optionnelle: boolean,
  possede_td?: boolean,
  semestre: number,
  classe?: string | Classe,
  classeId?: number | null,
  td?: null | Td
  defaultClasse?: string,
  createdAt?: string,
  updatedAt?: string,
}
