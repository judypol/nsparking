import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController, Platform } from 'ionic-angular';
import {UserData} from '../../providers/providers';

export interface Slide {
  title: string;
  description: string;
  image: string;
}

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  slides: Slide[];
  showSkip = true;
  //dir: string = 'ltr';

  constructor(public navCtrl: NavController, public menu: MenuController,public user:UserData, public platform: Platform) {
    
        this.slides = [
          {
            title: "",
            description: "",
            image: 'assets/img/ica-slidebox-img-1.jpg',
          },
          {
            title: "",
            description: "",
            image: 'assets/img/ica-slidebox-img-2.jpg',
          },
          {
            title: "",
            description: "",
            image: 'assets/img/ica-slidebox-img-3.jpg',
          }
        ];
  }

  startApp() {
    this.user.hasLoggedIn().then(flag=>{
      if(flag){
        this.navCtrl.setRoot('TabsPage',{},{
          animate:true,
          direction:'forward'
        });
      }else{
        this.navCtrl.setRoot('WelcomePage', {}, {
          animate: true,
          direction: 'forward'
        });
      }
    })
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd();
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }
}
