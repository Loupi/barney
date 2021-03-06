import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './components/index';

const appRoutes: Routes = [
  {
      path: '',
      redirectTo: 'search',
      pathMatch: 'full'
  },
  {
    path: 'search',
    component: SearchComponent,
    data: { 
      page: 1, 
      query: "", 
      hitsPerPage: 10
    }
  }
  // { path: '**', component: PageNotFoundComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });
