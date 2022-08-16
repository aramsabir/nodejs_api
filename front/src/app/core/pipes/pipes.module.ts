import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { DicPipe } from './dic.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MDBBootstrapModulesPro, MDBSpinningPreloader } from 'ng-uikit-pro-standard';
import { DataTableComponent } from '../shared_components/data-table/data-table.component';
import { PaginationComponent } from '../shared_components/pagination/pagination.component';
import { NgZorroAntdModule } from './nz_ant_d.module';
import { HighchartsChartModule } from 'highcharts-angular';
import { GlobalService } from '../service/global/global.service';
import { DataTableTailwindComponent } from '../shared_components/data-table-tailwind/data-table.component';
import { ShowTableTailwindComponent } from '../shared_components/show-table-tailwind/data-table.component';
import { ShowAndSearchTableTailwindComponent } from '../shared_components/show_search-table-tailwind/data-table.component';
import { ShowAndSearchDateTableTailwindComponent } from '../shared_components/show_search_date-table-tailwind /data-table.component';


@NgModule({
  declarations: [
    DicPipe,
    DataTableComponent,
    DataTableTailwindComponent,
    ShowAndSearchTableTailwindComponent,
    ShowAndSearchDateTableTailwindComponent,
    PaginationComponent,
    ShowTableTailwindComponent
  ],
  imports: [
    CommonModule,
    HighchartsChartModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    MDBBootstrapModulesPro.forRoot(),
    IconsProviderModule,
   
  ],
  exports: [
    DicPipe,
    DataTableComponent,
    DataTableTailwindComponent,
    ShowAndSearchTableTailwindComponent,
    ShowAndSearchDateTableTailwindComponent,
    ShowTableTailwindComponent,
    CurrencyPipe,
    MDBBootstrapModulesPro,
    DatePipe,
    HighchartsChartModule,
    ToastrModule,
    FormsModule,
    ReactiveFormsModule,
    IconsProviderModule,
    NgZorroAntdModule,
  ],
  providers: [
    DatePipe,
    ToastrService,
    GlobalService,
    MDBSpinningPreloader,
  ]
})
export class PipesModule { }
