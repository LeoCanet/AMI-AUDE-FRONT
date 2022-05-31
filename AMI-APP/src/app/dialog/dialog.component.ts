import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../services/crud/crud.service';
import { UtilisateursComponent } from '../components/utilisateurs/utilisateurs.component';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  providers: [],
})
export class DialogComponent implements OnInit {
  usersForm!: FormGroup;
  actionBtn: string = 'Sauvegarder';
  constructor(
    @Inject(MAT_DATE_LOCALE) private _locale: string,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private formBuilder: FormBuilder,
    private crudService: CrudService,
    private utilisateursComponent: UtilisateursComponent,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {
    this.usersForm = this.formBuilder.group({
      users: this.formBuilder.array([]),
    });
  }

  initForm() {
    this.usersForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', Validators.required],
      dateNaissance: ['', Validators.required],
    });

    // console.log(this.editData)
    if (this.editData) {
      this.actionBtn = 'Mettre à jour';
      this.usersForm.controls['nom'].setValue(this.editData.Nom);
      this.usersForm.controls['prenom'].setValue(this.editData.Prenom);
      this.usersForm.controls['email'].setValue(this.editData.Email);
      this.usersForm.controls['dateNaissance'].setValue(
        this.editData.Date_de_naissance
      );
    }
  }

  ngOnInit() {
    this.initForm();
  }

  date = moment();

  selDate!: string;
  selDay!: string;
  selMonth!: string;
  selYear!: string;

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.date = moment(event.value);
    // this.editData.Date_de_naissance = this.date
    this.selDate = this.date.format('DD');
    this.selDay = this.date.format('dddd');
    this.selMonth = this.date.format('MMMM');
    this.selYear = this.date.format('YYYY');
  }

  onSubmit() {
    // Check form.value
    // console.log(this.usersForm.value);
    if (!this.editData) {
      if (this.usersForm.valid) {
        this.crudService.AddUser(this.usersForm.value).subscribe({
          next: (res) => {
            alert("L'utilisateur à été ajouté avec succès!");
            this.usersForm.reset();
            this.dialogRef.close('sauvegarder');
          },
          error: (err) => {
            alert('Une erreur est survenue');
          },
        });
      }
    } else {
      this.updateUser();
    }
  }

  updateUser() {
    console.log('update: _______', this.usersForm.value.dateNaissance._i);
    // this.usersForm.value.dateNaissance = this.usersForm.value.dateNaissance._i
    this.crudService
      .updateUser(this.editData.id, this.usersForm.value)
      .subscribe({
        next: (res) => {
          alert("L'utilisateur à été mise à jour avec succès'");
          this.usersForm.reset();
          this.dialogRef.close('Mettre à jour');
        },
        error: () => {
          alert('Une erreur est survenue');
        },
      });
  }
}
