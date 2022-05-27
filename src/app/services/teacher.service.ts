import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AuthStateService} from "./auth-state.service";
import {Enseignant} from "../models/Enseignant";
import {Faculte} from "../models/Faculte";
import {Jour, Periode} from "../models/TypeHoraire";
import {PlanningCours} from "../models/PlanningCours";
import {Salle} from "../models/Salle";
import {Classe} from "../models/Classe";
import {Ue} from "../models/Ue";
import {Td} from "../models/Td";
import {GroupeCours} from "../models/GroupeCours";
import { GroupeTd } from '../models/GroupeTd';
import {Activity, DayActivies} from "../models/Activity";
import {DateHelper} from "../helpers/date.helper";

const TEACHERS_URL = environment.BACKEND_URL + "/enseignants";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private teacher: Enseignant | null = null;
  private faculty: Faculte | null = null;
  private days: Jour[] = [];
  private periods: Periode[] = [];
  private coursesPlanning$: PlanningCours[] = [];
  private rooms: Salle[] = [];
  private teachers: Enseignant[] = [];
  private classes: Classe[] = [];
  private teachingUnits: Ue[] = [];
  private tutorials: Td[] = [];
  private coursesGroups: GroupeCours[] = [];
  private tutorialsGroups: GroupeTd[] = [];

  private hasLoadedDatas: boolean = false;


  constructor(
    private authState: AuthStateService,
    private http: HttpClient
  ) { }

  loadCurrentTeacherDatas()
  {
    return new Promise((resolve, reject) =>{
      let teacher = this.authState.getUser();
      if(teacher !== null)
      {
        this.http.get(TEACHERS_URL+"/"+teacher.id)
          .subscribe({
            next: (res: any) =>{
              console.log(res);

              this.teacher = res.enseignant;
              this.faculty = res.faculte;

              this.coursesPlanning$ = res.plannings.planning_cours;
              this.teachers = res.plannings.enseignants;
              this.classes = res.plannings.classes;
              this.teachingUnits = res.plannings.ues;
              this.tutorials = res.plannings.tds;
              this.coursesGroups = res.plannings.groupes_cours;
              this.tutorialsGroups = res.plannings.groupes_tds;
              this.rooms = res.plannings.salles;
              this.periods = res.plannings.periodes;
              this.days = res.plannings.jours;
              this.hasLoadedDatas = true;
              resolve(res);
            },
            error: (err) =>{
              console.error(err);
              this.hasLoadedDatas = false;
            }
          })
      }
    });
  }

  get hasLoaded()
  {
    return this.hasLoadedDatas;
  }

  get currentTeacher()
  {
    return this.teacher;
  }

  get teacherFaculty()
  {
    return this.faculty;
  }

  get coursesPlanning()
  {
    return this.coursesPlanning$;
  }

  get teachersInPlannings(){
    return this.teachers;
  }

  get classesInPlannings(){
    return this.classes;
  }

  get teachingUnitsInPlannings(){
    return this.teachingUnits;
  }

  get tutorialsInPlannings(){
    return this.tutorials;
  }

  get coursesGroupsInPlannings(){
    return this.coursesGroups;
  }

  get tutorialsGroupsInPlannings(){
    return this.tutorialsGroups;
  }

  get roomsInPlannings(){
    return this.rooms;
  }

  get periodsInPlannings(){
    return this.periods;
  }

  get allDays(){
    return this.days;
  }

  getCoursesPlanningOnADay(dayNumber: number)
  {
    return this.coursesPlanning$.filter((elt) =>{
      let day = this.days.find(tmp => tmp.id === elt.jourId);
      return day?.id === dayNumber;
    });
  }

  getActivitiesOfTeacherOnADay(dayNumber: number)
  {
    let result: Activity[] = [];

    this.getCoursesPlanningOnADay(dayNumber).forEach((elt) =>{
      if(elt.tdId !== null || elt.ueId !== null)
      {
        let principalTeacher: Enseignant | undefined | null = elt.enseignant1Id !== null ? this.teachers.find(ens => ens.id === elt.enseignant1Id) : null;
        let othersTeachers: Enseignant[] = [];
        if(elt.enseignant2Id !== null)
        {
          let temp: Enseignant | undefined = this.teachers.find(ens => ens.id === elt.enseignant2Id);
          if(temp) {
            othersTeachers.push(temp)
          }
        }
        if(elt.enseignant3Id !== null)
        {
          let temp: Enseignant | undefined = this.teachers.find(ens => ens.id === elt.enseignant3Id);
          if(temp) {
            othersTeachers.push(temp)
          }
        }
        if(elt.enseignant4Id !== null)
        {
          let temp: Enseignant | undefined = this.teachers.find(ens => ens.id === elt.enseignant4Id);
          if(temp) {
            othersTeachers.push(temp)
          }
        }

        let teachingUnit = this.teachingUnits.find(teach => teach.id === elt.ueId);
        let tutorial = this.tutorials.find(tut => tut.id === elt.tdId);

        let activityName = elt.tdId !== null ? tutorial?.code : teachingUnit?.code;

        let period: Periode | undefined = this.periods.find(per => per.id === elt.periodeId);
        if(!period)
        {
          period = {
            debut: "0",
            fin: "0",
            debut_en: "0",
            fin_en: "0"
          }
        }

        let driftFrom: Ue | null | undefined = tutorial ? this.teachingUnits.find(temp => temp.id === tutorial?.ueId): null;

        let room: Salle | undefined = this.rooms.find(temp => temp.id === elt.salleId);

        let courseGroup: GroupeCours | undefined = this.coursesGroups.find(temp => temp.id === elt.groupeCoursId);
        let tutorialGroup: GroupeTd | undefined = this.tutorialsGroups.find(temp => temp.id === elt.groupeTdId);

        let group: any = courseGroup ? courseGroup : tutorialGroup ? tutorialGroup : null;
        result.push({
          id: result.length + 1,
          name: ""+activityName,
          participation: {
            isOptional: teachingUnit ? teachingUnit?.est_optionnelle : driftFrom ? driftFrom?.est_optionnelle : false,
            allStudentsParticipate: group === null,
            groupIsDivideByAlphabet: typeof group?.lettre_debut !== "undefined",
            groupeName: group?.nom,
            beginningLetter: group?.lettre_debut ? group.lettre_debut : "",
            endingLetter: group?.lettre_fin ? group.lettre_fin : "",
          },
          day: "",
          description: {
            isCourse: elt.ueId !== null,
            isTutorial: elt.tdId !== null,
          },
          entitled: teachingUnit?.intitule,
          entitled_en: teachingUnit?.intitule_en,
          driftFrom: driftFrom,
          othersInvolvedTeachers: othersTeachers,
          period: period,
          principalTeacher: principalTeacher ? principalTeacher : null,
          room: room ? room : null
        });
      }
    });

    return result;
  }

  get currentDayCoursesPlanning()
  {
    let currentDayNumber = new Date().getDay();
    return this.getCoursesPlanningOnADay(currentDayNumber);
  }

  get currentDayActivitiesOfTeacher()
  {
    let currentDayNumber = new Date().getDay();

    return this.getActivitiesOfTeacherOnADay(currentDayNumber);
  }

  get restOfWeekActiviesOfTeacher()
  {
    let currentDayNumber = new Date().getDay();
    let possiblesDays = this.days;
    possiblesDays.sort((day1, day2) =>{
      let dayNumber1: number = ((day1.numero !== 0 && currentDayNumber !== 0) || (day1.numero === currentDayNumber)) ? day1.numero : 7;
      let dayNumber2: number = ((day2.numero !== 0 && currentDayNumber !== 0) || (day2.numero === currentDayNumber)) ? day2.numero : 7;

      if(dayNumber1 === currentDayNumber)
      {
        dayNumber1 = -100;
      }
      else if(dayNumber1 < currentDayNumber)
      {
        dayNumber1 = 100;
      }

      if(dayNumber2 === currentDayNumber)
      {
        dayNumber2 = -100;
      }
      else if(dayNumber2 < currentDayNumber)
      {
        dayNumber2 = 100;
      }

      if(dayNumber1 > dayNumber2)
      {
        return 1;
      }
      else if(dayNumber1 < dayNumber2)
      {
        return -1;
      }
      else{
        return 0;
      }
    });
    let result: DayActivies[] = [];
    possiblesDays.forEach((day, index) =>{
      let dayDate = new Date((new Date().getTime() + (index * 3600*24*1000)));
      result.push({
        id: result.length + 1,
        dayDate: dayDate,
        activities: this.getActivitiesOfTeacherOnADay(day.numero),
        displayDay: DateHelper.getADayName(day.numero)
      });
    });

    return result;

  }

  reset()
  {
    this.hasLoadedDatas = false;
    this.teacher = null;
    this.faculty = null;
  }
}
