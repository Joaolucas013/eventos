import { Routes } from '@angular/router';
import { EventoComponent } from './dados/evento/evento.component';
import { FormularioComponent } from './formulario/formulario/formulario.component';

export const routes: Routes = [
  { path: "lista-eventos", component: EventoComponent },
  { path: "eventos", component: FormularioComponent },
  { path: "", redirectTo: "lista-eventos", pathMatch: "full" } 
];