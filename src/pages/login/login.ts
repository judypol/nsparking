import { Component } from '@angular/core';
// import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController,Events } from 'ionic-angular';
import { NgForm } from '@angular/forms';   //form验证
import {UserData} from '../../providers/providers';
// import{Utils} from '../../providers/providers';
import { MainPage } from '../pages';
// import {StorageService} from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { phone: string, password: string } = {
    phone: '',
    password: ''
  };
  submitted=false;

  constructor(public navCtrl: NavController,public user: UserData,private events:Events) {
  }

  // Attempt to login in through our User service
  doLogin(form:NgForm) {
    if(form.valid){
      this.submitted=false;
      this.loginAction();
    }else{
      this.submitted=true;
    }
  }
  private loginAction():void{
    if(this.user.isLogin()){
      this.navCtrl.push(MainPage);
    }else{
      this.user.login(this.account).then(()=>{
        this.events.subscribe("user:login",s=>{
          console.log(s);
          if(s){
            this.navCtrl.push(MainPage);
          }
        });
      });
    }
  }
}
