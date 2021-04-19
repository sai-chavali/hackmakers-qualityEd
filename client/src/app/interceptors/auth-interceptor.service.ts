import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from '../auth.service';
import {switchMap, take} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler) {
        return this.authService.token.pipe(
            take(1),
            switchMap((token) => {
                request = request.clone({
                    headers: request.headers.set('Authorization', `Bearer ${token}`)
                });
                return next.handle(request);
            })
        );
    }
}
