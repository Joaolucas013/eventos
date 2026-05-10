import { afterRender, Directive, ElementRef, input } from '@angular/core';

@Directive({
  selector: '[appDestaqueValores]',
})
export class DestaqueValoresDirective {
  appDestaqueValores = input.required<number>();
  corPositiva = input('#4b21cc');
  corNegativa = input('#af1111');

  constructor(private elemento: ElementRef<HTMLElement>) {
    afterRender(() => {
      if (this.appDestaqueValores() >= 100) {
        elemento.nativeElement.style.color = this.corPositiva();
      } else {
        elemento.nativeElement.style.color = this.corNegativa();
      }
    });
  }
}
