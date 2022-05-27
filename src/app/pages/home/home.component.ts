import {AfterViewInit, Component, OnInit} from '@angular/core';
import {TeacherService} from "../../services/teacher.service";
import {Activity, ActivityDetails, DayActivies} from "../../models/Activity";
import {TranslationService} from "../../services/translation.service";
import {NgxSmartModalService} from "ngx-smart-modal";
import {Salle} from "../../models/Salle";

const MODAL_ID = "activityDetails";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  pageTitle = "";

  hasLoadedDatas: boolean | null = null;
  weekActivities: DayActivies[] = [];

  lastCollapsedItemIndex: number | null = null;

  modal: any = null;

  constructor(
    private teacherService: TeacherService,
    private translationService: TranslationService,
    private ngxSmartModalService: NgxSmartModalService
  ) {
  }

  ngOnInit(): void {
    this.pageTitle = "HOME.TITLE";
    this.loadDatas();
  }

  ngAfterViewInit(): void {
    this.modal = this.ngxSmartModalService.getModal(MODAL_ID);
  }

  loadDatas()
  {
    this.hasLoadedDatas = null;
    if(this.teacherService.hasLoaded)
    {
      this.hasLoadedDatas = true;
      this.setWeekActitivies();
    }
    else
    {
      this.teacherService.loadCurrentTeacherDatas()
        .then((res) =>{
          this.hasLoadedDatas = true;
          this.setWeekActitivies();
        })
        .catch((err) =>{
          console.error(err);
          this.hasLoadedDatas = false;
        });
    }
  }

  setWeekActitivies()
  {
    this.weekActivities = this.getWeekActivities();
    let temp = this.weekActivities[0];

    temp.activities = temp.activities.filter((activity) =>{
      let currentDate = new Date();
      let involvedDate = new Date();

      let endHourOfPeriod = parseInt(activity.period.fin.split("h")[0].trim());
      let endMinuteOfPeriod = parseInt(activity.period.fin.split("h")[1].trim());
      involvedDate.setHours(endHourOfPeriod, endMinuteOfPeriod);

      return currentDate.getTime() <= involvedDate.getTime();
    });

    this.weekActivities[0] = temp;
  }

  get tutorials()
  {
    return this.teacherService.tutorialsInPlannings;
  }

  get teachingUnits()
  {
    return this.teacherService.teachingUnitsInPlannings;
  }

  get teachers()
  {
    return this.teacherService.teachersInPlannings;
  }

  get coursesGroups()
  {
    return this.teacherService.coursesGroupsInPlannings;
  }

  get tutorialsGroups()
  {
    return this.teacherService.tutorialsGroupsInPlannings;
  }

  get rooms()
  {
    return this.teacherService.roomsInPlannings;
  }

  get currentDayActivities()
  {
    return this.teacherService.currentDayActivitiesOfTeacher;
  }

  getWeekActivities(){
    return this.teacherService.restOfWeekActiviesOfTeacher;
  }

  printActivity(activity: Activity)
  {
    let result = (activity.participation.isOptional ? "*" : "")+activity.name;
    if(!activity.participation.allStudentsParticipate)
    {
      result += ", "+activity.participation.groupeName;
    }

    return result;
  }

  printDayName(index: number, dayKey: string)
  {
    if(index === 0)
    {
      return this.translationService.getValueOf("DAYS.TODAY");
    }
    else if(index === 1)
    {
      return this.translationService.getValueOf("DAYS.TOMORROW");
    }
    else{
      return this.translationService.getValueOf(dayKey);
    }
  }

  printDayActivityName(dayActivity: DayActivies, index: number)
  {
    return this.printDayName(index, dayActivity.displayDay) + ", " + dayActivity.dayDate.toLocaleDateString();
  }

  printPeriod(period: any)
  {
    let startField = "debut";
    let endField = "fin";
    if(period)
      return this.translationService.getCurrentLang() === "fr" ?( period[startField] + " - " + period[endField]) : (period[startField+"_en"] + " - " + period[endField+"_en"]);
    else
      return "Inconnue";
  }

  printRoom(room: Salle | null)
  {
    return room === null ? "Non renseignée" : room.code;
  }

  onCollapse(itemIndex: number)
  {
    if(this.lastCollapsedItemIndex === itemIndex)
    {
      this.lastCollapsedItemIndex = null;
    }
    else{
      this.lastCollapsedItemIndex = itemIndex;
    }
  }

  isActiveItem(itemIndex: number)
  {
    return this.lastCollapsedItemIndex === itemIndex;
  }

  getRASTypeOf(itemIdex: number){
    if(this.weekActivities[itemIdex].activities.length === 0 && this.getWeekActivities()[itemIdex]?.activities.length !== 0)
    {
      return 'HOME.RAS2';
    }
    else{
      return 'HOME.RAS';
    }
  }

  onDetailsClick(activityIndex: number, dayIndex: number = -1)
  {
    let selectedActivity: any = null;
    let displayDay: string = "";
    let dayDate: Date;

    if(dayIndex === -1)
    {
      selectedActivity = this.currentDayActivities[activityIndex];
      displayDay = this.printDayActivityName(this.weekActivities[0], 0);
      dayDate = this.weekActivities[0].dayDate;
    }
    else{
      selectedActivity = this.weekActivities[dayIndex].activities[activityIndex];
      displayDay = this.printDayActivityName(this.weekActivities[dayIndex], dayIndex);
      dayDate = this.weekActivities[dayIndex].dayDate;
    }

    let result: ActivityDetails = {
      activity: selectedActivity,
      dayDate: dayDate,
      displayDay: displayDay
    }

    console.log(result);
    this.modal.setData(result, true);
    this.modal.open();
  }

}
