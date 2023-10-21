import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/template/header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NavComponent } from './components/template/nav/nav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/template/footer/footer.component';
import { DashboardComponent } from './components/view/dashboard/dashboard.component';
import { TaskReadAllComponent } from './components/view/task/task-read-all/task-read-allcomponent';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { TaskCreateComponent } from './components/view/task/task-create/task-create.component';
import { TaskFormComponent } from './components/template/task/task-form/task-form.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ToastrModule } from 'ngx-toastr';
import { TaskUpdateComponent } from './components/view/task/task-update/task-update.component';
import { ConfirmModalComponent } from './components/template/modal/confirm-modal/confirm-modal.component';
import { TaskDetailsModalComponent } from './components/template/modal/information-modal/task-details-modal.component';
import { TaskFilterFormComponent } from './components/template/task/task-filter-form/task-filter-form.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoginComponent } from './components/view/login/login.component';
import { HomeComponent } from './components/view/home/home.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { UserReadAllComponent } from './components/view/user/user-read-all/user-read-all.component';
import { UserFilterFormComponent } from './components/template/user/user-filter-form/user-filter-form.component';
import { UserFormComponent } from './components/template/user/user-form/user-form.component';
import { UserCreateComponent } from './components/view/user/user-create/user-create.component';
import { UserUpdateComponent } from './components/view/user/user-update/user-update.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    FooterComponent,
    DashboardComponent,
    TaskReadAllComponent,
    TaskCreateComponent,
    TaskFormComponent,
    TaskUpdateComponent,
    ConfirmModalComponent,
    TaskDetailsModalComponent,
    TaskFilterFormComponent,
    LoginComponent,
    HomeComponent,
    UserReadAllComponent,
    UserFilterFormComponent,
    UserFormComponent,
    UserCreateComponent,
    UserUpdateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    NgbTooltipModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    ToastrModule.forRoot(),
    NgxPaginationModule
  ],
  providers: [DatePipe, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
