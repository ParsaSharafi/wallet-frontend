import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CrudComponent } from './component/crud/crud.component';
import { LoginComponent } from './component/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: CrudComponent
  },
  {
    path: 'transactions',
    component: LoginComponent
  }
];
