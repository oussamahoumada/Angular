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
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.studentService.find(this.id).subscribe(res => {
      this.student = res;
      this.notes = res.notes;
    });
  }

  public student: Student;
  readonly id: number;
  notes: string = "";

  ngOnInit() {
  }

  savechages() {
    let demo: any = {
      FirstName: this.student.FirstName,
      LastName: this.student.LastName,
      email: this.student.email,
      image: this.student.image,
      notes: this.notes
    }
    this.studentService.update(demo, this.id).subscribe(
      x => {
        console.log('Observer got a next value: ' + x);
        this.studentService.find(this.id).subscribe(
          res => this.student = res
        )
      },
      err => console.error('Observer got an error: ' + err),
      () => console.log('Observer got a complete notification')
    );
  }

}
