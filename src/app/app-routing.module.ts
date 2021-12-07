import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultsComponent } from './components/results/results.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: 'search', pathMatch: 'full', component: SearchComponent },
  { path: 'search/:query', component: ResultsComponent },
  { path: '', pathMatch: 'full', redirectTo: 'search' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }