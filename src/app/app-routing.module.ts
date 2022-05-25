import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {SignInComponent} from "./pages/sign-in/sign-in.component";
import {IsSignedOutGuard} from "./helpers/is-signed-out.guard";
import {IsSignedInGuard} from "./helpers/is-signed-in.guard";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "home"
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [IsSignedInGuard]
  },
  {
    path: "sign-in",
    component: SignInComponent,
    canActivate: [IsSignedOutGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
