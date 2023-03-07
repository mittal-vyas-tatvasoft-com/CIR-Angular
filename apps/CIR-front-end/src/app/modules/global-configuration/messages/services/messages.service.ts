import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import {
  GlobalMessagesModel,
  GlobalConfigurationMessages,
} from '../interfaces/message.interface';
import { ResponseModel } from '../../../../shared/common/interfaces/response.interface';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  constructor(private http: HttpClient) {}

  getMessages(
    cultureId: number,
  ): Observable<ResponseModel<GlobalMessagesModel[]>> {
    return this.http.get<ResponseModel<GlobalMessagesModel[]>>(
      environment.baseURL + 'GlobalConfigurationMessages/' + cultureId,
    );
  }

  updateMessages(messages: GlobalConfigurationMessages[]) {
    return this.http.put<ResponseModel<GlobalMessagesModel[]>>(
      environment.baseURL + 'GlobalConfigurationMessages/Update',
      messages,
    );
  }
}
