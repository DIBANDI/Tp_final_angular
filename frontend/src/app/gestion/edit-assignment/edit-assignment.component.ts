import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StateService } from '../../services/state.service';
import { AssignmentService } from '../../services/assignment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { mimeType } from '../mime-type.validator';
import { Assignment } from '../../models/Assignment.model';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.scss']
})
export class EditAssignmentComponent implements OnInit {
  public assignmentForm: FormGroup;
  public assignment: Assignment;
  public loading = false;
  public gestion: number;
  public userId: string;
  public imagePreview: string;
  public errorMessage: string;

  constructor(private state: StateService,
              private formBuilder: FormBuilder,
              private assignmentService: AssignmentService,
              private route: ActivatedRoute,
              private router: Router,
              private auth: AuthService) { }

  ngOnInit() {
    this.loading = true;
    this.state.mode$.next('form');
    this.userId = this.auth.userId;
    this.route.params.subscribe(
      (params) => {
        this.assignmentService.getassignmentById(params.id).then(
          (assignment: Assignment) => {
            this.assignment = assignment;
            this.assignmentForm = this.formBuilder.group({
              nom: [assignment.nom, Validators.required],
              dateRenduPrevu: [assignment.dateRenduPrevu, Validators.required],
              auteur: [assignment.auteur, Validators.required],
              image: [assignment.imageUrl, Validators.required, mimeType],
              remarques: [assignment.remarques],
              note: [assignment.note]
            });
            this.imagePreview = assignment.imageUrl;
            this.loading = false;
          }
        );
      }
    );
  }

  onSubmit() {
    this.loading = true;
    const assignment = new Assignment();
    assignment._id = this.assignment._id;
    assignment.nom = this.assignmentForm.get('nom').value;
    assignment.dateRenduPrevu = this.assignmentForm.get('dateRenduPrevu').value;
    assignment.auteur = this.assignmentForm.get('auteur').value;
    assignment.imageUrl = '';
    assignment.remarques = this.assignmentForm.get('remarques').value;
    assignment.note = this.assignmentForm.get('note').value;
    assignment.userId = this.userId;
    this.assignmentService.modifyassignmentWithFile(this.assignment._id, assignment, this.assignmentForm.get('image').value).then(
      () => {
        this.assignmentForm.reset();
        this.loading = false;
        this.router.navigate(['/gestion/assignment']);
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
    this.assignmentForm.get('image').patchValue(file);
    this.assignmentForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      if (this.assignmentForm.get('image').valid) {
        this.imagePreview = reader.result as string;
      } else {
        this.imagePreview = null;
      }
    };
    reader.readAsDataURL(file);
  }
}
