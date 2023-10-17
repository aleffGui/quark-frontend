import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/view/dashboard/dashboard.component';
import { TaskReadAllComponent } from './components/view/task/task-read-all/task-read-allcomponent';
import { TaskCreateComponent } from './components/view/task/task-create/task-create.component';
import { TaskUpdateComponent } from './components/view/task/task-update/task-update.component';
import { LoginComponent } from './components/view/login/login.component';
import { HomeComponent } from './components/view/home/home.component';

const routes: Routes = [
  {path: '', component: DashboardComponent, children: [
    {path: 'home', component: HomeComponent},
    {path: 'tarefas', component: TaskReadAllComponent},
    {path: 'tarefas/criar', component: TaskCreateComponent},
    {path: 'tarefas/editar/:id', component: TaskUpdateComponent}
  ]},
  {path: 'login', component: LoginComponent},
  { path: '**', redirectTo: 'home'},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
