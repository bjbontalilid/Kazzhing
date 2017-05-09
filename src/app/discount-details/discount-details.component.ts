import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { Users } from '../Users';
import { Discount } from '../discount';
import { UserDiscount } from '../userdiscount';

@Component({
  selector: 'app-discount-details',
  templateUrl: './discount-details.component.html',
  styleUrls: ['./discount-details.component.scss']
})
export class DiscountDetailsComponent implements OnInit {
  discount: Discount[];
  users:Users[];
  userdiscounts: UserDiscount[];
  name: any;
  currentUser: any;
  theUserID: any;
  currentUserID: any;
  discountid: any;

  constructor(public af: AngularFire,private router: Router, private route:ActivatedRoute, private _firebaseService:FirebaseService) { 
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

  ngOnInit() {
    this.discountid = this.route.snapshot.params['id'];
    console.log(this.discountid);

    this._firebaseService.getDiscountDetails(this.discountid).subscribe(discount => {
      this.discount = discount;
      console.log(this.discount);
    });
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
}
