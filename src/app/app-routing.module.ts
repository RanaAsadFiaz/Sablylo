import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    loadChildren: 'src/app/features/loginRegistration/loginRegister.module#LoginRegisterModule',
  },
  {
    path: '**',
    loadChildren: 'src/app/features/core/core.module#CoreModule'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        enableTracing: false,
      }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
