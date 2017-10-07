import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserData} from '../../providers/providers';

@IonicPage()
@Component({
    templateUrl:'me.html'
})

export class MePage{
    constructor(public user:UserData){

    }
    /**
     * 簽到
     */
    sign(){
        this.user.sign();
    }
}