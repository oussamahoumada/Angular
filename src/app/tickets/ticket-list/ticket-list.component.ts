import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../../services/ticket/ticket.service';
import { Ticket } from '../../../models/ticket';
import { Student } from '../../../models/student';
import { StudentService } from '../../../services/student/student.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {

  public ticketList: Ticket[] = [];
  public displayTicketArchived: boolean;
  public students: Student[];
  public fullName: string;
  public studentToDelete: Student;


  constructor(private ticketService: TicketService, private studentService: StudentService) {
    this.displayTicketArchived = false;
    this.ticketService.tickets$.subscribe((tickets) => this.ticketList = tickets);
    this.students = this.getTop5();
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
      this.ticketService.deleteTicket(ticket);
      alert("delete success !!");
    }
  }

  doArchive(ticket: Ticket) {
    this.ticketService.archiveTicket(ticket);
    this.displayTicketArchived = false;
    //this.ticketService.tickets$.subscribe((tickets) => this.ticketList = tickets.filter(this.isNotArchived));
  }

  ShowarchivedTickets() {
    this.displayTicketArchived = true;
  }

  HideArchivedTickets() {
    this.displayTicketArchived = false;
  }

  filterclick(mot: string) {
    let studentList: Student[] = this.studentService.getStudents();
    if (mot!='' && mot!=null) {
      let result: Student[] = [];
      studentList.filter((res) => {
        if (res.nom.includes(mot) || res.prenom.includes(mot)) {
          result.push(res);
        }
      });
      this.students = result.slice(0, 5);
      console.log('result => ' + result);
    }
    else {
      this.students = this.getTop5();
    }
  }

  getTop5(): Student[] {
    return this.studentService.getStudents().slice(0, 5);
  }

  showStudentSelected() {
    let dv = document.getElementById('filter');
    let fn: string = (<HTMLInputElement>document.getElementById("fullName")).value;
    if (fn != '' && fn != null) {
      let studentList: Student[] = this.studentService.getStudents();
      studentList.filter((res) => {
        if (fn.includes(res.nom) && fn.includes(res.prenom)) {
          this.studentToDelete = res;
        }
      });
    }
    if (this.studentToDelete == null) {
      return;
    }
    dv.style.display = 'none';
  }
  doDelete(studentToDelete: Student) {
    this.studentService.deleteStudent(studentToDelete.id);
    let filterDiv = document.getElementById('filter');
    filterDiv.style.display = 'block';
    this.fullName = "";
    this.studentToDelete = null;
  }
}
