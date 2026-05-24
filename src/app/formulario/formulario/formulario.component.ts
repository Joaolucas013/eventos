import {
  Component,
  computed,
  EventEmitter,
  Input,
  input,
  OnChanges,
  OnInit,
  Output,
  signal,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
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
export class FormularioComponent implements OnChanges, OnInit {
  evento = TipoEvento;
  eventoForm!: FormGroup;
  @Input() eventoUpdate: EventoCriado | null = null;
  private id?: string;

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
      this.validaOnline(this.eventoForm, online);
    });
  }

  ngOnInit(): void {
    if (this.eventoUpdate) {
      this.preencherFormulario(this.eventoUpdate);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['eventoUpdate'] && this.eventoUpdate) {
      this.id = this.eventoUpdate.id;
      this.preencherFormulario(this.eventoUpdate);
      this.enable(this.eventoForm);
    }
  }

  private preencherFormulario(evento: EventoCriado): void {
    this.eventoForm.patchValue({
      nome: evento.nome,
      email: evento.email,
      telefoneOrganizador: evento.telefoneOrganizador,
      dataEvento: evento.dataEvento,
      horaEvento: evento.horaEvento,
      totalParticipantes: evento.totalParticipantes,
      eventoOnline: evento.eventoOnline,
      endereco: evento.endereco,
      nomeDoEvento: evento.nomeDoEvento,
      tipoEvento: evento.tipoEvento,
      cidade: evento.cidade,
      descricao: evento.descricao,
    });
  }

  salvarEvento() {
    const form = this.eventoForm.value;

    if (!this.id) {
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
    } else {
      const eventoUpdate: EventoCriado = {
        id: this.id,
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

      this.eventoService.atualizar(eventoUpdate).subscribe(() => {
        this.rota.navigateByUrl('/lista-eventos');
      });
    }
  }

  private validaOnline(eventoForm: FormGroup<any>, online: any) {
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

  private enable(eventoForm: FormGroup<any>) {
    const endereco = eventoForm.get('endereco');
    const cidade = eventoForm.get('cidade');
    endereco?.enable();
    cidade?.enable();
  }
}
