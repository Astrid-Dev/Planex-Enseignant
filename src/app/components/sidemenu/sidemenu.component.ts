import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {max} from "rxjs/operators";

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {
  current_menu = -1;

  constructor(private router: Router) {

    router.events
      .subscribe(event =>
      {
        if(event instanceof NavigationEnd)
        {
          const url = event.url;
          switch (url) {
            case "/home" :{
              this.current_menu = 0;
              break;
            }
          }
        }
      });

  }

  ngOnInit(): void {

  }

  getNavClassName(preferMenu: number, minMenu: number=-1, maxMenu: number=-1)
  {
    if(minMenu !== -1 && maxMenu !== -1)
    {
      if(this.current_menu === preferMenu)
      {
        return "nav-item has-sub active";
      }
      else if(this.current_menu >= minMenu && this.current_menu <= maxMenu)
      {
        return "nav-item has-sub open";
      }
      else
      {
        return "nav-item has-sub";
      }
    }
    else
    {
      if(this.current_menu === preferMenu)
      {
        return "active";
      }
      else
      {
        return "";
      }
    }
  }

}
