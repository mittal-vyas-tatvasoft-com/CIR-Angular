import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CultureModel } from '../../../../shared/common/interfaces/culture.interface';
import { ResponseModel } from '../../../../shared/common/interfaces/response.interface';
import { environment } from '../../../../../environments/environment';
import { Email } from '../interface/emails.interface';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor(private http: HttpClient) {}

  getEmails(cultureId: number): Observable<ResponseModel<Email[]>> {
    return this.http.get<ResponseModel<Email[]>>(
      `${environment.baseURL}GlobalConfigurationEmails/${cultureId}`,
    );
  }

  saveEmails(emails: Email[]) {
    return this.http.post<ResponseModel<Email[]>>(
      `${environment.baseURL}GlobalConfigurationEmails/create`,
      emails,
    );
  }

  getCultureList(): Observable<ResponseModel<CultureModel[]>> {
    return this.http.get<ResponseModel<CultureModel[]>>(
      `${environment.baseURL}Common/GetCultures`,
    );
  }
}
