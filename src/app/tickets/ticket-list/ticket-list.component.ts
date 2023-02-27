import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../../services/ticket/ticket.service';
import { Ticket } from '../../../models/ticket';
import { Student } from '../../../models/student';
import { StudentService } from '../../../services/student/student.service';
import { Observable } from 'rxjs';
import { tick } from '@angular/core/src/render3';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {

  public ticketList: Ticket[];
  public displayTicketArchived: boolean;
  public students: Student[];
  public fullName: string;
  public studentToDelete: Student;

  constructor(private ticketService: TicketService, private studentService: StudentService) {

    this.displayTicketArchived = false;
    this.ticketService.getTickets().subscribe((tickets) => {
      this.ticketList = (<Ticket[]>tickets);
    });

    this.getTop5();
  }

  /*
    isNotArchived(element:Ticket, index, array:Ticket[]) {
      return (element.archived == false);
    }
  */

  ngOnInit() {
  }

  ticketHasBeenSelected(hasBeenSelected: boolean) {
    console.log('event received from child:', hasBeenSelected);
  }

  ticketHasBeendeleted(hasBeendeleted: boolean) {
    console.log("Delete : " + hasBeendeleted);
  }

  deleteTicket(ticket : Ticket) {
    if (confirm(` ticket ~~${ticket.title}~~ will be deleted `)) {
      this.ticketService.deleteTicket(ticket).subscribe(
        x => console.log('Observer got a next value: ' + x),
        err => console.error('Observer got an error: ' + err),
        () => console.log('Observer got a complete notification')
      );
      alert("delete success !!");
    }

    this.ticketService.getTickets().subscribe((tickets) => {
      this.ticketList = (<Ticket[]>tickets);
    });
  }

  addSuccess(b:boolean) {
    this.ticketService.getTickets().subscribe((tickets) => {
      this.ticketList = (<Ticket[]>tickets);
    });
  }

  doArchive(ticket: Ticket) {
    let demo: any = {
      title: ticket.title,
      description: ticket.description,
      date: ticket.date,
      studentId: ticket.studentId,
      major: ticket.major,
      archived: true
    }

    this.ticketService.archiveTicket(demo,ticket.id).subscribe(
      x => {
        console.log('Observer got a next value: ' + x);
        this.addSuccess(true);
      },
      err => console.error('Observer got an error: ' + err),
      () => console.log('Observer got a complete notification')
    );

    //this.ticketService.tickets$.subscribe((tickets) => this.ticketList = tickets.filter(this.isNotArchived));
  }

  ShowarchivedTickets() {
    this.displayTicketArchived = true;
  }

  HideArchivedTickets() {
    this.displayTicketArchived = false;
  }

  filterclick(mot: string) {
    this.studentService.getStudents().subscribe(resultat => {
      if (mot!='' && mot!=null) {
        let result: Student[] = [];
        resultat.filter((res) => {
          if (res.FirstName.includes(mot) || res.LastName.includes(mot)) {
            result.push(res);
          }
        });
        this.students = result.slice(0, 5);
        console.log('result => ' + result);
      }
      else {
        this.getTop5();
      }
    });
  }

  getTop5(){
    this.studentService.getStudents().subscribe(
      res => {
        this.students = (<Student[]>res).slice(0,5);
      },
      err => {
        console.log("erreur de recuperation !!! : " + err);
      }
    );
  }

  showStudentSelected() {
    let dv = document.getElementById('filter');
    let fn: string = (<HTMLInputElement>document.getElementById("fullName")).value;
    if (fn != '' && fn != null) {
      this.studentService.getStudents().subscribe(res => {
        res.filter((res) => {
          if (fn.includes(res.FirstName) && fn.includes(res.LastName)) {
            this.studentToDelete = res;
            dv.style.display = 'none';
          }
        });
      })
    }
  }

  doDelete(studentToDelete: Student) {
    this.studentService.deleteStudent(studentToDelete.id).subscribe(
      x => console.log('Observer got a next value: ' + x),
      err => console.error('Observer got an error: ' + err),
      () => console.log('Observer got a complete notification')
    );
    let filterDiv = document.getElementById('filter');
    filterDiv.style.display = 'block';
    this.fullName = "";
    this.studentToDelete = null;
  }
}
