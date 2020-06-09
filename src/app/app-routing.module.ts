import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomepageComponent } from './components/homepage/homepage.component';
import { ResultSearchComponent } from './components/result-search/result-search.component';
import {NotFoundComponent} from './components/not-found/not-found.component';

import { AuthGuard } from './components/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    pathMatch: 'full'
  },
  {
    path: 'result',
    component: ResultSearchComponent,
  },
  // Routes Auth
  { path: 'auth', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule)},

  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
