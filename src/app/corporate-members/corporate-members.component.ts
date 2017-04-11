import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../router.animations';
import {FirebaseService} from '../services/firebase.service';
import { ChangeDetectionStrategy } from '@angular/core';
import {Company} from '../company';
import {Discount} from '../discount';

@Component({
  selector: 'app-corporate-members',
  templateUrl: './corporate-members.component.html',
  styleUrls: ['./corporate-members.component.scss'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  //host: {'[@moveIn]': ''},
  providers: [FirebaseService],
  changeDetection: ChangeDetectionStrategy.Default  
})
export class CorporateMembersComponent implements OnInit {
  name: any;
  currentUser: any;
  currentUserID: any;
  state: any;
  users:Company[];
  discounts: Discount[];
  appState: any;
  activeKey: string;
  unit: string;

  activeDiscountName: string;
  activeDescription: string;
  activeDiscountType: string;
  activeAmount: string;
  activeDiscount: any;

  constructor(public af: AngularFire,private router: Router, private _firebaseService:FirebaseService) { 
    this.af.auth.subscribe(auth => {
      if(auth) {
        this.name = auth;
        this._firebaseService.getCompany(auth.uid).subscribe(users => {
          this.users = users;
          this.currentUserID = users[0].regUser;
          this.currentUser = users[0].company_name;
          
          this._firebaseService.getCompanyDiscounts(this.currentUserID).subscribe(discounts =>  {
            this.discounts = discounts;
            console.log(discounts);
          });
        });
      }
    });
  }
  
  changeState(state){
  	this.appState = state;
    console.log(this.appState);
  }

  viewDiscount(discountID){
    this.changeState('view');
    this._firebaseService.getDiscountDetails(discountID).subscribe(selectedDiscount => {
      this.activeDiscount = selectedDiscount;
      //console.log(this.activeDiscount);
    })
  }

  editDiscount(discount){
  	this.changeState('edit');
    
    this.activeKey = discount.$key;
    this.activeDiscountName = discount.name;
    this.activeDescription = discount.description;
    this.activeDiscountType = discount.discount_type;
    this.activeAmount = discount.amount;
  }

  updateDiscount(){
  	var updDiscount = {
  		name: this.activeDiscountName,
      description: this.activeDescription,
      discount_type: this.activeDiscountType,
      amount: this.activeAmount,
  	}

  	this._firebaseService.updateDiscount(this.activeKey, updDiscount);
  	this.changeState('default');
    location.reload();
  }
  deleteDiscount(key){
  	this._firebaseService.deleteDiscount(key);
  	this.changeState('default');
  }
  logout() {
     this.af.auth.logout();
     this.router.navigateByUrl('/login');
  }
  ngOnInit() {
    /*this._firebaseService.getDiscounts().subscribe(discounts => {
      this.discounts = discounts;
      console.log(discounts);
    })
    this.appState = 'default';*/
  }

}
