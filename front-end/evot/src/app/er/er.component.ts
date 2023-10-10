import { Component, inject } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Event } from '../event';
import { Candidate } from '../candidate';
import { User } from '../user';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-er',
  templateUrl: './er.component.html',
  styleUrls: ['./er.component.css']
})
export class ErComponent {
  eid:any;
  event : any={}
  cids='';
  candidates:Candidate[]=[]
  

  constructor(private ds:DataService, private ar:ActivatedRoute){
    
      // const eid = Number(this.ar.snapshot.params['id']);
      this.ar.params.subscribe(res=>this.eid=res['id'])
      this.ds.getEvent(this.eid).then(res=>res.json()).then((e:Event)=>{
        this.event=e,
        console.log('Event:',this.event)
        this.cids=this.event.candidates.join(',')   // list of candidates to string  format
        // candidates
        this.ds.getEventCandidates(this.cids).then(res=>res.json()).then((cnds:Candidate[])=>{
          this.candidates=cnds
          this.candidates.forEach(c=>{
            this.ds.getUser(c.student).then(res=>res.json()).then((user:User)=>{
              c.student=user;
            });
          });
          console.log('candidates', this.candidates);          
        })
      });

      
      
  }
  


}
