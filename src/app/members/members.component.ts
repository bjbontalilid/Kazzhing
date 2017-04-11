import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../router.animations';
import {FirebaseService} from '../services/firebase.service';
import {Users} from '../Users';
import {Discount} from '../discount';
import {UserDiscount} from '../userdiscount';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  //host: {'[@moveIn]': ''},
  providers: [FirebaseService]
})
export class MembersComponent implements OnInit {
  name: any;
  currentUser: any;
  theUserID: any;
  currentUserID: any;
  state: string = '';
  users:Users[];
  discounts: Discount[];
  userdiscounts: UserDiscount[];

  constructor(public af: AngularFire,private router: Router, private _firebaseService:FirebaseService) {
    this.af.auth.subscribe(auth => {
      if(auth) {
        this.name = auth;
        this._firebaseService.getUsers(auth.uid).subscribe(users => {
          this.users = users;
          this.theUserID = users[0].regUser;
          this.currentUser = users[0].firstname;
        });
      }
    });
  }

  logout() {
     this.af.auth.logout();
     this.router.navigateByUrl('/login');
  }

  getUserID(theID){
    this.currentUserID = theID;
    return this.currentUserID;
  }

  availDiscount(userID,discountID){
    
    var created_at = new Date().toString();   

    var newUserDiscount = {
      date: created_at,
      userID: userID,
      discountID: discountID
    }
    this._firebaseService.addUserDiscount(newUserDiscount);
    this.router.navigateByUrl('member-dashboard');
  }
  isEmptyObject(obj) {
    return (Object.keys(obj).length === 0);
  }
  ngOnInit() {
    this.af.auth.subscribe(auth => {
      if(auth) {
        this._firebaseService.getDiscounts().subscribe(discounts => {
          this.discounts = discounts;
          console.log(discounts);
        });
        this._firebaseService.getUserDiscounts(auth.uid).subscribe(userdiscounts => {
          this.userdiscounts = userdiscounts;
          console.log(userdiscounts);
        });
      }
     });
    /*
    this.af.auth.subscribe(auth => {
      if(auth) {
        this._firebaseService.getUserDiscounts(auth.uid).subscribe(userdiscounts => {
          this.userdiscounts = userdiscounts;
          console.log(userdiscounts);
        });
      }
     });
     */
  }

}