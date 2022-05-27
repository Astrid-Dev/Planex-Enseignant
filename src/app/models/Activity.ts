import {Enseignant} from "./Enseignant";
import {Salle} from "./Salle";
import {Periode} from "./TypeHoraire";
import {GroupeCours} from "./GroupeCours";
import {GroupeTd} from "./GroupeTd";
import {Ue} from "./Ue";

export interface Activity {
  id: number,
  name: string,
  participation: {
    isOptional: boolean
    allStudentsParticipate: boolean,
    groupeName: string,
    groupIsDivideByAlphabet: boolean,
    beginningLetter: string,
    endingLetter: string
  }
  principalTeacher: Enseignant | null,
  othersInvolvedTeachers: Enseignant[],
  room: Salle | null,
  period: Periode,
  description: {
    isCourse: boolean,
    isTutorial: boolean,
  },
  entitled?: string,
  entitled_en?: string,
  driftFrom?: Ue | null,
  driftFromEntitled?: string | null,
  day: string,
}

export interface DayActivies{
  id: number,
  displayDay: string,
  dayDate: Date,
  activities: Activity[]
}

export interface ActivityDetails{
  displayDay: string,
  dayDate: Date,
  activity: Activity
}
