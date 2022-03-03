import { Injectable, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable()
export class AppErrorHandler extends ErrorHandler {
  constructor() {
    super();
  }

  override handleError(error: Error | HttpErrorResponse) {
    let displayMessage = 'Ocurrió un error.';

    if (!environment.production) {
      displayMessage += ' Ver consola para más detalles.';
    }
    console.log(displayMessage)
    super.handleError(error);
  }
}
