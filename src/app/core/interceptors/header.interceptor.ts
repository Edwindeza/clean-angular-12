import { Injectable, Injector } from "@angular/core";
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from '@core/services/authentication/auth.service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

    constructor(private inj: Injector) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (req.headers.has('Authorization')) {
            return next.handle(req);
        }

        const tok = this.inj.get(AuthService);

        const authHeader = tok.getToken();

        if (tok.isLoggedIn()) {
            const dupReq = req.clone({
                headers: req.headers
                    .set('Content-Type', 'application/json; charset=utf-8')
                    .set('Authorization', `Bearer ${authHeader}`)
            });
            return next.handle(dupReq);
        } else {
            const dupReq = req.clone({
                headers: req.headers
                    .set('Content-Type', 'application/json; charset=utf-8')
            });
            return next.handle(dupReq);
        }
    }
}
