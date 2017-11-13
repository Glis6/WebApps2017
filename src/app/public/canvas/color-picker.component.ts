import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-color-picker',
  template: `<input type="color" [(ngModel)]="colorCode" (change)="applyColor()">`,
  styles: ['']
})
export class ColorPickerComponent {
  /**
   * The color that is currently picked.
   */
  @Output()
  public color: EventEmitter<string> = new EventEmitter();

  /**
   * The color code that is currently picked.
   */
  private colorCode: string;

  /**
   * Applies the color after picking.
   */
  applyColor() {
    this.color.emit(this.colorCode);
  }
}
