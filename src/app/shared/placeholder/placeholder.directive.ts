import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPlaceholder]',
})
export class PlaceholderDirective {
  //view container ref gives you the exact location where the directive is used
  // it also gives you useful methods, like creating component in that place it sits
  // public to access vcf via ViewChild on whatever element it's used
  constructor(public viewContainerRef: ViewContainerRef) {}
}
