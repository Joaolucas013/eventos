import { Injectable, Output, signal, WritableSignal } from '@angular/core';
import { EventoCriado } from './formulario/formulario/EventoCriado';
import { TipoEvento } from './formulario/formulario/TipoEvento';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class EventoServiceService {
  private API_URL = 'http://localhost:3000/eventos';

  constructor(private httpClient: HttpClient) {}

  salvarEvento(evento: EventoCriado) {
    return this.httpClient.post<EventoCriado>(this.API_URL, evento);
  }

  buscarPorId(id: string): Observable<EventoCriado> {
    return this.httpClient.get<EventoCriado>(`${this.API_URL}/${id}`);
  }

  deletarEvento(evento: EventoCriado) {
    return this.httpClient.delete<EventoCriado>(`${this.API_URL}/${evento.id}`);
  }
}
