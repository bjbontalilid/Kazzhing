import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../router.animations';
import {FirebaseService} from '../services/firebase.service';
import {Users} from '../Users';
import {Discount} from '../discount';
import {UserDiscount} from '../userdiscount';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.scss']
})
export class DiscountsComponent implements OnInit {
  discounts: Discount[];
  users:Users[];
  userdiscounts: UserDiscount[];
  name: any;
  currentUser: any;
  theUserID: any;
  currentUserID: any;

  constructor(public af: AngularFire,private router: Router, private _firebaseService:FirebaseService) { 
    
  }

  logout() {
     this.af.auth.logout();
     this.router.navigateByUrl('/login');
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
  ngOnInit() {
    
        this._firebaseService.getDiscounts().subscribe(discounts => {
          this.discounts = discounts;
          console.log(discounts);
        });
        
  }

}
