import { Component, Input, OnInit } from '@angular/core';
import { GLSource } from 'src/app/models/GLSource';

@Component({
  selector: 'app-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.scss']
})
export class SourceComponent implements OnInit {
  @Input() source: GLSource;

  ngOnInit(): void {
  }

}
