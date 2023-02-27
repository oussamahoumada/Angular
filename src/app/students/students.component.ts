import { Component, OnInit, Input } from '@angular/core';
import { StudentService } from '../../services/student/student.service';
import { Student } from '../../models/student';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  constructor(private studentService: StudentService) {
    this.studentList$ = this.studentService.getStudents();
   }

  public studentList$: Observable<Student[]>;

  ngOnInit() {
    this.closeModal2();
  }

  addStudent(student: Student) {
    this.studentService.addStudent(student).subscribe(
      x => {
        console.log('Observer got a next value: ' + x);
        this.studentList$ = this.studentService.getStudents();
        this.closeModal();
      },
      err => console.error('Observer got an error: ' + err),
      () => console.log('Observer got a complete notification')
    );
  }

  deleteStudent(id: number) {
    if (confirm(`Delete Student ${id} `)) {
      this.studentService.deleteStudent(id).subscribe(
        x => {
          console.log('Observer got a next value: ' + x);
          this.studentList$ = this.studentService.getStudents();
        },
        err => console.error('Observer got an error: ' + err),
        () => console.log('Observer got a complete notification')
      );
    }
  }

  showModal() {
    let modal = document.getElementById("myModal");
    modal.style.display = "block";
  }

  closeModal() {
    let modal = document.getElementById("myModal");
    modal.style.display = "none";
  }
  closeModal2() {
    let modal = document.getElementById("myModal");
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }

}
