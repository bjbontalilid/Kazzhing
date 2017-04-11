import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MembersComponent } from './members/members.component';
import { CorporateMembersComponent } from './corporate-members/corporate-members.component';
import { AuthGuard } from './services/auth.service';
import { SignupComponent } from './signup/signup.component';
import { BusinessSignupComponent } from './business-signup/business-signup.component';
import { EmailComponent } from './email/email.component';
import { HomeComponent } from './home/home.component';
import { AddDiscountComponent } from './add-discount/add-discount.component';
import { MemberDashboardComponent} from './member-dashboard/member-dashboard.component';
import { DiscountsComponent } from './discounts/discounts.component';


export const router: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'business-signup', component: BusinessSignupComponent },
    { path: 'login-email', component: EmailComponent },
    { path: 'members', component: MembersComponent, canActivate: [AuthGuard] },
    { path: 'corporate-members', component: CorporateMembersComponent, canActivate: [AuthGuard] },
    { path: 'add-discount', component: AddDiscountComponent, canActivate: [AuthGuard] },
    { path: 'member-dashboard', component: MemberDashboardComponent, canActivate: [AuthGuard] },
    { path: 'discounts', component: DiscountsComponent }
]

export const routes: ModuleWithProviders = RouterModule.forRoot(router);