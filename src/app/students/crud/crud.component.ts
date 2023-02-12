import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Student } from '../../../models/student';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CRUDComponent implements OnInit {

  constructor() { }

  id: number;
  nom: string = "";
  prenom: string = "";
  email: string = "";
  @Output()
  stodentToAdd: EventEmitter<Student> = new EventEmitter<Student>();

  ngOnInit() {
  }

  addStudent() {
    let std: Student = {
      id: this.id,
      nom: this.nom,
      prenom: this.prenom,
      email: this.email,
      image: "assets/avatar/Av4.jfif"
    }
    this.stodentToAdd.emit(std);
  }

}
