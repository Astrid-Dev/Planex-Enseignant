import {AfterViewInit, Component, OnInit} from '@angular/core';
import {NgxSmartModalComponent, NgxSmartModalService} from "ngx-smart-modal";
import {TranslationService} from "../../services/translation.service";

const MODAL_ID = "activityDetails";

@Component({
  selector: 'app-modal-activity-details',
  templateUrl: './modal-activity-details.component.html',
  styleUrls: ['./modal-activity-details.component.scss']
})
export class ModalActivityDetailsComponent implements OnInit, AfterViewInit {

  modal: any = null;

  constructor(private ngxSmartModalService: NgxSmartModalService, private translationService: TranslationService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.modal = this.ngxSmartModalService.getModal(MODAL_ID);
    this.modal.addCustomClass("nsm-centered");
    this.modal.onAnyCloseEventFinished.subscribe((mountModal: NgxSmartModalComponent) =>{
      this.modal.removeData();
    });
  }

  get datas()
  {
    return this.modal !== null ? this.modal.getData(): null;
  }

  get hasData()
  {
    return this.modal !== null && this.modal.hasData();
  }

  get activity(){
    return this.datas?.activity;
  }

  printActivity()
  {
    let result = (this.activity?.participation?.isOptional ? "*" : "")+this.activity?.name;
    if(!this.activity?.participation?.allStudentsParticipate)
    {
      result += ", "+this.activity?.participation?.groupeName;
    }

    return result;
  }

  get teacherOffice()
  {
    if(this.activity?.principalTeacher)
    {
      let office = this.activity.principalTeacher.bureau;
      if(office !== null && office !== "")
      {
        return office;
      }
      else{
        return this.translationService.getValueOf("MODALACTIVITY.UNKNOWN1");
      }
    }
    else{
      return "-";
    }

  }

  printPeriod(period: any)
  {
    let startField = "debut";
    let endField = "fin";
    if(period)
      return this.translationService.getCurrentLang() === "fr" ?( "De " + period[startField] + " À " + period[endField]) : ("From "+ period[startField+"_en"] + " To " + period[endField+"_en"]);
    else
      return this.translationService.getValueOf("MODALACTIVITY.UNKNOWN2");
  }

  get description()
  {
    let description = this.activity?.description;
    let name = this.activity?.name;
    let result = "";
    if(description.isCourse){
      result = this.translationService.getValueOf("MODALACTIVITY.ACTIVITY.COURSE")+" " + name;
    }
    else if(description.isTutorial)
    {
      result = this.translationService.getValueOf("MODALACTIVITY.ACTIVITY.TUTORIAL")+" " + this.activity?.driftFrom.code;
    }

    if(!this.activity.participation.allStudentsParticipate)
    {
      result += (result !== "" ? (this.translationService.getValueOf("MODALACTIVITY.ACTIVITY.WITH")+" ") + this.activity.participation.groupeName : "-");
    }

    return result;
  }

  get optionality()
  {
    return this.activity?.participation?.isOptional ? "CHOICES.YES" : "CHOICES.NO";
  }

  isDrifted()
  {
    return !this.activity.description.isCourse;
  }

  get entitled()
  {
    if(this.isDrifted())
    {
      return this.translationService.getCurrentLang() === "fr" ? this.activity.driftFrom.intitule : this.activity.intitule_en;
    }
    else{
      return this.translationService.getCurrentLang() === "fr" ? this.activity.entitled : this.activity.entitled_en;
    }

  }

  get participation()
  {
    return this.activity.participation.allStudentsParticipate ? this.translationService.getValueOf("MODALACTIVITY.ACTIVITY.ALLTHECLASS") : this.activity.participation.groupeName;
  }

  get groupConstitution()
  {
    if(this.activity.participation.allStudentsParticipate)
    {
      return null;
    }
    else{
      if(this.activity.participation.beginningLetter)
      {
        return this.translationService.getValueOf("MODALACTIVITY.ACTIVITY.STUDENTSFROM")+" " + this.activity.participation.beginningLetter +" "+ this.translationService.getValueOf("MODALACTIVITY.ACTIVITY.TO")+" " + this.activity.participation.endingLetter;
      }
      else{
        return this.translationService.getValueOf("MODALACTIVITY.ACTIVITY.DIVERSIFIED");
      }
    }
  }

  get roomCode()
  {
    if(this.activity?.room)
    {
      return this.activity.room.code;
    }
    else{
      return this.translationService.getValueOf("MODALACTIVITY.INFOS.ROOMNOTSPECIFIED");
    }
  }

  get othersTeachers()
  {
    if(this.activity?.othersInvolvedTeachers.length > 0)
    {
      let result = "";
      this.activity.othersInvolvedTeachers.forEach((teacher: any, index: number) =>{
        if(index !== 0)
        {
          result +=", ";
        }
        result += teacher.noms;

      });

      return result;
    }
    else{
      return this.translationService.getValueOf("MODALACTIVITY.TEACHERS.NONE");
    }
  }

}

