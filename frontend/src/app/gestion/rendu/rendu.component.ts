
import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { AssignmentService } from '../../services/assignment.service';
import { Subscription } from 'rxjs';
import { Assignment } from '../../models/Assignment.model';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-rendu',
  templateUrl: './rendu.component.html',
  styleUrls: ['./rendu.component.scss']
})
export class RenduComponent implements OnInit {
  public assignment: Assignment[] = [];
  public gestion: number;
  public loading: boolean;
  private assignmentSub: Subscription;
  private gestionSub: Subscription;
  public userId: string;

  constructor(private state: StateService,
              private assignmentService: AssignmentService,
              private router: Router,
              ) { }

  ngOnInit() {
    this.loading = true;
    this.state.mode$.next('list');
    this.assignmentSub = this.assignmentService.assignment$.subscribe(
      (assignment) => {
        this.assignment = assignment;
        this.loading = false;
      }
    );
    this.gestionSub = this.state.gestion$.subscribe(
      (gestion) => {
        this.gestion = gestion;
      }
    );
    this.assignmentService.getAssignment();
  }



  onAdd() {
    if (this.gestion === 1) {
      this.router.navigate(['/gestion/add-assignment']);
    } 
  }



  onProductClicked(id: string) {
    if (this.gestion === 1) {
      this.router.navigate(['/gestion/assignment/' + id]);
    } 
  }


  /*onGoBack() {
    if (this.part === 1) {
      this.router.navigate(['/part-one/all-stuff']);
    } else if (this.part === 3) {
      this.router.navigate(['/part-three/all-stuff']);
    } else if (this.part === 4) {
      this.router.navigate(['/part-four/all-stuff']);
    }
  }*/

  onModify(id: string) {
    if (this.gestion === 1) {
      this.router.navigate(['/gestion/edit-assignment/' + id]);
    } 
  }

  onNote(id: string) {
    if (this.gestion === 1) {
      this.router.navigate(['/gestion/note-assignment/' + id]);
    } 
  }

  onDelete(id: string) {
    this.loading = true;
    this.assignmentService.deleteassignment(id).then(
      () => {
        this.loading = false;
        this.assignmentService.getAssignment();
      }
    );
  }

  ngOnDestroy() {
    this.assignmentSub.unsubscribe();
    this.gestionSub.unsubscribe();
  }

}
