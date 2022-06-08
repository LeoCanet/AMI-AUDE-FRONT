import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { UtilisateursComponent } from './components/utilisateurs/utilisateurs.component';
import { DialogComponent } from './dialog/dialog.component';
import { Enjeu2Component } from './enjeu2/enjeu2.component';


const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'utilisateurs', component: UtilisateursComponent },
  { path: 'enjeu2', component: Enjeu2Component },
  { path: 'utilisateurs-update/:id', component: DialogComponent },
  { path: 'utilisateurs-delete/:id', component: UtilisateursComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
