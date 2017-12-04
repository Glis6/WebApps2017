import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

import {AppComponent} from './app.component';
import {HomeComponent} from './public/home/home.component';
import {NavigationComponent} from './shared/navigation/navigation.component';
import {SharedModule} from "./shared/shared.module";
import {PublicModule} from "./public/public.module";
import {BrowserModule} from "@angular/platform-browser";
import {UserModule} from "./user/user.module";
import {LoginComponent} from "./user/login/login.component";
import {RegisterComponent} from "./user/register/register.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {PortfolioComponent} from "./drawing/portfolio/portfolio.component";
import {DrawingModule} from "./drawing/drawing.module";
import {CreateDrawingComponent} from "./drawing/create-drawing/create-drawing.component";
import {EditDrawingComponent} from "./drawing/edit-drawing/edit-drawing.component";

export const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'portfolio',
    component: PortfolioComponent
  },
  {
    path: 'portfolio/create',
    component: CreateDrawingComponent
  },
  {
    path: 'portfolio/edit/:drawingId',
    component: EditDrawingComponent
  },
  {
    path: '**',
    component: HomeComponent
  },
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    PublicModule,
    DrawingModule,
    UserModule,
    NgbModule.forRoot(),
    // Keep this one last
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
