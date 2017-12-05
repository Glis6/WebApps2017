import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-color-picker',
  template: `
    <div class="input-group">
      <div class="col-md-8 input-group">
        <div class="input-group-addon">#</div>
        <input type="text" class="form-control" style="width: 100%" [value]="colorCode?.replace('#', '')" (change)="setColor(color.value)" #color>
      </div>
      <div class="col-md-4">
        <input type="color" class="form-control" style="width:100%; height:100%" [(ngModel)]="colorCode">
      </div>
    </div>`,
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
  private _colorCode: string;

  /**
   * @returns {string} The color code that is currently picked.
   */
  get colorCode(): string {
    return this._colorCode;
  }

  /**
   * @param colorCode The color code that is currently picked.
   */
  @Input()
  set colorCode(colorCode) {
    const result = ColorPickerComponent.isHexAColor(colorCode);
    if (!result) {
      colorCode = this._colorCode;
    }
    const oldColor: string = this._colorCode;
    this._colorCode = colorCode;
    if (this._colorCode != oldColor && this._colorCode != undefined)
      this.applyColor();
  }

  /**
   * @param color The color code that is currently picked.
   */
  setColor(color: string) {
    this.colorCode = '#' + color;
  }

  /**
   * @param colorCode The color code to check.
   * @returns {boolean} Whether or not the hex is a color code.
   */
  static isHexAColor(colorCode: string) {
    colorCode = colorCode.replace('#', '');
    if (!colorCode)
      return;
    return colorCode.length == 6
      && !isNaN(parseInt(colorCode, 16));
  }

  /**
   * Applies the color after picking.
   */
  applyColor() {
    this.color.emit(this.colorCode);
  }
}
