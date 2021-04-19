import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Page } from './page';
import { AvatarType } from '../shared/avatar/avatartype';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DataService {
 
  _avatar!: AvatarType;

  avatar:BehaviorSubject<AvatarType> = new BehaviorSubject<AvatarType>(this._avatar);

  constructor(private http: HttpClient) { }

  getPage(page: string): Observable<Page> {
    return this.http.get<Page>(`/assets/examples/${page}.json`);
  }

  getAvatars(): Observable<Array<AvatarType>> {
    return this.http.get<Array<AvatarType>>('/assets/avatars.json').pipe(
      map(res => {
        return res.map((item: any) => { return new AvatarType(item) })
      }))
  }

  setAvatar(avatar: AvatarType) {
    this._avatar = avatar;
    this.avatar.next(this._avatar);
  }
}
