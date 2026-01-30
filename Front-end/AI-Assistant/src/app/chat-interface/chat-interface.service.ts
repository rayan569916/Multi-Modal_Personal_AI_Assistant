import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BaseURL} from './../config/config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class chatInterfaceService {
    constructor(private http: HttpClient) {}

    sendChatMethod(formData:FormData):Observable<any>{
       return this.http.post(`${BaseURL}/ai/chatRequest`,formData)
    }
}