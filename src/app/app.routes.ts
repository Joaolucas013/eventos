import { Routes } from '@angular/router';
import { FormularioComponent } from './formulario/formulario/formulario.component';
import { ExcluirEventoComponent } from './excluir-evento/excluir-evento.component';
import { EventosComponent } from './eventos/eventos.component';
import { EditarEventoComponent } from './editar-evento/editar-evento.component';

export const routes: Routes = [
  { path: '', redirectTo: 'lista-eventos', pathMatch: 'full' },
  { path: 'lista-eventos', component: EventosComponent },
  { path: 'eventos', component: FormularioComponent },
  {
    path: 'excluirEvento/:id',
    component: ExcluirEventoComponent,
  },
  {
    path: 'editarEvento/:id',
    component: EditarEventoComponent,
  },
];
