import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UtilisateursComponent } from './components/utilisateurs/utilisateurs.component';
import { BrowserModule } from '@angular/platform-browser';
import { UsersDetailsComponent } from './components/users-details/users-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilisateursAddComponent } from './components/utilisateurs-add/utilisateurs-add.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';

@NgModule({
  declarations: [
    AppComponent,
    UtilisateursComponent,
    UsersDetailsComponent,
    UtilisateursAddComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
