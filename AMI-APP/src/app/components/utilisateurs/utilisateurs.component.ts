import { Component, OnInit } from '@angular/core';
import { UtilisateursService } from 'src/app/services/utilisateurs/utilisateurs.service';

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.scss']
})


export class UtilisateursComponent implements OnInit {

  dataProjects: any;

  constructor(private UtilisateursService: UtilisateursService) { }

  ngOnInit(): void {
    this.retrieveProjects();
  }

  retrieveProjects(): void {
    this.UtilisateursService.getAll()
    .subscribe(
        data => {
          this.dataProjects = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

}
