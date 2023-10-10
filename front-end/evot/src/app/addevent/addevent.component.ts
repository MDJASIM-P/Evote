import { Component } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addevent',
  templateUrl: './addevent.component.html',
  styleUrls: ['./addevent.component.css']
})
export class AddeventComponent {
  constructor(private fb:FormBuilder, private ds:DataService, private r:Router){ }

  addForm = this.fb.group({
    title:['', [Validators.required]], 
    reg_end_dt:['', [Validators.required]], 
    e_start_dt:['', [Validators.required]],
    e_end_dt:['', [Validators.required]], 
    status:['', [Validators.required]], 
  })

  submitted(){
    let title:any=this.addForm.controls.title.value
    let reg_end_dt:any=this.addForm.controls.reg_end_dt.value
    let e_start_dt:any=this.addForm.controls.e_start_dt.value
    let e_end_dt: any =this.addForm.controls.e_end_dt.value
    let status:any=this.addForm.controls.status.value
    let formd=new FormData()
    formd.append('title', title)
    formd.append('reg_end_dt', reg_end_dt)
    formd.append('e_start_dt', e_start_dt)
    formd.append('e_end_dt', e_end_dt)
    formd.append('status', status)
    this.ds.addEvent(formd).then(res=>res.json()).then(res=>{
      console.log(res)
      alert('Added')
      this.r.navigate(['/staff'])
    }).catch(res=>alert(res.error))
  }
}
