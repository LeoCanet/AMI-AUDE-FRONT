import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud/crud.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.scss'],
})
export class UtilisateursComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'Nom',
    'Prenom',
    'Email',
    'Date_de_naissance',
    'Actions',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private crudService: CrudService,
    private dialog: MatDialogModule
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.crudService.GetUsers().subscribe({
      next: (data: any) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(data);
      },
      error: (err) => {
        alert(err);
      },
    });
  }

  // editUser(): void {
  //   this.dialog.open(DialogComponent, {

  //   } )
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
