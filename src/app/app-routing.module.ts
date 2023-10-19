import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/view/dashboard/dashboard.component';
import { TaskReadAllComponent } from './components/view/task/task-read-all/task-read-allcomponent';
import { TaskCreateComponent } from './components/view/task/task-create/task-create.component';
import { TaskUpdateComponent } from './components/view/task/task-update/task-update.component';
import { LoginComponent } from './components/view/login/login.component';
import { HomeComponent } from './components/view/home/home.component';
import { UserReadAllComponent } from './components/view/user/user-read-all/user-read-all.component';
import { UserCreateComponent } from './components/view/user/user-create/user-create.component';
import { UserUpdateComponent } from './components/view/user/user-update/user-update.component';
import { AuthGuard } from './services/guard/auth.guard';

const routes: Routes = [
  {path: '', component: DashboardComponent, canActivate: [AuthGuard], children: [
    {path: 'home', component: HomeComponent},
    {path: 'tarefas', component: TaskReadAllComponent},
    {path: 'tarefas/criar', component: TaskCreateComponent},
    {path: 'tarefas/editar/:id', component: TaskUpdateComponent},
    {path: 'usuarios', component: UserReadAllComponent},
    {path: 'usuarios/criar', component: UserCreateComponent},
    {path: 'usuarios/editar/:id', component: UserUpdateComponent}
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
