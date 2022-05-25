import { Component } from '@angular/core';
import {TranslationService} from "./services/translation.service";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  canShowOthersParts: boolean = true;

  constructor(public translationService: TranslationService, private router: Router) {

    router.events
      .subscribe(event =>
      {
        if(event instanceof NavigationEnd)
        {
          const url = event.url;
          this.canShowOthersParts = (url !== "/sign-in");
        }
      });

  }
}
