import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../../../environments/environment';
import { GlobalConfigurationFonts } from '../../fonts/interfaces/fonts.interface';
import { ResponseModel } from 'src/app/shared/common/interfaces/response.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FontsService {
  constructor(private http: HttpClient) { }

  getFontList(): Observable<ResponseModel<GlobalConfigurationFonts[]>> {
    return this.http.get<ResponseModel<GlobalConfigurationFonts[]>>(
      environment.baseURL + 'GlobalConfigurationFonts',
    );
  }

  saveFont(fonts: GlobalConfigurationFonts[]) {
    return this.http.post<ResponseModel<GlobalConfigurationFonts[]>>(
      environment.baseURL + 'GlobalConfigurationFonts/Create',
      fonts,
    );
  }

  updateFonts(fonts: GlobalConfigurationFonts[]) {
    return this.http.put<ResponseModel<GlobalConfigurationFonts[]>>(
      environment.baseURL + 'GlobalConfigurationFonts/Update',
      fonts,
    );
  }
}

