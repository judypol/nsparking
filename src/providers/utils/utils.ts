import { ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';

/*
注入必须添加@Injectable()，并且只有构造函数注入一种方式
*/
@Injectable()
export class Utils{
    constructor(private toastCtrl:ToastController){
    }

    toast(message:string):void{
        let toast =this.toastCtrl.create({
            message: message,
            duration: 3000,
          });
          toast.present();
    }
}