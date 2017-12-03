import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpModule} from '@angular/http';
import { RegisterComponent } from './register/register.component';
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HttpModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  exports: [
  ]
})
export class UserModule { }
