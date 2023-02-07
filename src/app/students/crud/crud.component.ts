import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Student } from '../../../models/student';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CRUDComponent implements OnInit {

  constructor() { }

  id: number = 0;
  nom: string = "";
  prenom: string = "";
  @Output()
  stodentToAdd: EventEmitter<Student> = new EventEmitter<Student>();

  ngOnInit() {
  }

  addStudent() {
    let std: Student = {
      id: this.id,
      nom: this.nom,
      prenom: this.prenom
    }
    this.stodentToAdd.emit(std);
  }

}
