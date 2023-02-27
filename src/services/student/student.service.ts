import { Student } from './../../models/student';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/index';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) {
  }

  readonly userAPIUrl: string = "http://localhost:9428/api/students";

  getStudents(): Observable<Student[]>{
    return this.http.get<Student[]>(this.userAPIUrl);
  }

  public find(ident: number): Observable<Student>{
    return this.http.get<Student>(this.userAPIUrl + ident);
  }

  public addStudent(student: Student):Observable<any> {
    return this.http.post<any>(this.userAPIUrl, student);
  }

  public deleteStudent(ident: number):Observable<any> {
    return this.http.delete<any>(this.userAPIUrl + "/" + ident);
  }

  public update(student: Student,id: number):Observable<any> {
    return this.http.put<any>(this.userAPIUrl + id, student);
  }

}
