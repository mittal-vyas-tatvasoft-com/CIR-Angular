import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CultureModel } from '../../common/interfaces/culture.interface';
import { ResponseModel } from '../../common/interfaces/response.interface';

@Injectable({
  providedIn: 'root',
})
export class CommonRepositoryService {
  constructor(private http: HttpClient) {}

  getCultureList(): Observable<ResponseModel<CultureModel[]>> {
    return this.http.get<ResponseModel<CultureModel[]>>(
      `${environment.baseURL}Common/GetCultures`,
    );
  }
}
