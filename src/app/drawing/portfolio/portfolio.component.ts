import {Component, Inject, OnInit} from '@angular/core';
import {DRAWING_SERVICE, DrawingService} from "../../shared/services/drawing.service";
import {Drawing} from "../../shared/models/drawing.class";
import {AUTHENTICATION_SERVICE, AuthenticationService} from "../../shared/services/authentication.service";
import {AlertService} from "../../shared/services/alert.service";
import {MessageService} from "../../shared/services/message.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  /**
   * All the drawings that the user has made.
   */
  public drawings: Drawing[];

  constructor(@Inject(AUTHENTICATION_SERVICE) private authenticationService: AuthenticationService,
              @Inject(DRAWING_SERVICE) private drawingService: DrawingService,
              private alertService: AlertService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.authenticationService.user.subscribe(user => {
      if (user) {
        this.drawingService.getDrawingsForUser(user.id).subscribe(drawings => this.drawings = drawings);
      } else {
        this.drawings = [];
      }
    })
  }

  removeDrawing(drawing: Drawing) {
    this.alertService.confirmation('Are you sure you want to delete ' + drawing.name + '?',
      {
        label: 'No',
        onClick: () => {
        }
      },
      {
        label: 'Yes',
        onClick: () => {
          this.messageService.info('Removing drawing...');
          const subscription: Subscription = this.drawingService.removeDrawing(drawing).subscribe(() => {
            this.messageService.info('Drawing successfully removed!');
            this.drawings = this.drawings.filter(drawingInList => drawingInList.id != drawing.id);
            subscription.unsubscribe();
          }, () => this.messageService.error('Something went wrong removing the drawing!'));
        }
      });
  }
}
