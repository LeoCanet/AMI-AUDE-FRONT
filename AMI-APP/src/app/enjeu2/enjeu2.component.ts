import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent2 } from '../dialog-enjeu2/dialog2.component';
import { Enjeu2Service } from '../services/enjeu_2/enjeu-2.service';


@Component({
  selector: 'app-enjeu2',
  templateUrl: './enjeu2.component.html',
  styleUrls: ['./enjeu2.component.scss']
})
export class Enjeu2Component implements OnInit {

  displayedColumns: string[] = [
    'id',
    'Referent_RSA',
    'Date_debut',
    'Date_fin',
    'Usagers',
    'Intitule_Action',
    'Actions',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private enjeu2Service: Enjeu2Service, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAll();
  }

  openDialog() {
    this.dialog.open(DialogComponent2, {
      width: '40%',
    }).afterClosed().subscribe(val=>{
      if(val === 'sauvegarder'){
        this.getAll();
      }
    })
  }

  getAll(): void {
    this.enjeu2Service.GetUsers().subscribe({
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
    this.dialog.open(DialogComponent2, {
      width: '40%',
      data: row,
    }).afterClosed().subscribe(val=>{
      if(val === 'Mettre à jour'){
        this.getAll();
      }
    })
  }

  deleteUser(id: number) {
    this.enjeu2Service.deleteUser(id)
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
