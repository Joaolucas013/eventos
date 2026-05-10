import {
  Component,
  computed,
  input,
  Input,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { EventoCriado } from '../../formulario/formulario/EventoCriado';
import { TipoEvento } from '../../formulario/formulario/TipoEvento';
import { EventoServiceService } from '../../evento-service.service';
import { ApresentacaoComponent } from '../../apresentacao/apresentacao.component';
import { DestaqueValoresDirective } from '../../destaque-valores.directive';
import { DestaqueTextosDirective } from '../../destaque-textos.directive';
import { RouterLink } from '@angular/router';
import { CadastrarEventosComponent } from '../../cadastrar-eventos/cadastrar-eventos.component';
import { ServiceService } from '../../servico/service.service';

@Component({
  selector: 'app-evento',
  imports: [
    DestaqueValoresDirective,
    DestaqueTextosDirective,
    RouterLink,
    CadastrarEventosComponent,
  ],
  templateUrl: './evento.component.html',
  styleUrl: './evento.component.css',
})
export class EventoComponent implements OnInit {
  eventos = signal<EventoCriado[]>([]);
  originais = signal<EventoCriado[]>([]);

  constructor(private service: ServiceService) {}

  ngOnInit(): void {
    this.service.obterEventos().subscribe((eventos) => {
      this.eventos.set(eventos);
      this.originais.set(eventos);
    });
  }

  apenasOnlines(msg: string) {
    if (msg == 'online') {
      this.eventos.set(this.originais().filter((e) => e.eventoOnline));
    } else  {
      this.eventos.set(this.originais());
    }
  }
}
