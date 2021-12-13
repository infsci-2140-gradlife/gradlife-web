import { Component, OnInit, Input } from '@angular/core';
import { GLEvent } from 'src/app/models/gl-event';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  @Input() event: GLEvent;
  constructor() { }

  ngOnInit(): void {
  }

}
