import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { StdLogComponent } from './std-log/std-log.component';
import { StfLogComponent } from './stf-log/stf-log.component';
import { StdRegComponent } from './std-reg/std-reg.component';
import { HomeComponent } from './home/home.component';
import { EoComponent } from './eo/eo.component';
import { ErComponent } from './er/er.component';
import { EuComponent } from './eu/eu.component';
import { VoteComponent } from './vote/vote.component';
import { AddeventComponent } from './addevent/addevent.component';
import { EditeventComponent } from './editevent/editevent.component';
import { StaffhomeComponent } from './staffhome/staffhome.component';
import { VoteridComponent } from './voterid/voterid.component';
import { EditcandidateComponent } from './editcandidate/editcandidate.component';

const routes: Routes = [
  {path:'staff', component:StaffhomeComponent},
  {path:'addevent', component:AddeventComponent},
  {path:'editevent/:eid', component:EditeventComponent},
  {path:'addvoterid/:uid', component:VoteridComponent},

  {path:'editcnd/:cid', component:EditcandidateComponent},
  {path:'voting/:eid/:cid', component:VoteComponent},
  {path:'er/:id', component:ErComponent},
  {path:'eo/:id', component:EoComponent},
  {path:'eu/:id', component:EuComponent},
  {path:'home', component:HomeComponent},
  {path:'std_reg', component:StdRegComponent},
  {path:'std_log', component:StdLogComponent},
  {path:'stf_log', component:StfLogComponent},

  {path:'', component:IndexComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
