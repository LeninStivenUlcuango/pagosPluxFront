import { Injectable } from '@angular/core';
import  environment  from 'src/environments/environment';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Response } from '../Models/Response';
import { LoginI, User } from '../Models/Users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly tokenKey = 'auth_token';

  private url=environment.URL+'login'
  constructor(private httpClient:HttpClient) { }

  login(credentials:LoginI):Observable<Response<string>>{
    return this.httpClient.post<Response<string>>(this.url,credentials, { withCredentials: true });
  }

   // Guardar el token en Session Storage
   SetToken(token: string) {
    sessionStorage.setItem(this.tokenKey, token);
  }

  //Obtener token
  GetToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  //Verificar si hay token
  isAutenticate():boolean{
    const existToken=sessionStorage.getItem(this.tokenKey);
    if(existToken){
      return true;
    }
    return false;
  }
}
