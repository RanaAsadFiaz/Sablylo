import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler} from '@angular/common/http';
import {CoreService} from 'src/app/services/core/authorization/core.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private auth: CoreService) {
  }

  /**
   * this function is used when any of the authenticated api is called because through this
   * fucntion we attach the token with api call in the headers
   * @params req
   * @params next
   */

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (this.auth.getToken()) {
      req = req.clone({
        setHeaders: {
          authorization: `Token ${this.auth.getToken()}`,
          'X-CSRFToken': this.auth.getCsrfToken() // csrf added in the header
        }
      });
    }
    return next.handle(req);
  }
}
