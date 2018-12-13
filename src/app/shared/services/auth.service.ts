import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SignUpModel} from '../models/sign-up.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signUp(data: SignUpModel) {
    return this.http.post('users', data);
  }
}
