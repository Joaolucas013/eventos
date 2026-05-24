import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-carregar-mais',
  imports: [],
  templateUrl: './carregar-mais.component.html',
  styleUrl: './carregar-mais.component.css'
})
export class CarregarMaisComponent {

  @Input() haMaisEventos:boolean = false
}
