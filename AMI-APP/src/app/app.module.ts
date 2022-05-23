import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UtilisateursComponent } from './components/utilisateurs/utilisateurs.component';
import { BrowserModule } from '@angular/platform-browser';
import { AddUsersComponent } from './components/add-users/add-users.component';
import { UsersDetailsComponent } from './components/users-details/users-details.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    UtilisateursComponent,
    AddUsersComponent,
    UsersDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
