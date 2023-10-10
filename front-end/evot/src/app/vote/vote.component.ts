import { Component,Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Event } from '@angular/router';
import { DataService } from '../services/data.service';
import { User } from '../user';
import { Router } from '@angular/router';
@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent {

  eid:any;
  cid:any;
  user:any={}

  constructor(private ar:ActivatedRoute, private fb:FormBuilder, private ds:DataService, private r:Router){
    this.ar.params.subscribe(res=>this.eid=res['eid'])
    this.ar.params.subscribe(res=>this.cid=res['cid'])
  }

  votingForm=this.fb.group({
    voterid:['', Validators.required],
  })

  submitted(){
    let voterid = this.votingForm.controls.voterid.value
    this.ds.getUser(0).then(res=>res.json()).then((res:User)=>{ // call the instance user
      this.user=res
      console.log(this.user)
      if(voterid==this.user.voter_id){    //checking voterid is valid
        alert("voterid is valid")
        this.ds.addToEvent(this.eid, this.cid, 1).then(res=>res.json()).then(res=>{
          console.log('Event after added voter:',res)
          alert(res['msg'])
          this.r.navigate(['eo', this.eid]);
          history.pushState(null, '', location.href);
          window.onpopstate = function () {
          history.go(1);
    };
        })

      }
      else{
        alert('error in voterid')
      }
    });
  }

}
