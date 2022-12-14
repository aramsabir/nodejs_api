import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';   

@Injectable({providedIn: 'root'})
export class GlobalService {
 itemValue = new BehaviorSubject(this.theItem);

 set theItem( value:any) {
   this.itemValue.next(value); // this will make sure to tell every subscriber about the change.
   localStorage.setItem("theme", value);
 }

 get theItem() {
   return localStorage.getItem('theme');
 }
}