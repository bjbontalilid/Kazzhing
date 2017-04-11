import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../router.animations';
import {FirebaseService} from '../services/firebase.service';
import {Users} from '../Users';
import {Discount} from '../discount';
import {UserDiscount} from '../userdiscount';

@Component({
  selector: 'app-member-dashboard',
  templateUrl: './member-dashboard.component.html',
  styleUrls: ['./member-dashboard.component.scss'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  //host: {'[@moveIn]': ''},
  providers: [FirebaseService]
})
export class MemberDashboardComponent implements OnInit {
  name: any;
  currentUser: any;
  currentUserID: any;
  state: string = '';
  users:Users[];
  discounts: Discount[];
  userdiscounts: UserDiscount[];
  discount: any;
  finalDiscounts = [];

  constructor(public af: AngularFire,private router: Router, private _firebaseService:FirebaseService) { 
    this.af.auth.subscribe(auth => {
      if(auth) {
        this.name = auth;
        this._firebaseService.getUsers(auth.uid).subscribe(users => {
          this.users = users;
          this.currentUser = users[0].firstname;
        });
      }
    });
  }

  logout() {
     this.af.auth.logout();
     this.router.navigateByUrl('/login');
  }
  
  ngOnInit() {
    this._firebaseService.getDiscounts().subscribe(discounts => {
      this.discounts = discounts;
    });
    this.af.auth.subscribe(auth => {
      if(auth) {
        this._firebaseService.getUserDiscounts(auth.uid).subscribe(userdiscounts => {
          this.userdiscounts = userdiscounts;
          console.log(userdiscounts.length);
          for(let discount of userdiscounts){
            console.log(discount.discountID);
            this._firebaseService.getDiscountDetails(discount.discountID).subscribe(selectedDiscount => {
              this.finalDiscounts.push(selectedDiscount);
            })
          }
          console.log(this.finalDiscounts);
        })
      }
     });
  }

}
