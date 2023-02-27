import { Injectable } from '@angular/core';
import { Ticket } from '../../models/ticket';
import { BehaviorSubject } from 'rxjs/index';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tick } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  readonly ticketAPIUrl: string = "http://localhost:9428/api/tickets/";


  /**
   * Observable which contains the list of the tickets.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */

  constructor(private http: HttpClient) {
  }

  getTickets():Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.ticketAPIUrl);
  }

  findTicket(id:number): Observable<Ticket>{
    return this.http.get<Ticket>(this.ticketAPIUrl+id);
  }

  addTicket(ticket: Ticket): Observable<any> {
    ticket.archived = false;
    return this.http.post<any>(this.ticketAPIUrl, ticket);
  }

  deleteTicket(ticket: Ticket):Observable<any> {
    return this.http.delete<any>(this.ticketAPIUrl + ticket.id);
  }

  archiveTicket(ticket:Ticket,id:string): Observable<any> {
    return this.http.put<any>(this.ticketAPIUrl + id, ticket);
  }
}
