import {
  Component,
  computed,
  EventEmitter,
  input,
  Input,
  OnInit,
  Output,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { EventoCriado } from '../../formulario/formulario/EventoCriado';
import { DestaqueValoresDirective } from '../../destaque-valores.directive';
import { DestaqueTextosDirective } from '../../destaque-textos.directive';
import { Route, Router, RouterLink } from '@angular/router';

import { ColorAdressDirective } from '../../color-adress.directive';
import { EventColorDirective } from '../../event-color.directive';
import { CommonModule } from '@angular/common';
import { EventoServiceService } from '../../evento-service.service';

@Component({
  selector: 'app-evento',
  imports: [
    DestaqueValoresDirective,
    DestaqueTextosDirective,
    RouterLink,
    ColorAdressDirective,
    EventColorDirective,
    CommonModule,
  ],
  templateUrl: './evento.component.html',
  styleUrl: './evento.component.css',
})
export class EventoComponent {
  @Input() evento!: EventoCriado;
  @Output() eventoAtualizar = new EventEmitter<EventoCriado>();

  constructor(private service: EventoServiceService) {}

  editarEvento(id: string) {
    const evento = this.service.buscarPorId(id);
    evento.subscribe((e) => {
      this.eventoAtualizar.emit(e);
    });
  }

  verificaNome() {
    return this.evento.nomeDoEvento.length < 18 ? 'nome-curto' : 'nome-longo';
  }
}
