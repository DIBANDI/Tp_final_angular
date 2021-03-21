import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Assignment } from '../models/Assignment.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  constructor(private http: HttpClient) {}
  private assignment: Assignment[] = [];
  public assignment$ = new Subject<Assignment[]>();

  getAssignment() {
    this.http.get('http://localhost:3000/api/assignment').subscribe(
      (assignment: Assignment[]) => {
        if (assignment) {
          this.assignment = assignment;
          this.emitAssignment();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  emitAssignment() {
    this.assignment$.next(this.assignment);
  }

  getassignmentById(id: string) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/api/assignment/' + id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  createNewassignment(assignment: Assignment) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/api/assignment', assignment).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  createNewassignmentWithFile(assignment: Assignment, image: File) {
    return new Promise((resolve, reject) => {
      const assignmentData = new FormData();
      assignmentData.append('assignment', JSON.stringify(assignment));
      assignmentData.append('image', image, assignment.nom);
      this.http.post('http://localhost:3000/api/assignment', assignmentData).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  modifyassignment(id: string, assignment: Assignment) {
    return new Promise((resolve, reject) => {
      this.http.put('http://localhost:3000/api/assignment/' + id, assignment).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  modifyassignmentWithFile(id: string, assignment: Assignment, image: File | string) {
    return new Promise((resolve, reject) => {
      let assignmentData: Assignment | FormData;
      if (typeof image === 'string') {
        assignment.imageUrl = image;
        assignmentData = assignment;
      } else {
        assignmentData = new FormData();
        assignmentData.append('assignment', JSON.stringify(assignment));
        assignmentData.append('image', image, assignment.nom);
      }
      this.http.put('http://localhost:3000/api/assignment/' + id, assignmentData).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  deleteassignment(id: string) {
    return new Promise((resolve, reject) => {
      this.http.delete('http://localhost:3000/api/assignment/' + id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}