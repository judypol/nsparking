import { Injectable } from "@angular/core";
import { Events } from "ionic-angular";
import { Storage } from '@ionic/storage';
// import {ResponseData} from '../api/responseData';
import { Utils } from '../utils/utils';
import { HttpUtils } from '../api/httpUtils';
import { AppConfiguration } from '../api/appConfiguration';
// import {UserInfo} from '../../models/userInfo';

@Injectable()
export class UserData {
  HAS_LOGGED_IN = "hasLoggedIn";
  private hasLogin = false;

  constructor(private events: Events, public storage: Storage, private httpUtils: HttpUtils, private utils: Utils) {

  }
  /**
   * 用户登录
   * @param user 用户信息
   */
  login(user) {
    let payload = {
      mobile: user.phone,
      password: user.password
    };
    let self = this;
    let loginUrl = AppConfiguration.getApiUrl() + "/account/login";
    this.httpUtils.post(loginUrl, payload)
      .then(
      (res: any) => {
        if (res.success) {
          self.setUserInfo(res.data);
          self.setUsername(user.userName);
          self.setToken(res.data.token);
          self.hasLogin = true;
          self.storage.set(this.HAS_LOGGED_IN, true);
          self.events.publish("user:login", true);
        }
      }).catch(res => {
        self.events.publish("user:login", false);
        this.utils.toast('登录失败');
      })
  }
  /**
   * 注册
   * @param user
   */
  signup(user) {
    let self = this;
    let singupUrl = AppConfiguration.getApiUrl() + "/account/signup";
    this.httpUtils.post(singupUrl, user)
      .then((res: any) => {
        if (res.success) {
          self.setUserInfo(res);
          self.setUsername(user.userName);
          self.setToken(res.data.token);
          self.hasLogin = true;
          self.storage.set(this.HAS_LOGGED_IN, true);

          this.utils.toast('注册成功');
        } else {
          this.utils.toast(res.message);
        }
        this.events.publish("user:signup", res);
      })
      .catch(err => {
        this.utils.toast('网络请求有问题');
        this.events.publish("user:signup:error", err);
      })
  }
  /**
   * 签到
   */
  sign(){
    //let user:any={};
    this.getUserInfo().then(user=>{
      if(user.mobile){
        this.getUserSign().then(v=>{
          let signUrl=AppConfiguration.getApiUrl()+'/account/sign';
          
          if(v!=null&&v.signDate==this.utils.formatDate(new Date)){ //已经签到过了，不能再签到
            this.utils.toast('今天已经签到了')
            return;
          }

          if(v==null||v.day==7||
            this.utils.addDay(v.date,v.day)!=this.utils.formatDate(new Date)){
            v={date:this.utils.formatDate(new Date),day:1,signDate:this.utils.formatDate(new Date)};
          }else{
            v.day+=1;
          }
          let score=1;
          if(v.day==7){
            score=3;
          }
          v.signDate=this.utils.formatDate(new Date);
    
          this.httpUtils.post(signUrl,{mobile:user.mobile,score:score})
            .then(res=>{
              if(res.success){
                this.setUserInfo(res.data);    //更新用户信息
                this.setUserSign(JSON.stringify(v));   //保存用户信息
              }else{
                this.utils.toast('签到失败');
              }
            })
            .catch(err=>{
              this.utils.toast('签到失败');
            });
        })
      }
    })
  }
  /**
   * 退出登录
   */
  logout() {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove("token");
    this.storage.remove("username");
    this.events.publish("user:logout");
  }

  setToken(token) {
    this.storage.set("token", token);
  }

  getToken() {
    return this.storage.get("token").then((value) => {
      return value;
    });
  }

  setUsername(username) {
    this.storage.set("username", username);
  }

  getUsername() {
    return this.storage.get("username").then((value) => {
      return value;
    });
  }
/**
 * 将用户信息保存到本地存储中
 * @param userInfo 
 */
  setUserInfo(userInfo:any){
    this.storage.set("user",JSON.stringify(userInfo));
  }
  /**
   * 获取本地用户信息
   */
  getUserInfo(){
    return this.storage.get("user").then(value=>{
      return JSON.parse(value);
    });
  }
  /**
   * 将签到信息保存到本地db
   * @param signInfo ({date:'',day:1})
   */
  setUserSign(signInfo){
    this.storage.set("sign",signInfo);
  }
  /**
   * 获取签到信息（{date:'',day:1}）
   */
  getUserSign():any{
    return this.storage.get("sign").then(v=>{
      return JSON.parse(v);
    })
  }

  isLogin() {
    return this.hasLogin;
  };

  // return a promise
  hasLoggedIn() {
    let self = this;
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      self.hasLogin = value === true;
      return self.hasLogin;
    });
  }
}
