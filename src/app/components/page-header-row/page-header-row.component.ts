import {Component, Input, OnInit} from '@angular/core';
import {TranslationService} from "../../services/translation.service";


export interface Breadcumb
{
  linkName: string,
  link?: string
}

@Component({
  selector: 'app-page-header-row',
  templateUrl: './page-header-row.component.html',
  styleUrls: ['./page-header-row.component.scss']
})
export class PageHeaderRowComponent implements OnInit {

  @Input() pageTitle = "";
  @Input() breadcumbs: Breadcumb[] = [];

  constructor(private translationService: TranslationService) { }

  ngOnInit(): void {
  }

  geValueOf(key: string)
  {
    return this.translationService.getValueOf(key);
  }

}
