import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud/crud.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';

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

  constructor(private crudService: CrudService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAll();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '40%',
    }).afterClosed().subscribe(val=>{
      if(val === 'sauvegarder'){
        this.getAll();
      }
    })
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

  editUser(row: any) {
    this.dialog.open(DialogComponent, {
      width: '40%',
      data: row,
    }).afterClosed().subscribe(val=>{
      if(val === 'Mettre à jour'){
        this.getAll();
      }
    })
  }

  deleteUser(id: number) {
    this.crudService.deleteUser(id)
    .subscribe({
      next:res => {
        alert("L'utilisateur à été supprimé avec succès")
        this.getAll();
      },
      error:()=>{
        alert("Une erreur est survenue")
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
