import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud/crud.service';

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.scss']
})


export class UtilisateursComponent implements OnInit {

  dataProjects: any;

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.crudService.GetUsers()
    .subscribe({
      next:(result) => {
        this.dataProjects = result;
        console.log(result);
      },
      error:(err) => {
        alert(err);
      }
    })
  }

}
