import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTitle]',
})
export class TitleDirective {
  constructor(private _elRef: ElementRef) {
    this._elRef.nativeElement.style.textAlign = 'center';
  }
}
