import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { Nav2Component } from './nav2/nav2.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  {path : 'login' , component: LoginComponent } ,
{path : 'nav' , component: Nav2Component , children: [{path: 'table' , component: TableComponent}] } ,
{path : 'logivn' , component: LoginComponent } ,

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
