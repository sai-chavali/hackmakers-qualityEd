import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from './page';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getPage(page: string): Observable<Page> {
    console.log("service for active courses")
    return this.http.get<Page>(`/assets/examples/${page}.json`);
  }
}
