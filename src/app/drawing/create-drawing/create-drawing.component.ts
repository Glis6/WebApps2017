import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-drawing',
  templateUrl: './create-drawing.component.html',
  styleUrls: ['./create-drawing.component.css']
})
export class CreateDrawingComponent implements OnInit {

  public canvasUrl: string;

  constructor() { }

  ngOnInit() {
  }
}
