import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cadastrar-eventos',
  imports: [],
  templateUrl: './cadastrar-eventos.component.html',
  styleUrl: './cadastrar-eventos.component.css',
})
export class CadastrarEventosComponent {
  @Output() enviaEventoLimpar = new EventEmitter<void>();
  @Output() eventoOnline = new EventEmitter<string>();
  msgOn: string = 'online';
  todos: string = 'todos';

  limparLista(evento: Event) {
    const tipoBotao = evento.target as HTMLElement;
    const botao = tipoBotao.closest('.limpar-eventos');
    const apenasOnline = tipoBotao.closest('.apenas-online');

    if (botao) {
      this.enviaEventoLimpar.emit();
    }

    if (apenasOnline) {
      if (apenasOnline.classList.toggle('on')) {
        this.eventoOnline.emit(this.msgOn);
      } else {
        this.eventoOnline.emit(this.todos);
      }
    }
  }
}
