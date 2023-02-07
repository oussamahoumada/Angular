import { Student } from './../../models/student';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/index';
import { Students_Mock } from 'src/mocks/students.mock';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) {
  }

  readonly userAPIUrl = "https://api.myjson.com/bins/ck44c";

   private studentList: Student[] = Students_Mock;
  public tickets$: BehaviorSubject<Student[]> = new BehaviorSubject(this.studentList);

  getUserList(): Observable<Student[]> {
    return this.http.get<Student[]>(this.userAPIUrl);
  }

  public getStudents(): Student[]{
    return this.studentList;
  }

  public find(ident: number): Student{
    return Students_Mock.find(({ id }) => id == ident);
  }

  public addStudent(student: Student) {
    this.studentList.push(student);
  }

  deleteStudent(ident : number) {
    this.studentList.forEach((item, index) => {
      if (item.id == ident) {
        this.studentList.splice(index,1);
      }
    });
  }

}
