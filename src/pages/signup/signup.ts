import { Component } from '@angular/core';
import { IonicPage, NavController,Events } from 'ionic-angular';
import { NgForm } from '@angular/forms';   //form验证
import { UserData } from '../../providers/providers';
import { MainPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { userName: string, mobile: string, password: string,sex:boolean,checkPassword:string } = {
    userName: '',
    mobile: '',
    password: '',
    sex:true,
    checkPassword:'',
  };
  submitted:boolean=false;
  // Our translated text strings
  //private signupErrorString: string;

  constructor(public navCtrl: NavController,
    public user: UserData,public events:Events) {
  }

  doSignup(form:NgForm) {
    console.log(this.account);
    if(form.valid){
      this.submitted=false;
      this.user.signup(this.account);
      this.events.subscribe('user:signup',res=>{
        if(res.success){
          this.navCtrl.push(MainPage);
        }else{
  
        }
      });
  
      this.events.subscribe('user:signup:error',err=>{
  
      });
    }else{
      this.submitted=true;
    }
    
  }
}
