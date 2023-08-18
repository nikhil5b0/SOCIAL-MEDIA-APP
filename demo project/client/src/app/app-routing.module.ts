import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './MyComponents/register/register.component';
import { LoginComponent } from './MyComponents/login/login.component';
import { HomeComponent } from './MyComponents/home/home.component';
import { MessageComponent } from './MyComponents/message/message.component';
import { FriendsComponent } from './MyComponents/friends/friends.component';
import { AboutComponent } from './MyComponents/about/about.component';
import { CreateComponent } from './MyComponents/create/create.component';
const routes: Routes = [
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'feeds',component:HomeComponent},
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'message/:id',component:MessageComponent},
  {path:'friends',component:FriendsComponent},
  {path:'about',component:AboutComponent},
  {path:'create',component:CreateComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
