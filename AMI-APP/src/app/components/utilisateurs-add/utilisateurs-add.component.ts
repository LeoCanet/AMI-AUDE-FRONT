import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud/crud.service';

@Component({
  selector: 'app-utilisateurs-add',
  templateUrl: './utilisateurs-add.component.html',
  styleUrls: ['./utilisateurs-add.component.scss'],
})
export class UtilisateursAddComponent implements OnInit {
  usersForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private crudService: CrudService,
    private router: Router
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
  }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    console.log(this.usersForm.value);
    if (this.usersForm.valid) {
      this.crudService.AddUser(this.usersForm.value).subscribe({
        next: (res) => {
          alert('User added successfully');
        },
        error: () => {
          alert('Error while adding the user');
        },
      });
      this.router.navigate(['/utilisateurs']);
    }else {
      alert('Veuillez remplir tous les champs disponibles');
    }
  }
}
