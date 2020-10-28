import { Directive, OnInit, Input, ViewContainerRef, TemplateRef } from '@angular/core';

@Directive({
  selector: '[customFor]'
})
export class CustomForDirective implements OnInit {


  @Input('customForIn') numbers: number[]

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) { }

  ngOnInit(): void {
    for(let number of this.numbers) {
      this.viewContainerRef.createEmbeddedView(
        this.templateRef, 
        { $implicit: number }
      )
    }
  }

}
