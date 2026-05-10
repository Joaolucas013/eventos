import { afterRender, Directive, ElementRef, input } from '@angular/core';

@Directive({
  selector: '[appDestaqueTextos]'
})
export class DestaqueTextosDirective {
  appDestaqueTextos = input.required<string>();
  corDestaque = "#ae460e"
  constructor(private elemento: ElementRef<HTMLElement>) {
    afterRender(() => {
      elemento.nativeElement.style.color = this.corDestaque
    
    })
   }
  
}
