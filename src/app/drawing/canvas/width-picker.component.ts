import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-width-picker',
  template: `<input type="number" [(ngModel)]="currentNumber" (click)="applyColor()">`,
  styles: ['']
})
export class WidthPickerComponent {
  /**
   * The number that is currently picked.
   */
  @Output()
  public number: EventEmitter<number> = new EventEmitter();

  /**
   * The number that is currently picked.
   */
  public currentNumber: number;

  /**
   * Applies the number after picking.
   */
  applyColor() {
    if(this.currentNumber <= 0)
      this.currentNumber = 1;
    this.number.emit(this.currentNumber);
  }
}
