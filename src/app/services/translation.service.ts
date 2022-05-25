import { Injectable } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

const LAGUAGE_KEY = "LANGUAGE";

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private currentLang !: string;
  private langsList = ["fr", "en"];

  constructor(private translate: TranslateService) {
    translate.addLangs(this.langsList);

    setTimeout(() =>{
      const lang = localStorage.getItem(LAGUAGE_KEY);
      if(lang)
      {
        translate.setDefaultLang(lang);
        this.currentLang = lang;
      }
      else
      {
        this.currentLang = this.langsList[0];
        translate.setDefaultLang(this.currentLang);
      }
    }, 200)
  }

  changeLanguage(newLang: string)
  {
    if(this.currentLang !== newLang && this.translate.getLangs().includes(newLang))
    {
      this.translate.use(newLang);
      this.currentLang = newLang;
      localStorage.setItem(LAGUAGE_KEY, newLang);
    }
  }

  getCurrentLang()
  {
    return this.currentLang;
  }

  getValueOf(key: string)
  {
    return this.translate.instant(key);
  }

}
