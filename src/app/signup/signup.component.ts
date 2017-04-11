import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import {FirebaseService} from '../services/firebase.service';
import { Router } from '@angular/router';
import { moveIn, fallIn } from '../router.animations';
import {Users} from '../Users';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [FirebaseService],
  animations: [moveIn(), fallIn()],
  //host: {'[@moveIn]': ''}
})
export class SignupComponent implements OnInit { 
  users:Users[];
  state: string = '';
  error: any;

  constructor(public af: AngularFire,private router: Router, private _firebaseService:FirebaseService) {

  }
  ngOnInit(){
    this._firebaseService.getUsers().subscribe(users => {
      this.users = users;
    });
    
  }

  addUser(formData) {
    if(formData.valid) {
      console.log(formData.value);
      this.af.auth.createUser({
        email: formData.value.email,
        password: formData.value.password
      }).then(
        (success) => {
//console.log("success: "+success.uid);
       var created_at = new Date().toString();   

      var newUser = {
        firstname: formData.value.firstname,
       lastname: formData.value.lastname,
       email: formData.value.email,
        created_at:created_at,
        regUser: success.uid
      }

      this._firebaseService.addUser(newUser);
      
        //console.log(success);
        this.router.navigate(['/login'])
      }).catch(
        (err) => {
        console.log(err);
        this.error = err;
      })
    }
  }



}
