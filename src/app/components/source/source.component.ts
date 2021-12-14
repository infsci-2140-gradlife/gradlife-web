import { Component, Input, OnInit } from '@angular/core';
import { GLEvent } from 'src/app/models/gl-event';

@Component({
  selector: 'app-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.scss']
})
export class SourceComponent implements OnInit {
  @Input() event: GLEvent;

  ngOnInit(): void {
  }

}
