import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  signup(first_name:any, last_name:any, username:any, year:any, std_id:any,  password:any){
    let data={
      first_name,
      last_name,
      username,
      year,
      std_id,
      password
    }
    return fetch('http://127.0.0.1:8000/user/', {
      method:'POST',
      body:JSON.stringify(data),
      headers:{
        'Content-type':'application/json; Charset=UTF-8',
      }
    })
  }

  login(username:any, password:any){
    let data={
      username,
      password
    }
    return fetch('http://127.0.0.1:8000/token/', {
      method:'POST',
      body:JSON.stringify(data),
      headers:{
        'Content-type':'application/json; Charset=UTF-8'
      }
    })
  }

  is_Staff(){
    return fetch('http://127.0.0.1:8000/staff_only/',{
      method:'GET',
      headers:{
        'Accept':'*/*',
        'Authorization':`Token ${localStorage.getItem('token')}`
      }
    })
  }

  addEvent(data:any){
    return fetch('http://127.0.0.1:8000/event/',{
      method:'POST',
      body: data,
      headers:{
        'Accept':'*/*',
        'Authorization':`Token ${localStorage.getItem('token')}`
      }
    })
  }
  editEvent(data:any, eid:any){
    return fetch(`http://127.0.0.1:8000/event/${eid}/`,{
      method:'PUT',
      body: data,
      headers:{
        'Accept':'*/*',
        'Authorization':`Token ${localStorage.getItem('token')}`
      }
    })
  }
  deleteEvent(eid:any){
    return fetch(`http://127.0.0.1:8000/event/${eid}/`,{
      method:'DELETE',
      headers:{
        'Accept':'*/*',
        'Authorization':`Token ${localStorage.getItem('token')}`
      }
    })
  }

  getEvents(){
    return fetch('http://127.0.0.1:8000/event/', {
      method:'GET',
      headers:{
        'Accept':'*/*',
        'Authorization':`Token ${localStorage.getItem('token')}`,
      }
    })
  }

  getEvent(id: any){
    return fetch(`http://127.0.0.1:8000/event/${id}/`, {
      method:'GET',
      headers:{
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization':`Token ${localStorage.getItem('token')}`,
      }
    })
  }

  makeC(data:any){
    return fetch('http://127.0.0.1:8000/candidate/',{
      method:'POST',
      body: data,
      headers:{
        'Accept':'*/*',
        'Authorization':`Token ${localStorage.getItem('token')}`
      }
    })
  }
  
  addToEvent(eid:any, cid:any, uid:any){
    return fetch(`http://127.0.0.1:8000/event/${eid}/?cid=${cid}&u=${uid}`,{
      method:'PATCH',
      headers:{
        'Accept':'*/*',
        'Authorization':`Token ${localStorage.getItem('token')}`
      }
    })
  }


  // Get candidates by passsing their ids as a string
  getEventCandidates(cids:string){
    return fetch(`http://127.0.0.1:8000/candidate/EventCandidates?ids=${cids}`, {
      method:'GET',
      headers:{
        'Accept':'*/*',
        'Authorization':`Token ${localStorage.getItem('token')}`,
      }
    })
  }

  getCandidate(id:any){
    return fetch(`http://127.0.0.1:8000/candidate/${id}/`, {
      method:'GET',
      headers:{
        'Accept':'*/*',
        'Authorization':`Token ${localStorage.getItem('token')}`,
      }
    })
  }

  editCandidate(cid:any, data:any){
    return fetch(`http://127.0.0.1:8000/candidate/${cid}/`,{
      method:'PATCH',
      body: data,
      headers:{
        'Accept':'*/*',
        'Authorization':`Token ${localStorage.getItem('token')}`
      }
    })
  }
  deleteCandidate(cid:any){
    return fetch(`http://127.0.0.1:8000/candidate/${cid}/`,{
      method:'DELETE',
      headers:{
        'Accept':'*/*',
        'Authorization':`Token ${localStorage.getItem('token')}`
      }
    })
  }

  getUser(id : any){
    return fetch(`http://127.0.0.1:8000/user/${id}/`, {
      method:'GET',
      headers:{
        'Accept':'*/*',
        'Authorization':`Token ${localStorage.getItem('token')}`,
      }
    })
  }

  getUsers(){
    return fetch(`http://127.0.0.1:8000/user/`, {
      method:'GET',
      headers:{
        'Accept':'*/*',
        'Authorization':`Token ${localStorage.getItem('token')}`,
      }
    })
  }

  isUserInCandidates(eid:any){
    return fetch(`http://127.0.0.1:8000/event/is_cnd?event=${eid}`, {
      method:'GET',
      headers:{
        'Accept':'*/*',
        'Authorization':`Token ${localStorage.getItem('token')}`,
      }
    })
  }

  isUserInVoters(eid:any){
    return fetch(`http://127.0.0.1:8000/event/is_voter?event=${eid}`, {
      method:'GET',
      headers:{
        'Accept':'*/*',
        'Authorization':`Token ${localStorage.getItem('token')}`,
      }
    })
  }

  AddVoterId(data:any, uid:any){
    return fetch(`http://127.0.0.1:8000/user/${uid}/`,{
      method:'PATCH',
      body:data,
      headers:{
        'Accept':'*/*',
        'Authorization':`Token ${localStorage.getItem('token')}`,
      }
    })
  }
}
