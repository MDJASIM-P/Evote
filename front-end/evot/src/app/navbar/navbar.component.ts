import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { User } from '../user';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  user:any={}
  constructor(private r:Router, private ds:DataService){
    this.ds.getUser(0).then(res=>res.json()).then((res:User)=>{
      this.user=res;
    });
  }

  logout(){
    localStorage.clear()
    this.r.navigate([''])
  }
}
