import { Component } from '@angular/core';
import { LoggerService } from '../../services/index';

@Component({
  moduleId: module.id,
  selector: 'app',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  constructor(public log: LoggerService) {
      
  }

}
