import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let clonedRequest = request;
    let token = this.authService.GetToken();

    if (token) {
      clonedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(clonedRequest).pipe(catchError(this.HandleError))
  }

  private HandleError(error: HttpErrorResponse) {
    let messages: string[]=[];
    if (error.status === 0) {

      console.error('An error occurred:', error.error.message);
    } else {

      console.error(
        `Backend returned code ${error.status},::: \n `, error.error);

        
        messages.push(error.error)
    }


    // Return an observable with a user-facing error message.
    return throwError(() => messages.length>0?messages:"A ocurrido un error");
  }
}
