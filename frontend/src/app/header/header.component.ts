import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StateService } from '../services/state.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public mode: string;
  public gestion: number;
  public partString: string;
  public isAuth: boolean;

  private modeSub: Subscription;
  private gestionSub: Subscription;
  private isAuthSub: Subscription;

  constructor(private state: StateService,
              private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.modeSub = this.state.mode$.subscribe(
      (mode) => {
        this.mode = mode;
      }
    );
    this.gestionSub = this.state.gestion$.subscribe(
      (gestion) => {
        this.gestion = gestion;
        switch (gestion) {
          case 1:
            this.partString = 'gestion';
            break;
          default:
            break;
        }
      }
    );
    this.isAuthSub = this.auth.isAuth$.subscribe(
      (auth) => {
        this.isAuth = auth;
      }
    );
  }

  onLogout() {
    this.auth.logout();
    this.router.navigate(['/' + this.partString + '/auth/login']);
  }

  onBackToParts() {
    this.router.navigate(['/default']);
  }

  ngOnDestroy() {
    this.modeSub.unsubscribe();
    this.gestionSub.unsubscribe();
    this.isAuthSub.unsubscribe();
  }

}
