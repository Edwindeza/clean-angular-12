import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpClienteService {

  constructor(private http: HttpClient) { }

  get(url: string): Observable<any> {
    return this.http.get(url);
  }

  post(url: string, data: any): Observable<any> {
    return this.http.post(url, data);
  }
  postImg(url: string, data: any): Observable<any> {
    return this.http.post(url, data);
  }

  delete(url: string): Observable<any> {
    return this.http.delete(url);
  }

  put(url: string, data: any): Observable<any> {
    return this.http.put(url, data);
  }


  patch(url: string, data: any): Observable<any> {
    return this.http.patch(url, data);
  }

}
