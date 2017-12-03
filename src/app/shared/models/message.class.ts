export class Message {
  /**
   * @param {string} _message The message to display.
   * @param {MessageType} _type The type of message to display.
   */
  constructor(private _message: string, private _type: MessageType) {
  }

  /**
   * @returns {string} The HTML class for this message.
   */
  get HTMLClass(): string {
    return 'alert alert-' + this._type.HTMLClass;
  }

  /**
   * @returns {string} The actual message.
   */
  get content(): string {
    return this._message;
  }
}

interface MessageType {
  /**
   * The HTMLClass to use for this type.
   */
  HTMLClass: string;
}

export class ErrorType implements MessageType {
  /**
   * The HTMLClass to use for this type.
   */
  get HTMLClass(): string {
    return 'danger';
  }
}

export class InfoType implements MessageType {
  /**
   * The HTMLClass to use for this type.
   */
  get HTMLClass(): string {
    return 'info';
  }
}

export class WarningType implements MessageType {
  /**
   * The HTMLClass to use for this type.
   */
  get HTMLClass(): string {
    return 'warning';
  }
}
