import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('src/app/features/loginRegistration/loginRegister.module').then(m => m.LoginRegisterModule)
  },
  {
    path: '**',
    loadChildren: () => import('src/app/features/core/core.module').then(m => m.CoreModule)
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
