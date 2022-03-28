import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddInternComponent } from './add-intern/add-intern.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'addIntern',
    component: AddInternComponent,
    children: [
      {
        path: ':internId',
        component: AddInternComponent,
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
