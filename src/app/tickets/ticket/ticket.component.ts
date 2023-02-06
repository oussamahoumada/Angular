import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';
import { Ticket } from '../../../models/ticket';
import { TicketService } from '../../../services/ticket/ticket.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  /**
   * Inputs & Output allow communication between parent & child components.
   * More information: https://angular.io/guide/component-interaction
   */
  @Input()
  ticket: Ticket;

  @Output()
  ticketHasBeenSelected: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  ticketHasBeendeleted: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  deleteTicket: EventEmitter<Ticket> = new EventEmitter<Ticket>();

  @Output()
  doArchive: EventEmitter<Ticket> = new EventEmitter<Ticket>();


  constructor(private service : TicketService) {
  }

  ngOnInit() {
  }

  selectTicket() {
    this.ticketHasBeenSelected.emit(true);
  }

  onClickDeleteTicket(ticket:Ticket) {
    this.ticketHasBeendeleted.emit(true);
    this.deleteTicket.emit(ticket);
  }

  addToArchive(ticket: Ticket) {
    this.doArchive.emit(ticket);
  }

}
