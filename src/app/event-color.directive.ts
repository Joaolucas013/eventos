import { Directive, effect, ElementRef, input } from '@angular/core';

@Directive({
  selector: '[appEventColor]'
})
export class EventColorDirective {
  appEventColor = input.required<string>();
  constructor(elemento:ElementRef<HTMLElement>) {
    effect(() => {
      elemento.nativeElement.style.color = 'green'
    })
   }

}
