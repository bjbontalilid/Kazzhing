import {Injectable} from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';
import 'rxjs/add/operator/map';
import {Users} from '../Users';
import {Discount} from '../discount';
import {Company} from '../company';
import {UserDiscount} from '../userdiscount';


@Injectable()
export class FirebaseService{
    users: FirebaseListObservable<Users[]>;
    discounts: FirebaseListObservable<Discount[]>;
    company: FirebaseListObservable<Company[]>;
    userdiscounts: FirebaseListObservable<UserDiscount[]>;
    discount: FirebaseObjectObservable<Discount[]>;
    folder: any;

    constructor(private _af: AngularFire){
        this.folder = 'discountimages';
    }
    getUsers(user:string = null){
        if(user != null){
            this.users = this._af.database.list('/users/', {
                query: {
                    orderByChild: 'regUser',
                    equalTo: user
                }
            }) as 
            FirebaseListObservable<Users[]>
        } else {
            this.users = this._af.database.list('/users/') as 
            FirebaseListObservable<Users[]>
        }
        
        return this.users;
    }
   
    addUser(newUser){
        return this.users.push(newUser).then((item) => {
             console.log(item.key); 
            });
    }

    getCompany(company:string = null){
        if(company != null){
            this.company = this._af.database.list('/company/', {
                query: {
                    orderByChild: 'regUser',
                    equalTo: company
                }
            }) as 
            FirebaseListObservable<Company[]>
        } else {
            this.company = this._af.database.list('/company/') as 
            FirebaseListObservable<Company[]>
        }
        
        return this.company;
    }
   
    addCompany(newCompany){
        return this.company.push(newCompany).then((item) => {
            console.log(item.key); 
        });
    }

    getCompanyDiscounts(company_id:string = null){
        if(company_id != null){
			this.discounts = this._af.database.list('/discounts', {
				query: {
					orderByChild: 'company_id',
					equalTo: company_id
				}
			}) as
			FirebaseListObservable<Discount[]>
		} else{
			this.discounts = this._af.database.list('/discounts') as
			FirebaseListObservable<Discount[]>
		}
		return this.discounts;
    }

    getDiscounts(category:string = null){
        if(category != null){
			this.discounts = this._af.database.list('/discounts', {
				query: {
					orderByChild: 'category',
					equalTo: category
				}
			}) as
			FirebaseListObservable<Discount[]>
		} else{
			this.discounts = this._af.database.list('/discounts') as
			FirebaseListObservable<Discount[]>
		}
		return this.discounts;
    }
    getDiscountDetails(id){
        this.discount = this._af.database.object('/discounts/'+id) as FirebaseObjectObservable<Discount[]>
        return this.discount;
    }
    addDiscount(newDiscount){
        let storageRef = firebase.storage().ref();
        for(let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]){
            let path = `/${this.folder}/${selectedFile.name}`;
            let iRef = storageRef.child(path);
            iRef.put(selectedFile).then((snapshot) => {
                newDiscount.image = selectedFile.name;
                newDiscount.path = encodeURIComponent(path);
                return this.discounts.push(newDiscount).then((item) => {
                    console.log(item.key); 
                });
            });
        }
        /*
        return this.discounts.push(newDiscount).then((item) => {
            console.log(item.key); 
        });*/
    }
    updateDiscount(key, updDiscount){
		return this.discounts.update( key, updDiscount);
	}
    deleteDiscount(key){
		return this.discounts.remove( key );
	}
    getUserDiscounts(userID:string = null){
        if(userID != null){
			this.userdiscounts = this._af.database.list('/user-discounts', {
				query: {
					orderByChild: 'userID',
					equalTo: userID
				}
			}) as
			FirebaseListObservable<UserDiscount[]>
		} else{
			this.userdiscounts = this._af.database.list('/user-discounts') as
			FirebaseListObservable<UserDiscount[]>
		}
		return this.userdiscounts;
    }
    addUserDiscount(newUserDiscount){
        return this.userdiscounts.push(newUserDiscount);
    }
}