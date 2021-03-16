import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { StateService } from '../../../services/state.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  loading = false;
  errorMessage: string;
  hide = true;

  
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  getErroremailMessage() {
    if (this.email.hasError('required')) {
      return 'Veillez entrer un Mail Valide';
    }
    return this.email.hasError('email') ? 'Email invalide' : '';
  }

  getErrorpasswordMessage() {
    if (this.password.hasError('required')) {
      return 'Veillez entrer un Password Valide';
    }

    return this.email.hasError('password') ? 'Mot de passe invalide' : '';
  }

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private auth: AuthService,
              private state: StateService) { }

  ngOnInit() {
    this.state.mode$.next('form');
    this.signupForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  onSignup() {
    this.loading = true;
    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;
    this.auth.createNewUser(email, password).then(
      () => {
        this.loading = false;
        if (this.state.part === 3) {
          this.router.navigate(['/part-three/all-stuff']);
        } else if (this.state.part === 4) {
          this.router.navigate(['/part-four/all-stuff']);
        }
      }
    ).catch(
      (error) => {
        this.loading = false;
        this.errorMessage = error.message;
      }
    );
  }
}
