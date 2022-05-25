import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {TranslationService} from "../../services/translation.service";
import {LoginTeacher} from "../../models/LoginTeacher";
import {AuthService} from "../../services/auth.service";
import {TokenService} from "../../services/token.service";
import {AuthStateService} from "../../services/auth-state.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm !: FormGroup;

  isSubmitted: boolean = false;
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private translationService: TranslationService,
    private authService: AuthService,
    private token: TokenService,
    private authState: AuthStateService
  ) {
    this.signInForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });
  }

  ngOnInit(): void {
  }

  onFormSubmit(): void
  {
    this.isSubmitted = true;

    if (!this.signInForm.valid) {
      Swal.fire({
        title: this.translationService.getValueOf("ALERTS.ERROR"),
        text: this.translationService.getValueOf("ALERTS.INVALIDFORM"),
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } else {
      this.isLoading = true;
      let loginData: LoginTeacher = {
        email: this.formValues.email,
        password: this.formValues.password
      }

      this.authService.login(loginData)
        .then((res: any) =>{
          let isNewer: boolean = res.user?.createdAt === res.user?.updatedAt;
          let faculte = this.translationService.getCurrentLang() === "fr" ? res.user?.faculte.nom: res.user?.faculte.nom_en;
          let salutation = new Date().getHours() > 12 ? this.translationService.getValueOf("SIGNIN.AFTERNOON") : this.translationService.getValueOf("SIGNIN.MORNING");
          salutation += " "+ this.translationService.getValueOf("GENDER.UNKNOW")+ " " + res.user?.noms;
          let msg1 = salutation+" ! "+this.translationService.getValueOf("SIGNIN.WELCOME") +" " + faculte + ". "+ this.translationService.getValueOf("SIGNIN.SUCCESS");
          let msg2 = salutation+ ", " +this.translationService.getValueOf("SIGNIN.SEEBACK") + " " + this.translationService.getValueOf("SIGNIN.SUCCESS");
          this.isLoading = false;
          this.responseHandler(res);
          this.authState.setAuthState(true);
          this.authState.saveUser(res.user);
          Swal.fire({
            title: this.translationService.getValueOf("ALERTS.SUCCESS"),
            text: isNewer ? msg1 : msg2,
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() =>{this.signInForm.reset()});
        })
        .catch((err)=>{
          this.isLoading = false;
          console.error(err);
          let msg1 = this.translationService.getValueOf("SIGNIN.ERROR1");
          let msg2 = this.translationService.getValueOf("SIGNIN.ERROR2");

          Swal.fire({
            title: this.translationService.getValueOf("ALERTS.ERROR"),
            text: err.error?.hasSearched ? msg1 : msg2,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        })
    }
  }

  get formValues()
  {
    return this.signInForm.value;
  }

  get errorControl()
  {
    return this.signInForm.controls;
  }

  getInputStatusClassName(input: string)
  {
    if(this.isSubmitted && this.errorControl[input].errors)
    {
      return "form-control with-error";
    }
    else
    {
      return "form-control";
    }
  }

  responseHandler(data:any) {
    this.token.saveToken(data.accessToken);
  }

}
