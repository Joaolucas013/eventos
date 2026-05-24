import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventoCriado } from '../formulario/formulario/EventoCriado';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private API_URL = 'http://localhost:3000/eventos';

  constructor(private httpCliente: HttpClient) {}

  obterEventos(paginaAtual: number, filtro?: string): Observable<EventoCriado[]> {
    let eventosPorPagina=3;

   let params = new HttpParams()
   .set("_page", paginaAtual)
   .set("_limit", eventosPorPagina);

    if(filtro && filtro?.trim().length>3){
       params = params.set('q', filtro);
    }
    
    return this.httpCliente.get<EventoCriado[]>(this.API_URL, {
      params
    });
  }

  salvar(evento: EventoCriado) {
    return this.httpCliente.post<EventoCriado>(this.API_URL, evento);
  }

  atualizar(evento: EventoCriado): Observable<EventoCriado> {
    const url = `${this.API_URL}/${evento.id}`;

    return this.httpCliente.put<EventoCriado>(url, evento);
  }
}
