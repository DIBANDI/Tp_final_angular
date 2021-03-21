import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StateService } from '../../services/state.service';
import { ProfService } from '../../services/prof.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { mimeType } from '../mime-type.validator';
import { Prof } from '../../models/Prof.model';

@Component({
  selector: 'app-edit-prof',
  templateUrl: './edit-prof.component.html',
  styleUrls: ['./edit-prof.component.scss']
})
export class EditProfComponent implements OnInit {
  public profForm: FormGroup;
  public prof: Prof;
  public loading = false;
  public gestion: number;
  public userId: string;
  public imagePreview: string;
  public errorMessage: string;

  constructor(private state: StateService,
              private formBuilder: FormBuilder,
              private profService: ProfService,
              private route: ActivatedRoute,
              private router: Router,
              private auth: AuthService) { }

  ngOnInit() {
    this.loading = true;
    this.state.mode$.next('form');
    this.userId = this.auth.userId;
    this.route.params.subscribe(
      (params) => {
        this.profService.getprofById(params.id).then(
          (prof: Prof) => {
            this.prof = prof;
            this.profForm = this.formBuilder.group({
              nom: [prof.nom, Validators.required],
              matiere: [prof.matiere, Validators.required],
              image: [prof.imageUrl, Validators.required, mimeType],
            });
            this.imagePreview = prof.imageUrl;
            this.loading = false;
          }
        );
      }
    );
  }

  onSubmit() {
    this.loading = true;
    const prof = new Prof();
    prof._id = this.prof._id;
    prof.nom = this.profForm.get('nom').value;
    prof.matiere = this.profForm.get('matiere').value;
    prof.imageUrl = '';
    prof.userId = this.userId;
    this.profService.modifyprofWithFile(this.prof._id, prof, this.profForm.get('image').value).then(
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
    console.log(file);
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

