import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stf-log',
  templateUrl: './stf-log.component.html',
  styleUrls: ['./stf-log.component.css']
})
export class StfLogComponent {

  constructor(private ds:DataService, private fb:FormBuilder, private r:Router){}

  logForm=this.fb.group({
    username:[''],
    password:['']
  })

  submitted(){
    let uname= this.logForm.controls.username.value
    let pswd= this.logForm.controls.password.value
    this.ds.login(uname, pswd).then(res=>res.json()).then(res=>{
      if (res['token'] && uname){
        localStorage.setItem('token', res['token'])
        localStorage.setItem('username', uname)
        this.ds.is_Staff().then(res=>res.json()).then(res=>{
          if(res==true){
            this.r.navigate(['staff'])
          }
          else{
            alert("you are not a staff!")
          }
        });
        
      }
      else{
        alert('Invalid Username or Password!')
      }
    }).catch(res=>console.log(res.error))

    
  }

}
