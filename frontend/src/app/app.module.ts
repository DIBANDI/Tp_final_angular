import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { GestionComponent } from './gestion/gestion.component';
import { DefaultComponent } from './default/default.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, 
         MatButtonToggleModule,
         MatIconModule,
         MatProgressSpinnerModule,
         MatDatepickerModule,
         MatInputModule, 
         MatNativeDateModule,
         MatSidenavModule,
         MatToolbarModule,
         MatListModule,
         MatCardModule,
         MatGridListModule
        } from '@angular/material';
import { LoginComponent } from './gestion/auth/login/login.component';
import { SignupComponent } from './gestion/auth/signup/signup.component';
import { AddAssignmentComponent } from './gestion/add-assignment/add-assignment.component';
import { EditAssignmentComponent } from './gestion/edit-assignment/edit-assignment.component';
import { NoteAssignmentComponent } from './gestion/note-assignments/note-assignments.component';
import { AssignmentComponent } from './gestion/assignment/assignment.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { ProfComponent } from './gestion/prof/prof.component';
import { AddProfComponent } from './gestion/add-prof/add-prof.component';
import { EditProfComponent } from './gestion/edit-prof/edit-prof.component';
import { RenduComponent } from './gestion/rendu/rendu.component';
import { RetardComponent } from './gestion/retard/retard.component';

@NgModule({
  declarations: [
    AssignmentComponent,
    AppComponent,
    GestionComponent,
    DefaultComponent,
    HeaderComponent,
    NoteAssignmentComponent,
    LoginComponent,
    SignupComponent,
    AddAssignmentComponent,
    EditAssignmentComponent,
    ProfComponent,
    AddProfComponent,
    EditProfComponent,
    RenduComponent,
    RetardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule, 
    MatButtonToggleModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatGridListModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
