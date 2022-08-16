import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from 'src/app/core/guards';
import { RoleComponent } from './role/role.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path:'',redirectTo:'users'},
  { path: 'users',canActivate:[RoleGuard],data:{expectedRole:'user:read'}, component: UsersComponent },
  { path: 'roles',canActivate:[RoleGuard],data:{expectedRole:'role:read'}, component: RoleComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
