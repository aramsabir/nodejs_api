import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { DicPipe } from './dic.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgZorroAntdModule } from './nz_ant_d.module';
import { GlobalService } from '../service/global/global.service';


@NgModule({
  declarations: [
    DicPipe,
  ],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
   
  ],
  exports: [
    DicPipe,
    CurrencyPipe,
    DatePipe,
    ToastrModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
  ],
  providers: [
    DatePipe,
    ToastrService,
    GlobalService,
  ]
})
export class PipesModule { }
