import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Candidate } from '../candidate';

@Component({
  selector: 'app-editcandidate',
  templateUrl: './editcandidate.component.html',
  styleUrls: ['./editcandidate.component.css']
})
export class EditcandidateComponent {
  cid:any;
  candidate:any={}
  symbol:any;
  constructor(private ar:ActivatedRoute, private fb:FormBuilder, private ds:DataService, private r:Router){
    this.ar.params.subscribe(res=>this.cid=res['cid'])
    this.ds.getCandidate(this.cid).then(res=>res.json()).then((cnd:Candidate)=>{
      this.candidate=cnd
      console.log(this.candidate)
      this.Form=this.fb.group({
        group:[`${this.candidate.group}`, Validators.required],
      })
    })
  }
  
  Form = this.fb.group({
    group:['', Validators.required],
  })

  uploadImage(e:any){
    this.symbol=e.target.files[0]
    console.log(this.symbol)
    if (this.symbol) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // e.target.result contains the local URL of the image
        this.candidate.symbol = e.target.result;
      };
      reader.readAsDataURL(this.symbol);
    }
  }
  submitted(){
    let group:any=this.Form.controls.group.value
    let fromd=new FormData()
    fromd.append('group', group)
    if(this.symbol){
      fromd.append('symbol', this.symbol, this.symbol.name)
    }
    this.ds.editCandidate(this.cid, fromd).then(res=>res.json()).then(res=>{
      console.log(res)
      alert('Edited successfully')
      this.r.navigate(['/home'])
    })
  }
}
