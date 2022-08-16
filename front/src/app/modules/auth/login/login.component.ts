import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiEndPoints, ApiMethod } from 'src/app/core/service/apis';
import { HttpService } from 'src/app/core/service/http/http.service';
import { setItem, StorageItem } from 'src/app/core/utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {}
  constructor(
    private httpService:HttpService,
    private router:Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }


  login(){
    if(!this.model.email || !this.model.password){
      this.toastr.error( 'Please input user and password','Error', );
    }else
    this.httpService.call(ApiEndPoints.Login,ApiMethod.POST,{},this.model).subscribe((ptr:any)=>{
      if(ptr.success){
        setItem(StorageItem.Auth, { token:ptr.token})
        this.router.navigate(['/settings/user'],{queryParams:{skip:0,limit:20,sort:"full_name"}})
        this.toastr.success( ptr.message,'Notification');

      }else{
        this.toastr.warning( ptr.message,'Error');
      }
    })
  }
}
