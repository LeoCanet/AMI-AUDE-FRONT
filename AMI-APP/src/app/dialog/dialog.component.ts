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
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', Validators.required],
      dateNaissance: ['']
    });

  
    if (this.editData) {
      this.actionBtn = 'Mettre à jour';
      this.usersForm.controls['nom'].setValue(this.editData.Nom);
      this.usersForm.controls['prenom'].setValue(this.editData.Prenom);
      this.usersForm.controls['email'].setValue(this.editData.Email);
      this.usersForm.controls['dateNaissance'].setValue(
        this.editData.Date_de_naissance
      );
      console.log(this.editData.Date_de_naissance)
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
    // console.log('update: _______', this.usersForm.value.dateNaissance._d);
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
