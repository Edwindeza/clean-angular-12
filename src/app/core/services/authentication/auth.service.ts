
// Core
import { Injectable } from '@angular/core';
import { environment } from '@env/environment.prod';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Login } from '@core/interfaces/login';
import { take, Subscriber } from 'rxjs';

// Services
import { HttpClienteService } from '@core/services/http-cliente.service';
import { LocalStorageService } from '@core/services/local-storage.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  getFondOrigin() {
    throw new Error("Method not implemented.");
  }

  private token:string;
  private url = environment.apiURL;
  private obsIsLoggedIn: Observable<boolean>;
  private subscriberIsLoggedIn: Subscriber<boolean> | undefined;
  user : any;

  constructor(
    public router: Router,
    private _http: HttpClienteService,
    private _localStorageService:LocalStorageService,
  ) {
    this.token = this.getToken();
    this.obsIsLoggedIn = new Observable((subscriber) => {
      this.subscriberIsLoggedIn = subscriber;
      this.subscriberIsLoggedIn && this.subscriberIsLoggedIn.next(this.isLoggedIn())
    })
  }

  subscribeIsLoggedIn(): Observable<boolean>{
    return this.obsIsLoggedIn
  }

  pushIsLoggedIn(): void{
    console.log("Push is loggedin")
    this.subscriberIsLoggedIn && this.subscriberIsLoggedIn.next(this.isLoggedIn());
  }

  getToken(): string {
    const token = this._localStorageService.getItem('token');
    return token;
  }
  setToken(token: string) {
    // console.log('token recibido', token)
    this._localStorageService.setItem('token', token);
    this.token = this.getToken();
    if(token) this.pushIsLoggedIn();
  }
  removeToken() {
    this._localStorageService.removeItem('token');
    this.token = this.getToken();
  }

  getUser() {
    const user = this._localStorageService.getItem('user');
    return user;
  }
  setUser(obj: any) {
    this._localStorageService.setItem('user', obj);
    this.user = this.getUser();
  }
  removeUser() {
    this._localStorageService.removeItem('user');
    this.user = this.getUser();
  }


  login(obj: Login): Observable<any>  {
    const query = `${this.url}/authentication/login`;
    const data = JSON.stringify({
      body: obj,
    });
    // console.log('body',data);
    return this._http.post(query, data);
  }

  logout() {
    this.removeToken();
    this.removeUser();
    this.pushIsLoggedIn();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return token !== null
  }

}
