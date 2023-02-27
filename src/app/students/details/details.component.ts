import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../services/student/student.service';
import { Student } from '../../../models/student';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(private studentService: StudentService, private route: ActivatedRoute) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.studentService.find(id).subscribe(res => {
      this.student = res;
    });
  }

  public student: Student;
  notes: string = "";

  ngOnInit() {
  }

  savechages() {
    let id: number;

    this.student.notes = this.notes;
    id = this.student.id;

    this.studentService.update(this.student, id).subscribe(res => {
      this.student = res;
    });
  }

}
