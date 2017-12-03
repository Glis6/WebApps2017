import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {ErrorType, InfoType, WarningType, Message} from "../models/message.class";
import {Subject} from "rxjs/Subject";

@Injectable()
export class MessageService {
  /**
   * The subject that we're watching.
   */
  private _message: Subject<Message> = new Subject();

  /**
   * Creates a new info message.
   *
   * @param message The actual message.
   */
  info(message: string) {
    this._message.next(new Message(message, new InfoType))
  }

  /**
   * Creates a new error message.
   *
   * @param message The actual message.
   */
  error(message: string) {
    this._message.next(new Message(message, new ErrorType))
  }

  /**
   * Creates a new warning message.
   *
   * @param message The actual message.
   */
  warning(message: string) {
    this._message.next(new Message(message, new WarningType))
  }

  /**
   * Clears the message.
   */
  clear() {
    this._message.next();
  }

  /**
   * The current message.
   */
  get message(): Observable<Message> {
    return this._message;
  }
}
