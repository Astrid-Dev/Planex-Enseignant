import { Component, OnInit } from '@angular/core';
import {TranslationService} from "../../services/translation.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  FR = "fr";
  EN = "en";

  constructor(private translationService: TranslationService) { }

  ngOnInit(): void {
  }

  getLangFlag(lang: string)
  {
    if(lang === "fr")
    {
      return "flag-icon flag-icon-fr";
    }
    else
    {
      return "flag-icon flag-icon-gb";
    }
  }

  get currentLangFlag()
  {
    return this.getLangFlag(this.currentLang);
  }

  get currentLang()
  {
    return this.translationService.getCurrentLang();
  }

  changLang(newLang: string)
  {
    if(this.currentLang !== newLang)
    {
      this.translationService.changeLanguage(newLang);
    }
  }

}
