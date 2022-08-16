import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { UsersComponent } from './users/users.component';
import { RoleComponent } from './role/role.component';
import { SettingComponent } from './setting.component';


@NgModule({
  declarations: [
    UsersComponent,
    RoleComponent,
    SettingComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
