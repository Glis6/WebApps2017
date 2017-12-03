import {Component} from '@angular/core';
import {AlertService} from "../services/alert.service";
import {Alert} from "../models/alert.interface";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  /**
   * The alert to display.
   */
  alert: Observable<Alert>;

  /**
   * @param {AlertService} alertService The alertService to use to display the alert.
   */
  constructor(private alertService: AlertService) {
  }

  /**
   * Links the alert to this class.
   */
  ngOnInit() {
    this.alert = this.alertService.alert;
  }
}
