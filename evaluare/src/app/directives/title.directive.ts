import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTitle]',
})
export class TitleDirective {
  constructor(private _elRef: ElementRef) {
    this._elRef.nativeElement.style.textAlign = 'center';
    this._elRef.nativeElement.style.fontSize = '2rem';
    this._elRef.nativeElement.style.fontWeight = 'bold';
    this._elRef.nativeElement.style.margin = '1.3rem';
  }
}
