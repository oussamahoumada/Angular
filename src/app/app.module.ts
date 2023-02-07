import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TicketComponent, TicketFormComponent, TicketListComponent } from './tickets';
import { TicketService } from '../services/ticket/ticket.service';
import { StudentService } from '../services/student/student.service';
import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { StudentsComponent } from './students/students.component';
import { CRUDComponent } from './students/crud/crud.component';

@NgModule({
  declarations: [
    AppComponent,
    TicketComponent,
    TicketFormComponent,
    TicketListComponent,
    HeaderComponent,
    StudentsComponent,
    CRUDComponent // All the components needs to be declared
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'Ticket', component: TicketListComponent },
      { path: 'Student', component: StudentsComponent },
      { path: '**', redirectTo: 'Ticket', pathMatch: 'full' }

    ]),  // Import all dependencies
  ],

  providers: [TicketService,StudentService], // All the services need to be provided
  bootstrap: [AppComponent]
})
export class AppModule {
}
