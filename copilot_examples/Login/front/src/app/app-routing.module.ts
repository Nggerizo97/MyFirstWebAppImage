import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OrdersComponent } from './components/orders/orders.component';

const routes: Routes = [
  { path:'', redirectTo: 'gallery', pathMatch:'full' },
  { path:'gallery', component: DashboardComponent },
  { path:'login', component: LoginComponent },
  { path:'singIn', component: SignInComponent },
  { path:'dashboard', component: DashboardComponent },
  { path:'orders', component: OrdersComponent },
  { path:'**', redirectTo: 'gallery', pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
