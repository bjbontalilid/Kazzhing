import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../router.animations';
import {FirebaseService} from '../services/firebase.service';
import {Company} from '../company';
import {Discount} from '../discount';

@Component({
  selector: 'app-add-discount',
  templateUrl: './add-discount.component.html',
  styleUrls: ['./add-discount.component.scss'],
  providers: [FirebaseService],
  animations: [moveIn(), fallIn(), moveInLeft()],
  //host: {'[@moveIn]': ''},
})
export class AddDiscountComponent implements OnInit {
  name: any;
  currentUser: any;
  currentUserID: any;
  unit: string = '';
  company:Company[];
  discounts: Discount[];
  discountname: any;
  description: any;
  discounttype: any;
  amount: any;


  constructor(public af: AngularFire,private router: Router, private _firebaseService:FirebaseService) {
    this.af.auth.subscribe(auth => {
      if(auth) {
        this._firebaseService.getCompany(auth.uid).subscribe(company => {
          this.company = company;
          this.currentUser = company[0].company_name;
          this.currentUserID = auth.uid;
        }); 
      }
    });
   }

  ngOnInit() {
    this._firebaseService.getDiscounts().subscribe(discounts => {
      this.discounts = discounts;
    })
  }
  amountUnit(unit){
  	console.log('Unit: ' + unit);
  	this.unit = unit;
  }
  logout() {
     this.af.auth.logout();
     console.log('logged out');
     this.router.navigateByUrl('/login');
  }
  addDiscountSubmit(formData){
    /*var thedate = new Date().toString();   

    let thediscount = {
      name: this.discountname,
      description: this.description,
      date: thedate,
      discount_type:this.discounttype,
      amount: this.amount
    }*/
    var created_at = new Date().toString();   

    var newDiscount = {

      date: created_at,
      name: formData.value.discount_name,
      description: formData.value.description,
      discount_type: formData.value.discounttype,
      amount: formData.value.amount,
      company_id: this.currentUserID
    }
    console.log(newDiscount);
    this._firebaseService.addDiscount(newDiscount);
    this.router.navigate(['/corporate-members']);
  }
}
