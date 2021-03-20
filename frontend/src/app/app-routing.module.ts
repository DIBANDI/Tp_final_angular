import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionComponent } from './gestion/gestion.component';
import { DefaultComponent } from './default/default.component';
import { AssignmentComponent } from './gestion/assignment/assignment.component';
import { RenduComponent } from './gestion/rendu/rendu.component';
import { RetardComponent } from './gestion/retard/retard.component';
import { LoginComponent } from './gestion/auth/login/login.component';
import { SignupComponent } from './gestion/auth/signup/signup.component';
import { AuthGuard } from './services/auth-guard.service';
import { AddAssignmentComponent } from './gestion/add-assignment/add-assignment.component';
import { NoteAssignmentComponent } from './gestion/note-assignments/note-assignments.component';
import { EditAssignmentComponent } from './gestion/edit-assignment/edit-assignment.component';


const routes: Routes = [

  { path: 'gestion', component: GestionComponent,
    children: [
      { path: 'add-assignment', component: AddAssignmentComponent, canActivate: [AuthGuard] },
      { path: 'assignment', component: AssignmentComponent, canActivate: [AuthGuard] },
      { path: 'rendu', component: RenduComponent, canActivate: [AuthGuard] },
      { path: 'retard', component: RetardComponent, canActivate: [AuthGuard] },
      { path: 'edit-assignment/:id', component: EditAssignmentComponent, canActivate: [AuthGuard] },
      { path: 'note-assignment/:id', component:NoteAssignmentComponent, canActivate:[AuthGuard]},
      { path: 'auth/login', component: LoginComponent },
      { path: 'auth/signup', component: SignupComponent },
      { path: '', pathMatch: 'full', redirectTo: 'auth/login' },
      { path: '**', redirectTo: 'assignment' }
    ]
  },
  { path: 'default', component: DefaultComponent },
  { path: '', pathMatch: 'full', component: DefaultComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard
  ]
})
export class AppRoutingModule {}
