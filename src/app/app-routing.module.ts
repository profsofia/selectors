import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '',
   loadChildren: ()=>import('./countries/countries.module').then(module=>module.CountriesModule)
  }//()=>import('./auth/auth.module').then(modulo => modulo.AuthModule)
  ,{
    path:'**',
    redirectTo:''
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
