import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';
import { moveIn, fallIn } from '../router.animations';
import {FirebaseService} from '../services/firebase.service';
import {Discount} from '../discount';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [moveIn(), fallIn()],
  //host: {'[@moveIn]': ''},
  providers: [FirebaseService]
})
export class HomeComponent implements OnInit {

  name: any;
  currentUser: any;
  currentUserID: any;
  state: string = '';
  discounts: Discount[];

  constructor(public af: AngularFire,private router: Router, private _firebaseService:FirebaseService) {

   }

  ngOnInit() {
    this._firebaseService.getDiscounts().subscribe(discounts => {
      this.discounts = discounts;
      console.log(discounts);
    })
  }

}
