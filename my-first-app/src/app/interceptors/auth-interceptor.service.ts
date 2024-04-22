import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "../services/auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = this.authService.user.value;
    if(!user) {
      return next.handle(req);
    }

    const request = req.clone({ params: new HttpParams().set("auth", user.token)})
    return next.handle(request);
  }

}
