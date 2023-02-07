import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../../services/ticket/ticket.service';
import { Ticket } from '../../../models/ticket';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {

  public ticketList: Ticket[] = [];
  public displayTicketArchived: boolean;

  constructor(public ticketService: TicketService) {
    this.displayTicketArchived = false;
    this.ticketService.tickets$.subscribe((tickets) => this.ticketList = tickets);
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
}
