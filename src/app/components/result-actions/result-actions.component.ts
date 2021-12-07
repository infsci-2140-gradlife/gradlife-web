import { Component, Input, OnInit } from '@angular/core';
import { GLEvent } from 'src/app/models/GLEvent';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-result-actions',
  templateUrl: './result-actions.component.html',
  styleUrls: ['./result-actions.component.scss']
})
export class ResultActionsComponent implements OnInit {
  @Input() event: GLEvent;
  isUrlLocation = false;

  constructor(private validationService: ValidationService) { }

  ngOnInit(): void {
    if (this.validationService.isUrl(this.event.location)) {
      this.isUrlLocation = true;
    }
  }
}
