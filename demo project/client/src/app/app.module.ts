import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './MyComponents/login/login.component';
import { RegisterComponent } from './MyComponents/register/register.component';
import { HeaderComponent } from './MyComponents/header/header.component';
import { FriendsComponent } from './MyComponents/friends/friends.component';
import { HomeComponent } from './MyComponents/home/home.component';
import { MessageComponent } from './MyComponents/message/message.component';
import { SidebarComponent } from './MyComponents/sidebar/sidebar.component';
import { AboutComponent } from './MyComponents/about/about.component';
import { CreateComponent } from './MyComponents/create/create.component';
import { SuggestionsComponent } from './MyComponents/suggestions/suggestions.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FriendsComponent,
    HomeComponent,
    MessageComponent,
    SidebarComponent,
    AboutComponent,
    CreateComponent,
    SuggestionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
