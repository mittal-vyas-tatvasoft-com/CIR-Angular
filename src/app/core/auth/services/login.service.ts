import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/common/interfaces/response.interface';
import { environment } from 'src/environments/environment';
import { ForgotPasswordModel } from '../interfaces/forgot-password.interface';
import { LoginModel } from '../interfaces/login.interface';
import { ResetPasswordModel } from '../interfaces/reset-password.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private router: Router) {}

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  login(payload: LoginModel): Observable<ResponseModel<string>> {
    return this.http
      .post<ResponseModel<string>>(`${environment.baseURL}Login`, payload)
      .pipe(
        map((res: ResponseModel<string>) => {
          if (res.result) {
            this.setToken(res.data);
          }
          return res;
        }),
      );
  }

  forgotPassword(
    userName: ForgotPasswordModel,
  ): Observable<ResponseModel<string>> {
    return this.http.post<ResponseModel<string>>(
      `${environment.baseURL}Login/ForgotPassword`,
      userName,
    );
  }

  resetPassword(
    payload: ResetPasswordModel,
  ): Observable<ResponseModel<string>> {
    return this.http.post<ResponseModel<string>>(
      `${environment.baseURL}Login/ResetPassword`,
      payload,
    );
  }
}
