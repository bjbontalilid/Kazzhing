import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { EmailComponent } from './email/email.component';
import { MembersComponent } from './members/members.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './services/auth.service';
import { routes } from './app.routes';
import { HomeComponent } from './home/home.component';
import { AddDiscountComponent } from './add-discount/add-discount.component';
import { BusinessSignupComponent } from './business-signup/business-signup.component';
import { CorporateMembersComponent } from './corporate-members/corporate-members.component';
import { MemberDashboardComponent } from './member-dashboard/member-dashboard.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DiscountsComponent } from './discounts/discounts.component';
import { DiscountDetailsComponent } from './discount-details/discount-details.component';

// Must export the config
export const firebaseConfig = {
    apiKey: "AIzaSyD-6ZVaSo4tGUfn5MRiTWUXUKIm75Q1tkI",
    authDomain: "kazzhing-94f99.firebaseapp.com",
    databaseURL: "https://kazzhing-94f99.firebaseio.com",
    storageBucket: "kazzhing-94f99.appspot.com",
    messagingSenderId: "73505650025"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmailComponent,
    MembersComponent,
    SignupComponent,
    HomeComponent,
    AddDiscountComponent,
    BusinessSignupComponent,
    CorporateMembersComponent,
    MemberDashboardComponent,
    HeaderComponent,
    FooterComponent,
    DiscountsComponent,
    DiscountDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    routes
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
