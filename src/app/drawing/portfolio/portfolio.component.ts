import {Component, Inject, OnInit} from '@angular/core';
import {DRAWING_SERVICE, DrawingService} from "../../shared/services/drawing.service";
import {Drawing} from "../../shared/models/drawing.class";
import {AUTHENTICATION_SERVICE, AuthenticationService} from "../../shared/services/authentication.service";

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
              @Inject(DRAWING_SERVICE) private drawingService: DrawingService) {
  }

  ngOnInit() {
    this.authenticationService.user.subscribe(user => {
      if(user) {
        this.drawingService.getDrawingsForUser(user.id).subscribe(drawings => this.drawings = drawings);
      } else {
        this.drawings = [];
      }
    })
  }
}
