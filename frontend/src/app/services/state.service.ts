import { BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  public gestion$ = new BehaviorSubject<number>(0);
  public gestion = 0;
  public mode$ = new BehaviorSubject<string>('');
}
