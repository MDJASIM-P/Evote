import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-std-reg',
  templateUrl: './std-reg.component.html',
  styleUrls: ['./std-reg.component.css']
})
export class StdRegComponent {

  constructor(private ds:DataService, private fb:FormBuilder, private r:Router){}

  regForm=this.fb.group({
    fname:['', [Validators.required]], 
    lname:['', [Validators.required]], 
    uname:['', [Validators.required]],
    year:['', [Validators.required]], 
    std_id:['', [Validators.required]], 
    pswd:['', [Validators.required]], 
    cpswd:['', [Validators.required]] 
  })

  submitted(){
    let f_name=this.regForm.controls.fname.value
    let l_name=this.regForm.controls.lname.value
    let u_name=this.regForm.controls.uname.value
    let y=this.regForm.controls.year.value
    let std_id=this.regForm.controls.std_id.value
    let pswd=this.regForm.controls.pswd.value
    let cpswd=this.regForm.controls.cpswd.value
    if(pswd==cpswd){
      this.ds.signup(f_name, l_name, u_name, y, std_id, pswd).then(res=>res.json()).then(res=>{
        if(res['msg']==="user created"){
          alert('Registration succesfull')
          this.r.navigate(['std_log'])
        }
        else{
          alert('Something wrong check console')
        }
        console.log(res)
      })
    }
    else{
      alert("passwords mismatch")
    }
  }


}
