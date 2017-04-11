import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import {FirebaseService} from '../services/firebase.service';
import { Router } from '@angular/router';
import { moveIn, fallIn } from '../router.animations';
import {Company} from '../company';

@Component({
  selector: 'app-business-signup',
  templateUrl: './business-signup.component.html',
  styleUrls: ['./business-signup.component.scss'],
  providers: [FirebaseService],
  animations: [moveIn(), fallIn()],
  //host: {'[@moveIn]': ''}
})
export class BusinessSignupComponent implements OnInit {

  companies: Company[];
  state: string = '';
  error: any;

  constructor(public af: AngularFire,private router: Router, private _firebaseService:FirebaseService) { }

  ngOnInit() {
    this._firebaseService.getCompany().subscribe(companies => {
      this.companies = companies;
    });
  }

  addCompany(formData) {
    if(formData.valid) {
      console.log(formData.value);
      this.af.auth.createUser({
        email: formData.value.company_email,
        password: formData.value.password
      }).then(
        (success) => {
          //console.log("success: "+success.uid);
          var created_at = new Date().toString();   

          var newCompany = {
            date: created_at,
            company_name: formData.value.company_name,
            company_email: formData.value.company_email,
            contact_person: formData.value.contact_person,
            username: formData.value.username,
            regUser: success.uid
          }

          this._firebaseService.addCompany(newCompany);
      
          console.log(success);
          this.router.navigate(['/login'])
        }).catch(
        (err) => {
          console.log(err);
          this.error = err;
        })
      }
    }

}
