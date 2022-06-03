import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../services/crud/crud.service';
import { UtilisateursComponent } from '../components/utilisateurs/utilisateurs.component';
import { MatDialogRef } from '@angular/material/dialog';

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
      Referent_RSA: ['', Validators.required],
      Date_debut: ['', Validators.required],
      Date_fin: ['', Validators.required],
      Usagers: ['', Validators.required],
      Intitule_Action: ['', Validators.required],
    });

  
    if (this.editData) {
      this.actionBtn = 'Mettre à jour';
      this.usersForm.controls['Referent_RSA'].setValue(this.editData.Referent_RSA);
      this.usersForm.controls['Date_debut'].setValue(this.editData.Date_debut);
      this.usersForm.controls['Date_fin'].setValue(this.editData.Date_fin);
      this.usersForm.controls['Usagers'].setValue(this.editData.Usagers);
      this.usersForm.controls['Intitule_Action'].setValue(this.editData.Intitule_Action);
    }
  }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    // Check form.value
    // console.log(this.usersForm.value);
    if (!this.editData) {
      if (this.usersForm.valid) {
        this.crudService.AddUser(this.usersForm.value).subscribe({
          next: (res) => {
            this.usersForm.reset();
            this.dialogRef.close('sauvegarder');
            alert("L'utilisateur à été ajouté avec succès!");
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
    console.log('update: _______', this.editData.Date_fin);
    this.editData.Date_fin = this.editData.Date_fin.slice(0, -1);
    console.log('update: _______', this.editData.Date_fin);
    console.log('test________', this.usersForm.value)
    this.crudService
      .updateUser(this.editData.id, this.usersForm.value)
      .subscribe({
        next: (res) => {
          this.usersForm.reset();
          this.dialogRef.close('Mettre à jour');
          alert("L'utilisateur à été mise à jour avec succès'");
        },
        error: () => {
          alert('Une erreur est survenue');
        },
      });
  }
}
