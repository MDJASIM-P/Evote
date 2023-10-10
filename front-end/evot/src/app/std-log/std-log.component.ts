import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-std-log',
  templateUrl: './std-log.component.html',
  styleUrls: ['./std-log.component.css']
})
export class StdLogComponent {
  constructor(private ds:DataService, private fb:FormBuilder, private r:Router){}
  logForm=this.fb.group({
    uname:[''],
    pswd:['']
  })

  submitted(){
    let uname= this.logForm.controls.uname.value
    let pswd= this.logForm.controls.pswd.value
    this.ds.login(uname, pswd).then(res=>res.json()).then(res=>{
      if (res['token'] && uname){
        localStorage.setItem('token', res['token'])
        localStorage.setItem('username', uname)
        this.r.navigate(['home'])
      }
      else{
        alert('Invalid Username or Password!')
      }
    })
  }
}
