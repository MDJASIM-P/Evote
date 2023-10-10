import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { Event } from '../event';
import { Candidate } from '../candidate';
import { User } from '../user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  currentDate = new Date().toISOString(); // Get the current date in ISO format
  currentDT:any;
   
  events: Event[]=[]
  ongoing: Event[]=[]
  completed: Event[]=[]
  upcoming: Event[]=[]

  constructor(private ds:DataService,private r:Router ){
    if(!localStorage.getItem('token')){
      alert('login required')
      this.r.navigate([''])
    }
    console.log('current dt in UTC:',this.currentDate)
    const date = new Date(); // Create a JavaScript Date object from the ISO string
    date.setUTCHours(date.getUTCHours() + 5); // Add 5 hours
    date.setUTCMinutes(date.getUTCMinutes() + 30); // Add 30 minutes
    const result = date.toISOString();
    this.currentDT=result
    console.log('current dt in UTC adding 0530 hours:',result)
    
    // events
    this.ds.getEvents().then(res=>res.json()).then((events:Event[])=>{
      this.events=events;
      // adding the details of candidates in each event
      this.events.forEach(e=>{
        e.candidates.forEach(id=>{
          e.candidates = e.candidates.filter(candidate => candidate !== id); // removing the id of candidate
          this.ds.getCandidate(id).then(res=>res.json()).then((cnd:Candidate)=>{
            e.candidates.push(cnd)
            // adding user in candidate
            this.ds.getUser(cnd.student).then(res=>res.json()).then((user:User)=>{
              cnd.student=user;
            });
          });
        });
      })
      console.log('events and candidates:',this.events);
      // ongoing events by checking the end time of event
      this.events.forEach(e=>{
        const eventStartDt=e.e_start_dt;
        const eventEndDt = e.e_end_dt; 
        if(eventEndDt > result && result > eventStartDt){
          this.ongoing.push(e)
        }
      })
      console.log('ongoing', this.ongoing)
      // completed events by checking the end time of event
      this.events.forEach(e=>{
        const eventEndDt = e.e_end_dt;  
        if(eventEndDt < result){
          this.completed.push(e)
        }
      })
      console.log('completed', this.completed)
      // upcoming events by checking the starting time of event
      this.events.forEach(e=>{
        const eventStartDt= e.e_start_dt;
        if(eventStartDt > result){  
          this.upcoming.push(e)
        }
      })
      console.log('upcoming', this.upcoming)
    })
  }

  ngOnInit(): void {
    console.log('Home component is loading')
    
  }
  
}
