import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';
import { moveIn, fallIn } from '../router.animations';
import {FirebaseService} from '../services/firebase.service';
import {Users} from '../Users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
   animations: [moveIn(), fallIn()],
   providers: [FirebaseService]
  //host: {'[@moveIn]': ''}
})
export class LoginComponent implements OnInit {
  error: any;
  isUser: string;
  users:Users[];
  currentUser: any;
  name: any;

  constructor(public af: AngularFire,private router: Router, private _firebaseService:FirebaseService) {
      this.af.auth.subscribe(auth => { 
      if(auth) {
        this.router.navigateByUrl('/members');
      }
    });
  }

  onSubmit(formData, isUser) {
    if(formData.valid) {
      //console.log(formData.value);
      this.af.auth.login({
        email: formData.value.email,
        password: formData.value.password
      },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
      }).then(
        (success) => {
        //console.log('Success Id:' + success.uid);
        
        this._firebaseService.getUsers(success.uid).subscribe(users => {
          this.users = users;
          //console.log(this.users);
          //this.currentUser = users[0].firstname;
          //console.log(users.length);
          if(users.length > 0){
            this.router.navigate(['/members']);
          }
          else{
            this.router.navigate(['/corporate-members']);
          }
        });
        //console.log('User: ' + this.currentUser);
        
      }).catch(
        (err) => {
        console.log(err);
        this.error = err;
      })
    }
  }

  loginFb() {
    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup,
    }).then(
        (success) => {
        this.router.navigate(['/members']);
      }).catch(
        (err) => {
        this.error = err;
      })
  }

  loginGoogle() {
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup,
    }).then(
        (success) => {
        this.router.navigate(['/members']);
      }).catch(
        (err) => {
        this.error = err;
      })
  }

  changeState(isUser){
  	console.log('Changing state to: ' + isUser);
  	this.isUser = isUser;
  }

  ngOnInit() {
    
  }
}
