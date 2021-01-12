import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TOCKEN } from '../services/auth/auth.service';

const TOKEN_HEADER_KEY = 'x-access-token';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = JSON.parse(localStorage.getItem(TOCKEN))?.token || null;

        let request = req;

        if (token) {
            request = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, token) });
        }

        return next.handle(request);
    }
}