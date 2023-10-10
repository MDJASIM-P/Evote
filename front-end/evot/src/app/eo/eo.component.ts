import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { Event } from '../event';
import { Candidate } from '../candidate';
import { User } from '../user';

@Component({
  selector: 'app-eo',
  templateUrl: './eo.component.html',
  styleUrls: ['./eo.component.css']
})
export class EoComponent {
  eid:any;
  event:any={}
  cids:any;
  candidates:Candidate[]=[]
  is_voter=false
  constructor(private ar:ActivatedRoute, private ds:DataService){
    this.ar.params.subscribe(res=>this.eid=res['id'])
    //  Event
    this.ds.getEvent(this.eid).then(res=>res.json()).then((res:Event)=>{
      this.event=res
      console.log('Event:',this.event)
      // candidates
      this.cids=this.event.candidates.join(',')
      this.ds.getEventCandidates(this.cids).then(res=>res.json()).then(res=>{
        this.candidates=res
        this.candidates.forEach(c=>{
          this.ds.getUser(c.student).then(res=>res.json()).then((user:User)=>{
            c.student=user;
          });
        });
        console.log('Candidates:',this.candidates)
        // 
        this.ds.isUserInVoters(this.eid).then(res=>res.json()).then(res=>{
          this.is_voter=res
          console.log('User is already voted:', res)
        })
      })
    })
  }

}
