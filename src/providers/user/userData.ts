import {Injectable} from "@angular/core";
import {Events} from "ionic-angular";
import { Storage } from '@ionic/storage';
// import {ResponseData} from '../api/responseData';
import {Utils} from '../utils/utils';
import {HttpUtils} from '../api/httpUtils';

@Injectable()
export class UserData {
  HAS_LOGGED_IN = "hasLoggedIn";
  private hasLogin = false;
  
  constructor(private events:Events, public storage:Storage,private httpUtils:HttpUtils,private utils:Utils) {
    
  }
/**
 * 用户登录
 * @param user 用户信息
 */
  login(user) {
    let payload = {
      identification: user.phone,
      password: user.password
    };
    let self = this;

    this.httpUtils.post("https://forum.growth.ren/api/token", payload)
      .then(
        (res:any) => {
          if(res.success){
            console.log('then');
            self.setUsername(user.phone);
            self.setToken(res.data.token);
            self.hasLogin = true;
            self.storage.set(this.HAS_LOGGED_IN, true);
            self.events.publish("user:login", true);
          }
        }).catch(res=>{
          console.log('catch throw');
          self.events.publish("user:login",false);
          this.utils.toast('登录失败');
        })
  }
/**
 * 注册
 * @param user
 */
  signup(user) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(user.phone);
    this.events.publish("user:signup");
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

  isLogin() {
    return this.hasLogin;
  };

  // return a promise
  hasLoggedIn() {
    let self = this;
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      self.hasLogin = value === "true";
      return self.hasLogin;
    });
  }
}
