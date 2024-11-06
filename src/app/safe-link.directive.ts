import { Directive, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: '[appSafeLink]',
  standalone: true,
  host: {
    '(click)': 'onConfirmLeavePage($event)'
  }
})
export class SafeLinkDirective {
  queryParam = input<string>('my-app', {alias: 'appSafeLink'});
  private hostElementREf = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

  constructor() {
    console.log('safeLinkDirective is active')
  }

  onConfirmLeavePage(event: MouseEvent) {
   const wantsToLeave = window.confirm('do you want to leave the app?');
    if(wantsToLeave) {
      const address = this.hostElementREf.nativeElement.href;
      this.hostElementREf.nativeElement.href = address + '?from' + this.queryParam();
      return;
    }

    event?.preventDefault();
  }
}
