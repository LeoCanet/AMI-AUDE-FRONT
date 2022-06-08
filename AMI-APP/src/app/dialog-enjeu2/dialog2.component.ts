import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilisateursComponent } from '../components/utilisateurs/utilisateurs.component';
import { MatDialogRef } from '@angular/material/dialog';
import { Enjeu2Component } from '../enjeu2/enjeu2.component';
import { Enjeu2Service } from '../services/enjeu_2/enjeu-2.service';

@Component({
  selector: 'app-dialog2',
  templateUrl: './dialog2.component.html',
  styleUrls: ['./dialog2.component.scss'],
  providers: [],
})
export class DialogComponent2 implements OnInit {
  users2Form!: FormGroup;
  actionBtn: string = 'Sauvegarder';
  constructor(
    @Inject(MAT_DATE_LOCALE) private _locale: string,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private formBuilder: FormBuilder,
    private enjeu2Service: Enjeu2Service,
    private utilisateursComponent: UtilisateursComponent,
    private enjeu2Component: Enjeu2Component,
    private dialogRef: MatDialogRef<DialogComponent2>
  ) {
    this.users2Form = this.formBuilder.group({
      users: this.formBuilder.array([]),
    });
  }

  initForm() {
    this.users2Form = this.formBuilder.group({
      Referent_RSA: ['', Validators.required],
      Date_debut: ['', Validators.required],
      Date_fin: ['', Validators.required],
      Usagers: ['', Validators.required],
      Intitule_Action: ['', Validators.required],
    });

  
    if (this.editData) {
      console.log(this.editData)
      this.actionBtn = 'Mettre à jour';
      this.users2Form.controls['Referent_RSA'].setValue(this.editData.Referent_RSA);
      this.users2Form.controls['Date_debut'].setValue(this.editData.Date_debut);
      this.users2Form.controls['Date_fin'].setValue(this.editData.Date_fin);
      this.users2Form.controls['Usagers'].setValue(this.editData.Usagers);
      this.users2Form.controls['Intitule_Action'].setValue(this.editData.Intitule_Action);
    }
  }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    // Check form.value
    // console.log(this.usersForm.value);
    if (!this.editData) {
      if (this.users2Form.valid) {
        this.enjeu2Service.AddUser(this.users2Form.value).subscribe({
          next: (res) => {
            this.users2Form.reset();
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
    this.enjeu2Service
      .updateUser(this.editData.id, this.users2Form.value)
      .subscribe({
        next: (res) => {
          this.users2Form.reset();
          this.dialogRef.close('Mettre à jour');
          alert("L'utilisateur à été mise à jour avec succès'");
        },
        error: () => {
          alert('Une erreur est survenue');
        },
      });
  }
}
