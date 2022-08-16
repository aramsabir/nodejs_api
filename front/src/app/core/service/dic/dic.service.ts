import { Injectable } from '@angular/core';
import { WORDS } from './words';

@Injectable()
export class DicService {
  private selectedLanguage = 'en';

  constructor() {
    let lang = localStorage.getItem('language');
    if (lang == 'ku' || lang == 'ar' || lang == 'en')
      this.selectedLanguage = lang;
      // this.selectedLanguage = 'en';
    else {
      localStorage.setItem('language', 'en');
      localStorage.setItem('collapse_nav', 'true');
      localStorage.setItem('theme', 'light');
      localStorage.setItem('dir', 'ltr');
    }

    // localStorage.setItem('mode', 'false');

    // var l_mode = localStorage.getItem('mode');
    // var mode = l_mode == 'true' ? true : false;
  }

  translate(v: string): string {
    let tmp = WORDS.filter((item: any) => item.en === v);
    let tmp1: any = {};
    if (tmp[0]) tmp1 = tmp[0];

    if (tmp.length) {
      return tmp1[this.selectedLanguage];
    } else return '? ' + v + ' ?';
    // } else return v ;
  }

  setLanguage(v: any) {
    this.selectedLanguage = v;
    localStorage.setItem('language', v);
  }

  lang() {
    return this.selectedLanguage;
  }
}
