import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import {FirebaseService} from './services/firebase.service';
import { Router } from '@angular/router';
import { moveIn, fallIn } from './router.animations';
import {Users} from './Users';
import {Company} from './company';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
   providers: [FirebaseService]
})
export class AppComponent implements OnInit{
  title = 'app works!';

  users:Users[];
  company: Company[];

  constructor(private _firebaseService:FirebaseService) {
  
  }

ngOnInit(){
    this._firebaseService.getUsers().subscribe(users => {
      this.users = users;
     //  console.log(this.users);
    });
    this._firebaseService.getCompany().subscribe(company => {
      this.company = company;
     //  console.log(this.users);
    });

  }



}


  