import { Component, OnInit } from '@angular/core';
import { EventoServiceService } from '../evento-service.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { EventoCriado } from '../formulario/formulario/EventoCriado';
import { TipoEvento } from '../formulario/formulario/TipoEvento';

@Component({
  selector: 'app-excluir-evento',
  imports: [],
  templateUrl: './excluir-evento.component.html',
  styleUrl: './excluir-evento.component.css',
})
export class ExcluirEventoComponent implements OnInit {
  private evento!: EventoCriado;

  constructor(
    private eventoService: EventoServiceService,
    private rota: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);

    this.eventoService.buscarPorId(id!).subscribe((evento) => {
      this.evento = evento;
      console.log(this.evento);
    });
  }

  excluirEvento() {
    
    this.eventoService.deletarEvento(this.evento).subscribe(() => {
      this.rota.navigate(['lista-eventos']);
    });
  }

  cancelar() {
    this.rota.navigateByUrl('lista-eventos');
  }
}
