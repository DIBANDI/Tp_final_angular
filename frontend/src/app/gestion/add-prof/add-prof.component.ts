
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StateService } from '../../services/state.service';
import { ProfService } from '../../services/prof.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Prof } from '../../models/Prof.model';
import { mimeType } from '../mime-type.validator';
import {MatDatepickerModule} from '@angular/material';

@Component({
  selector: 'app-add-prof',
  templateUrl: './add-prof.component.html',
  styleUrls: ['./add-prof.component.scss']
})
export class AddProfComponent implements OnInit {

  public profForm: FormGroup;
  public loading = false;
  public gestion: number;
  public userId: string;
  public imagePreview: string;
  public errorMessage: string;

  constructor(private state: StateService,
              private formBuilder: FormBuilder,
              private profService: ProfService,
              private router: Router,
              private auth: AuthService) { }

  ngOnInit() {
    this.state.mode$.next('form');
    this.profForm = this.formBuilder.group({
      nom: [null, Validators.required],
      matiere: [null, Validators.required],
      image: [null, Validators.required, mimeType],
    });
    this.userId = this.auth.userId;
  }

  onSubmit() {
    this.loading = true;
    const prof = new Prof();
    prof.nom = this.profForm.get('nom').value;
    prof.matiere = this.profForm.get('matiere').value;
    prof.imageUrl = '';
    prof.userId = this.userId;
    this.profService.createNewprofWithFile(prof, this.profForm.get('image').value).then(
      () => {
        this.profForm.reset();
        this.loading = false;
        this.router.navigate(['/gestion/prof']);
      },
      (error) => {
        this.loading = false;
        this.errorMessage = error.message;
      }
    );
  }

  onImagePick(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.profForm.get('image').patchValue(file);
    this.profForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      if (this.profForm.get('image').valid) {
        this.imagePreview = reader.result as string;
      } else {
        this.imagePreview = null;
      }
    };
    reader.readAsDataURL(file);
  }
}

