import {Classe} from "./Classe";
import {Salle} from "./Salle";
import {Ue} from "./Ue";
import {Td} from "./Td";
import {Enseignant} from "./Enseignant";
import {GroupeCours} from "./GroupeCours";
import {Jour, Periode} from "./TypeHoraire";
import {GroupeTd} from "./GroupeTd";

export interface PlanningCours {
  id?: number,
  createdAt?: string,
  updatedAt?: string,
  classeId: number | null,
  salleId: number | null,
  ueId: number | null,
  tdId: number | null,
  enseignant1Id: number | null,
  enseignant2Id: number | null,
  enseignant3Id: number | null,
  enseignant4Id: number | null,
  groupeTdId: number | null,
  groupeCoursId: number | null,
  periodeId: number,
  jourId: number,
  anneeScolaireId: number | null
  classe?: Classe | null,
  salle?: Salle | null,
  ue?: Ue | null,
  td?: Td | null,
  enseignant1?: Enseignant | null,
  enseignant2?: Enseignant | null,
  enseignant3?: Enseignant | null,
  enseignant4?: Enseignant | null,
  groupeTd?: GroupeTd | null,
  groupeCours?: GroupeCours | null,
  periode?: Periode,
  jour?: Jour,
  anneeScolaire?: number | null
}
