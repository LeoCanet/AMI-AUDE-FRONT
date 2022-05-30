import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UtilisateursAddComponent } from './components/utilisateurs-add/utilisateurs-add.component';
import { UsersDetailsComponent } from './components/users-details/users-details.component';
import { UtilisateursComponent } from './components/utilisateurs/utilisateurs.component';
import { DialogComponent } from './dialog/dialog.component';

const routes: Routes = [
  { path: '', redirectTo: 'utilisateurs', pathMatch: 'full' },
  { path: 'utilisateurs', component: UtilisateursComponent },
  { path: 'utilisateurs/:id', component: UsersDetailsComponent },
  { path: 'utilisateurs-update/:id', component: DialogComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
