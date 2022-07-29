import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MesagesComponent } from './mesages/mesages.component';
import { DashboardComponent } from './dashboard/dashboard.component'
//import { InMemoryDataService } from './in-memory-data.service';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { GetusersComponent } from './getusers/getusers.component';
import {MatTableModule} from "@angular/material/table";
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input'
import {MatListModule} from '@angular/material/list'
import { MatButtonModule } from '@angular/material/button';
import { ViewuserComponent } from './viewuser/viewuser.component';
import { EdituserComponent } from './edituser/edituser.component'
import { authInceptorProviders } from './auth.interceptor';
import { ChatService } from './chat.service';
import { ChatComponent } from './chat/chat.component';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MesagesComponent,
    DashboardComponent,
    HeroSearchComponent,
    LoginComponent,
    SignupComponent,
    GetusersComponent,
    ViewuserComponent,
    EdituserComponent,
    ChatComponent,
    FormBuilderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatStepperModule,
    DragDropModule
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, {dataEncapsulation: false}
    // )
  ],
  providers: [authInceptorProviders, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
