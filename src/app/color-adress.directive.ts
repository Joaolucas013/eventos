import { afterRender, Directive, effect, ElementRef, input } from '@angular/core';

@Directive({
  selector: '[appColorAdress]'
})
export class ColorAdressDirective {
  appColorAdress = input.required<string>();
  colorCidade = "#010615"

  
  constructor(elemento: ElementRef<HTMLElement>) {
    effect(() => {
        elemento.nativeElement.style.color=this.colorCidade
        
    })
   }

}
