import { afterRender, Directive, effect, ElementRef, input } from '@angular/core';

@Directive({
  selector: '[appDestaqueTextos]'
})
export class DestaqueTextosDirective {
  appDestaqueTextos = input.required<string>();
  corDestaque = "#ae460e"
  constructor(private elemento: ElementRef<HTMLElement>) {
    effect(() => {
      elemento.nativeElement.style.color = this.corDestaque
    
    })
   }
  
}
