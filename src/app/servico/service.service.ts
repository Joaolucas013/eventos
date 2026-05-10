import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventoCriado } from '../formulario/formulario/EventoCriado';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private API_URL = 'http://localhost:3000/eventos'

  constructor(private httpCliente:HttpClient) { }


    obterEventos():Observable<EventoCriado[]>{
     return  this.httpCliente.get<EventoCriado[]>(this.API_URL)
    }

    salvar(evento:EventoCriado){
      return this.httpCliente.post<EventoCriado>(this.API_URL, evento)
    }
    
}
