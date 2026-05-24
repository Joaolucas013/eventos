import { Component, input, Output, signal } from '@angular/core';
import { FormularioComponent } from '../formulario/formulario/formulario.component';
import { EventoCriado } from '../formulario/formulario/EventoCriado';
import { EventoComponent } from '../dados/evento/evento.component';
import { ActivatedRoute, Router } from '@angular/router';
import { EventoServiceService } from '../evento-service.service';


@Component({
  selector: 'app-editar-evento',
  imports: [FormularioComponent],
  templateUrl: './editar-evento.component.html',
  styleUrl: './editar-evento.component.css',
})
export class EditarEventoComponent {
  evento = signal<EventoCriado | null>(null);

  constructor(private activatedRoute: ActivatedRoute, private service: EventoServiceService, private rota:Router) {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.service.buscarPorId(id).subscribe(e => this.evento.set(e));
    }
  }
}
