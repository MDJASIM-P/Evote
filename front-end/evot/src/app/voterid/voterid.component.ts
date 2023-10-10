import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-voterid',
  templateUrl: './voterid.component.html',
  styleUrls: ['./voterid.component.css']
})
export class VoteridComponent {
  uid:any;
  constructor(private fb:FormBuilder, private ds:DataService, private r:Router, private ar:ActivatedRoute){
    this.ar.params.subscribe(res=>this.uid=res['uid'])
  }

  Form=this.fb.group({
    voterid:['', Validators.required]
  })

  submitted(){
    let voterid:any =this.Form.controls.voterid.value
    let formd= new FormData()
    formd.append('voter_id', voterid)
    this.ds.AddVoterId(formd, this.uid).then(res=>res.json()).then(res=>{
      console.log(res)
      alert('Voter Id successfully added')
      this.r.navigate(['staff'])
    })
  }
}
