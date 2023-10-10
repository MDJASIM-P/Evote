import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { StdLogComponent } from './std-log/std-log.component';
import { StfLogComponent } from './stf-log/stf-log.component';
import { StdRegComponent } from './std-reg/std-reg.component';
import { HomeComponent } from './home/home.component';
import { ErComponent } from './er/er.component';
import { EoComponent } from './eo/eo.component';
import { EuComponent } from './eu/eu.component';
import { VoteComponent } from './vote/vote.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddeventComponent } from './addevent/addevent.component';
import { EditeventComponent } from './editevent/editevent.component';
import { StaffhomeComponent } from './staffhome/staffhome.component';
import { VoteridComponent } from './voterid/voterid.component';
import { EditcandidateComponent } from './editcandidate/editcandidate.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    StdLogComponent,
    StfLogComponent,
    StdRegComponent,
    HomeComponent,
    ErComponent,
    EoComponent,
    EuComponent,
    VoteComponent,
    NavbarComponent,
    AddeventComponent,
    EditeventComponent,
    StaffhomeComponent,
    VoteridComponent,
    EditcandidateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
