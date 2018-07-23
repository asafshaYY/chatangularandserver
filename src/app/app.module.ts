import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import * as $ from 'jquery';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ChatlobbyComponent } from './components/chatlobby/chatlobby.component';
import { ChatroomComponent } from './components/chatroom/chatroom.component';
import { FieldErrorDisplayComponent } from './components/field-error-display/field-error-display.component';
import { AppRoutingModule } from './/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatlobbyComponent,
    ChatroomComponent,
    FieldErrorDisplayComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule, 
    ReactiveFormsModule, AppRoutingModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
