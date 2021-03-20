import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { ProfService } from '../../services/prof.service';
import { Subscription } from 'rxjs';
import { Prof } from '../../models/Prof.model';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-prof',
  templateUrl: './prof.component.html',
  styleUrls: ['./prof.component.scss']
})
export class ProfComponent implements OnInit {

  public prof: Prof[] = [];
  public gestion: number;
  public loading: boolean;
  private profSub: Subscription;
  private gestionSub: Subscription;
  //public assignment: Assignment;
  public userId: string;


  constructor(private state: StateService,
              private profService: ProfService,
              private router: Router,
              ) { }

  ngOnInit() {
    this.loading = true;
    this.state.mode$.next('list');
    this.profSub = this.profService.prof$.subscribe(
      (prof) => {
        this.prof = prof;
        this.loading = false;
      }
    );
    this.gestionSub = this.state.gestion$.subscribe(
      (gestion) => {
        this.gestion = gestion;
      }
    );
    this.profService.getProf();
  }


  onAdd() {
    if (this.gestion === 1) {
      this.router.navigate(['/gestion/new-assignment']);
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
      this.router.navigate(['/gestion/assignment/' + id]);
    } 
  }

  onNote(id: string) {
    if (this.gestion === 1) {
      this.router.navigate(['/gestion/assignment/' + id]);
    } 
  }

  onDelete(id: string) {
    this.loading = true;
    this.profService.deleteprof(id).then(
      () => {
        this.loading = false;
        this.profService.getProf();
      }
    );
  }

  ngOnDestroy() {
    this.profSub.unsubscribe();
    this.gestionSub.unsubscribe();
  }

}