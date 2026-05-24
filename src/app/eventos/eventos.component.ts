import { Component, Input, OnInit, signal } from '@angular/core';
import { EventoCriado } from '../formulario/formulario/EventoCriado';
import { ServiceService } from '../servico/service.service';
import { EventoComponent } from '../dados/evento/evento.component';
import { CadastrarEventosComponent } from '../cadastrar-eventos/cadastrar-eventos.component';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CarregarMaisComponent } from "../carregar-mais/carregar-mais.component";

@Component({
  selector: 'app-eventos',
  imports: [
    EventoComponent,
    CadastrarEventosComponent,
    RouterLink,
    FormsModule,
    CarregarMaisComponent
],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css',
})
export class EventosComponent implements OnInit {
  eventos = signal<EventoCriado[]>([]);
  originais = signal<EventoCriado[]>([]);
  filtro: string = '';
  paginaAtual: number = 1;
 @Input() haMaisEventos:boolean=true

  constructor(
    private service: ServiceService,
    private rota: Router,
  ) {}

  ngOnInit(): void {
    this.service.obterEventos(this.paginaAtual).subscribe((eventos) => {
      this.eventos.set(eventos);
      this.originais.set(eventos);
    });
  }

  apenasOnlines(msg: string) {
    if (msg == 'online') {
      this.eventos.set(this.originais().filter((e) => e.eventoOnline));
    } else {
      this.eventos.set(this.originais());
    }
  }

  irParaEdicao(evento: EventoCriado) {
    this.rota.navigate(['/editarEvento', evento.id]);
  }

  limparLista() {
    this.eventos.set([]);
    this.originais.set([]);
  }

  buscarEvento() {
    this.service.obterEventos(this.paginaAtual, this.filtro).subscribe((eventos) => {
      this.eventos.set([...eventos]);
    });
  }

  carregarMaisEventos(){
    this.service.obterEventos(++this.paginaAtual).subscribe(lista => {
      this.eventos.update(eventos => [...eventos, ...lista])

      if(!lista.length){
        this.haMaisEventos=false
      }
    })
  }
}
