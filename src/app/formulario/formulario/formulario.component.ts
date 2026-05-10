import { Component, EventEmitter, OnInit, Output, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TipoEvento } from './TipoEvento';
import { KeyValuePipe, NgClass } from '@angular/common';
import { EventoCriado } from './EventoCriado';
import { EventoServiceService } from '../../evento-service.service';
import { ApresentacaoComponent } from '../../apresentacao/apresentacao.component';
import { Route, Router } from '@angular/router';
import { nanoid } from 'nanoid';
import { ServiceService } from '../../servico/service.service';

@Component({
  selector: 'app-formulario',
  imports: [ReactiveFormsModule, KeyValuePipe, NgClass, ApresentacaoComponent],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css',
})
export class FormularioComponent {
  evento = TipoEvento;
  eventoForm!: FormGroup;

  constructor(
    private eventoService: ServiceService,
    private rota: Router,
  ) {
    this.eventoForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefoneOrganizador: new FormControl('', Validators.required),
      nomeDoEvento: new FormControl('', Validators.required),
      tipoEvento: new FormControl('', Validators.required),
      dataEvento: new FormControl(null, Validators.required),
      horaEvento: new FormControl('', Validators.required),
      eventoOnline: new FormControl(false),
      link: new FormControl(''),
      endereco: new FormControl(''),
      cidade: new FormControl(''),
      totalParticipantes: new FormControl(null, Validators.required),
      descricao: new FormControl(''),
    });

    this.eventoForm.get('eventoOnline')?.valueChanges.subscribe((online) => {
      validaOnline(this.eventoForm, online);
    });
  }

  salvarEvento() {
    const form = this.eventoForm.value;

    const evento: EventoCriado = {
      id: nanoid(),
      nome: form.nome,
      email: form.email,
      telefoneOrganizador: form.telefoneOrganizador,
      nomeDoEvento: form.nomeDoEvento,
      tipoEvento: form.tipoEvento,
      dataEvento: form.dataEvento,
      horaEvento: form.horaEvento,
      eventoOnline: form.eventoOnline,
      link: form.link,
      endereco: form.endereco,
      cidade: form.cidade,
      totalParticipantes: form.totalParticipantes,
      descricao: form.descricao,
    };

    this.eventoService.salvar(evento).subscribe(() => {
      this.rota.navigateByUrl('/lista-eventos');
    });
  }
}

function validaOnline(eventoForm: FormGroup<any>, online: any) {
  const link = eventoForm.get('link');
  const endereco = eventoForm.get('endereco');
  const cidade = eventoForm.get('cidade');

  if (online) {
    link?.setValidators([Validators.required]);
    link?.enable();
    endereco?.disable();
    cidade?.disable();
  } else {
    link?.disable();
    endereco?.enable();
    cidade?.enable();
    link?.clearValidators();
  }

  link?.updateValueAndValidity();
}
