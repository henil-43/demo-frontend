import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EdituserComponent } from './edituser/edituser.component';
import { GetusersComponent } from './getusers/getusers.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ViewuserComponent } from './viewuser/viewuser.component';
import { AuthGuard } from './auth/auth.guard'
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'heroes',component: HeroesComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'detail/:id', component: HeroDetailComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'users', component: GetusersComponent,canActivate: [AuthGuard]},
  {path: 'user/view/:id', component: ViewuserComponent,canActivate: [AuthGuard]},
  {path: 'user/edit/:uid', component: EdituserComponent,canActivate: [AuthGuard]},
  {path: 'chat', component: ChatComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
