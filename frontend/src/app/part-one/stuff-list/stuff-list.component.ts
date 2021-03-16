import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { StuffService } from '../../services/stuff.service';
import { Subscription } from 'rxjs';
import { Assignment } from '../../models/Assignment.model';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-stuff-list',
  templateUrl: './stuff-list.component.html',
  styleUrls: ['./stuff-list.component.scss']
})
export class StuffListComponent implements OnInit, OnDestroy {

  public stuff: Assignment[] = [];
  public part: number;
  public loading: boolean;
  private stuffSub: Subscription;
  private partSub: Subscription;
  public assignment: Assignment;
  public userId: string;


  constructor(private state: StateService,
              private stuffService: StuffService,
              private router: Router,
              ) { }

  ngOnInit() {
    this.loading = true;
    this.state.mode$.next('list');
    this.stuffSub = this.stuffService.stuff$.subscribe(
      (stuff) => {
        this.stuff = stuff;
        this.loading = false;
      }
    );
    this.partSub = this.state.part$.subscribe(
      (part) => {
        this.part = part;
      }
    );
    this.stuffService.getStuff();
  }



  onAdd() {
    if (this.part === 1) {
      this.router.navigate(['/part-one/new-assignment']);
    } else if (this.part === 3) {
      this.router.navigate(['/part-three/new-assignment']);
    } else if (this.part === 4) {
      this.router.navigate(['/part-four/new-assignment']);
    }
  }



  onProductClicked(id: string) {
    if (this.part === 1) {
      this.router.navigate(['/part-one/assignment/' + id]);
    } else if (this.part === 3) {
      this.router.navigate(['/part-three/assignment/' + id]);
    } else if (this.part === 4) {
      this.router.navigate(['/part-four/assignment/' + id]);
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
    switch (this.part) {
      case 1:
      case 2:
        this.router.navigate(['/part-one/modify-assignment/' + id]);
        break;
      case 3:
        this.router.navigate(['/part-three/modify-assignment/' + id]);
        break;
      case 4:
        this.router.navigate(['/part-four/edit-assignment/' + id]);
        break;
    }
  }

  onNote(id: string) {
    switch (this.part) {
      case 1:
      case 2:
        this.router.navigate(['/part-one/modify-assignment/' + id]);
        break;
      case 3:
        this.router.navigate(['/part-three/modify-assignment/' + id]);
        break;
      case 4:
        this.router.navigate(['/part-four/note-assignments/' + id]);
        break;
    }
  }

  onDelete(id: string) {
    this.loading = true;
    this.stuffService.deleteassignment(id).then(
      () => {
        this.loading = false;
        this.stuffService.getStuff();
      }
    );
  }

  ngOnDestroy() {
    this.stuffSub.unsubscribe();
    this.partSub.unsubscribe();
  }

}
