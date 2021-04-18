import { Injectable } from '@angular/core';


export interface SpinnerInfo {
  text?: string;
  status: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor() { }
}
