import { Inject, Injectable } from '@angular/core';

// Dummy service too highlight different providing methods

// @Injectable({ providedIn: 'root' })
export class LoggingService {
  lastlog: string;

  printLog(message: string) {
    console.log(message);
    console.log(this.lastlog);
    this.lastlog = message;
  }
}
