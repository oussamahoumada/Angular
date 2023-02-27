import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TicketService } from '../../../services/ticket/ticket.service';
import { Ticket } from '../../../models/ticket';
import { Observable } from 'rxjs';
import { Student } from 'src/models/student';
import { StudentService } from 'src/services/student/student.service';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.scss']
})
export class TicketFormComponent implements OnInit {

  // Note: We are using here ReactiveForms to create our form. Be careful when you look for some documentation to
  // avoid TemplateDrivenForm (another type of form)
  /**
   * TicketForm: Object which manages the form in our component.
   * More information about Reactive Forms: https://angular.io/guide/reactive-forms
   */
  public ticketForm: FormGroup;
  public listMajor: string[] = ['POO', 'Web', 'Reseau'];
  public StudentsList$: Observable<Student[]>;

  constructor(public formBuilder: FormBuilder, public ticketService: TicketService, public studentService: StudentService) {
    // Form creation
    this.ticketForm = this.formBuilder.group({
      title: [''],
      description: [''],
      major: [''],
      studentId:""
    });

    this.StudentsList$ = this.studentService.getStudents();
    console.log("------------------");
    console.log(this.StudentsList$);
    console.log("------------------");
    //console.log(this.studentService.getStudents());

    /*this.studentService.getStudents().subscribe(re => {
      this.StudentsList = res;
    })*/

    // You can also add validators to your inputs such as required, maxlength or even create your own validator!
    // More information: https://angular.io/guide/reactive-forms#simple-form-validation
    // Advanced validation: https://angular.io/guide/form-validation#reactive-form-validation
  }

  ngOnInit() {

  }

  addTicket() {
    const ticketToCreate: Ticket = this.ticketForm.getRawValue() as Ticket;
    ticketToCreate.date = new Date();

    ticketToCreate.archived = false;
    this.ticketService.addTicket(ticketToCreate).subscribe(
      x => console.log('Observer got a next value: ' + x),
      err => console.error('Observer got an error: ' + err),
      () => console.log('Observer got a complete notification')
    );
  }

}
