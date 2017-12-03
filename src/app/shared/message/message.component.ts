import { Component, OnInit } from '@angular/core';
import {MessageService} from "../services/message.service";
import {Observable} from "rxjs/Observable";
import {Message} from "../models/message.class";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  /**
   * The message we're displaying.
   */
  public message: Observable<Message>;

  /**
   * @param {MessageService} messageService The messageService to use to sync the message.
   */
  constructor(private messageService: MessageService) {
  }

  /**
   * Links the message to the service.
   */
  ngOnInit() {
    this.message = this.messageService.message;
  }

  /**
   * This will clear the current message.
   */
  clearMessage() {
    this.messageService.clear();
  }
}
