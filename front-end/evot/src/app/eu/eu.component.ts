import { Component, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../services/data.service';
import { User } from '../user';
import { Event } from '../event';
import { Candidate } from '../candidate';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-eu',
  templateUrl: './eu.component.html',
  styleUrls: ['./eu.component.css']
})
export class EuComponent {

  // Initialize event with default values or an empty object
  event: Event = { 
    id: 0, title: '', reg_end_dt: '', e_start_dt: '', e_end_dt: '', status: '', candidates: [], voters: []
  };
  user:User={
   id:0, first_name: '', last_name: '', username: '', year: '', std_id: 0, voter_id: 0, password: '', is_staff: false,
  }

  candidate:any={}
  eid:any;
  is_Cnd=false;
  file:any;

  constructor(private ds:DataService, private fb:FormBuilder, private ar:ActivatedRoute, private r:Router){
    this.ar.params.subscribe(res=>this.eid=res['id'])
    this.ds.getEvent(this.eid).then(res=>res.json()).then((e:Event)=>{
      this.event=e,
      console.log('Event:',this.event)
    });
    // Check the user is a candidate or not : return candidate or false
    this.ds.isUserInCandidates(this.eid).then(res=>res.json()).then(res=>{
      if(res){
        this.candidate=res;
        console.log('candidate:',this.candidate)
        this.is_Cnd=true
      }
    });
  }

  cndForm=this.fb.group({
  voterid:['', Validators.required],
  group:['', Validators.required],
  })

  uploadImage(e:any){
    this.file = e.target.files[0]
    console.log('The follwing file selected :', this.file)
  }
  submitted(){
    let vid:any=this.cndForm.controls.voterid.value //get voterid from form
    let group:any=this.cndForm.controls.group.value
    let formd=new FormData()
    
    this.ds.getUser(0).then(res=>res.json()).then((res:User)=>{ // call the instance user
      this.user=res
      if(vid==this.user.voter_id){    //cheching voterid is valid
        alert("voterid valid")
        formd.append('student', this.user.id.toString())
        formd.append('group', group)
        formd.append('symbol', this.file, this.file.name)
        formd.append('status', 'candidate')
        this.ds.makeC(formd).then(res=>res.json()).then((cnd:Candidate)=>{
          console.log('New Candiate:',cnd)
          this.candidate=cnd
          if(cnd){
            // Adding candidate to event
            this.ds.addToEvent(this.eid, cnd.id, 0).then(res=>res.json()).then(res=>console.log('added candidate to event:',res))
            window.location.reload();
            alert('you added successfully!')
          }
          else{
            alert('something went wrong?')
          }
        })
      }
      else{
        alert('Voterid is not valid')
      }
    });
  }
  deleted(e:any){
    let cid=e.target.id
    console.log("candidate id:", cid)
    alert('Are you sure?')
    this.ds.deleteCandidate(cid).then(res=>res.json()).then(res=>{
      alert("Canidation deleted")
      }).catch(res=>console.log(res.error))
    window.location.reload();
  }
}
