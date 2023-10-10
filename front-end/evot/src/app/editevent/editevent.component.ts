import { Component } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidate } from '../candidate';
import { User } from '../user';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-editevent',
  templateUrl: './editevent.component.html',
  styleUrls: ['./editevent.component.css']
})
export class EditeventComponent {
  eid:any;
  event : any={}
  cids='';
  candidates:Candidate[]=[]
  
  constructor(private fb:FormBuilder, private ds:DataService, private r:Router, private ar:ActivatedRoute){
    this.ar.params.subscribe(res=>this.eid=res['eid'])
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
        this.editForm=this.fb.group({
          title:[`${this.event.title}`, Validators.required],
          reg_end_dt:[`${this.event.reg_end_dt}`, Validators.required],
          e_start_dt:[`${this.event.e_start_dt}`, Validators.required],
          e_end_dt:[`${this.event.e_end_dt}`, Validators.required],
          cnds:[this.event.candidates, Validators.required],
          status:[`${this.event.status}`, Validators.required],
        })
      });
  }
  
  editForm = this.fb.group({
    title:['', [Validators.required]], 
    reg_end_dt:['', [Validators.required]], 
    e_start_dt:['', [Validators.required]],
    e_end_dt:['', [Validators.required]], 
    cnds:['', [Validators.required]],
    status:['', [Validators.required]], 
  })

  submitted(){
    let title:any=this.editForm.controls.title.value
    let reg_end_dt:any=this.editForm.controls.reg_end_dt.value
    let e_start_dt:any=this.editForm.controls.e_start_dt.value
    let e_end_dt: any =this.editForm.controls.e_end_dt.value
    let cands: any=this.editForm.controls.cnds.value
    let status:any=this.editForm.controls.status.value
    let formd=new FormData()
    formd.append('title', title)
    formd.append('reg_end_dt', reg_end_dt)
    formd.append('e_start_dt', e_start_dt)
    formd.append('e_end_dt', e_end_dt)
    for (let i = 0; i < cands.length; i++) {
      formd.append('candidates', cands[i]);
    }
    formd.append('status', status)
    console.log(formd.get('candidates'))
    this.ds.editEvent(formd, this.event.id).then(res=>res.json()).then(res=>{
      console.log(res)
      alert('Edited')
      this.r.navigate(['/staff'])
    }).catch(res=>alert(res.error))
  }
}
