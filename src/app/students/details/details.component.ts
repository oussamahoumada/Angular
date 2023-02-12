import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../services/student/student.service';
import { Student } from '../../../models/student';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(private studentService: StudentService, private route: ActivatedRoute) { }

  public student: Student;
  notes: string = "";

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.student = this.studentService.find(id);
  }

  savechages() {
    this.student.notes = this.notes;
    this.student = this.studentService.update(this.student);
  }

}
