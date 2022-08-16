import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiEndPoints, ApiMethod } from 'src/app/core/service/apis';
import { HttpService } from 'src/app/core/service/http/http.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  qparams : any = {}
  users: any = [];
  constructor(
    private httpService:HttpService,
    private route:ActivatedRoute
  ) { 
    this.route.queryParams.subscribe((qp:any )=>{
      this.qparams = qp
      this.getData()
    })
  }

  ngOnInit(): void {
  }

  getData(){
    this.httpService.call(ApiEndPoints.ListUsers,ApiMethod.GET,this.qparams,{}).subscribe((ptr:any)=>{
      this.users = ptr.data
      console.log(this.users);
      
    })
  }
}
