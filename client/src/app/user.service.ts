import { Injectable } from '@angular/core';
import {HttpService} from './http.service';
import {User} from './models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpService) { }

  getUserData() {
    return this.httpService.get<User>('user', null);
  }

  updateUserData(userData) {
    return this.httpService.post<User>('user/update', userData);
  }
}
