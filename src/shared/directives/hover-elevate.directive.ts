import { Directive } from '@angular/core';

@Directive({
  selector: '[appHoverElevate]',
  host: {
    '(mouseenter)': 'hover = true',
    '(mouseleave)': 'hover = false',
    '(focusin)': 'hover = true',
    '(focusout)': 'hover = false',
    '[class.hover-elevate]': 'hover',
  },
})
export class HoverElevateDirective {
  hover = false;
}


