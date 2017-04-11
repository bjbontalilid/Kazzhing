import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../router.animations';
import {FirebaseService} from '../services/firebase.service';
import {Users} from '../Users';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  name: any;
  currentUser: any;
  theUserID: any;
  users:Users[];

  constructor(public af: AngularFire,private router: Router, private _firebaseService:FirebaseService) { 
    this.af.auth.subscribe(auth => {
      if(auth) {
        this.name = auth;
        this._firebaseService.getUsers(auth.uid).subscribe(users => {
          this.users = users;
          this.theUserID = users[0].regUser;
        });
      }
    });
  }
  logout() {
     this.af.auth.logout();
     this.router.navigateByUrl('/login');
  }
  ngOnInit() {
  }

}
