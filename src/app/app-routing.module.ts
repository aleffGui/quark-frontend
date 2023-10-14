import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/view/dashboard/dashboard.component';
import { TaskReadComponent } from './components/view/task/task-read-all/task-read-allcomponent';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent, children: [
    {path: 'tarefas', component: TaskReadComponent}
  ]},
  { path: '**', redirectTo: 'dashboard'},
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
