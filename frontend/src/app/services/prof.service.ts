import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Prof } from '../models/Prof.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfService {

  constructor(private http: HttpClient) {}
  private prof: Prof[] = [];
  public prof$ = new Subject<Prof[]>();

  getProf() {
    this.http.get('http://localhost:3000/api/prof').subscribe(
      (prof: Prof[]) => {
        if (prof) {
          this.prof = prof;
          this.emitProf();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  emitProf() {
    this.prof$.next(this.prof);
  }

  getprofById(id: string) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/api/prof/' + id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  createNewprof(prof: Prof) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/api/prof', prof).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  createNewprofWithFile(prof: Prof, image: File) {
    return new Promise((resolve, reject) => {
      const profData = new FormData();
      profData.append('prof', JSON.stringify(prof));
      profData.append('image', image, prof.nom);
      this.http.post('http://localhost:3000/api/prof', profData).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  modifyprof(id: string, prof: Prof) {
    return new Promise((resolve, reject) => {
      this.http.put('http://localhost:3000/api/prof/' + id, prof).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  modifyprofWithFile(id: string, prof: Prof, image: File | string) {
    return new Promise((resolve, reject) => {
      let profData: Prof | FormData;
      if (typeof image === 'string') {
        prof.imageUrl = image;
        profData = prof;
      } else {
        profData = new FormData();
        profData.append('prof', JSON.stringify(prof));
        profData.append('image', image, prof.nom);
      }
      this.http.put('http://localhost:3000/api/prof/' + id, profData).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  deleteprof(id: string) {
    return new Promise((resolve, reject) => {
      this.http.delete('http://localhost:3000/api/prof/' + id).subscribe(
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
