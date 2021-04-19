import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AvatarType } from '../shared/avatar/avatartype';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-abot',
  templateUrl: './abot.component.html',
  styleUrls: ['./abot.component.scss']
})
export class AbotComponent implements OnInit {

  currentavatar$: Observable<AvatarType>;
  constructor(private dataService: DataService) { 
    this.currentavatar$ = this.dataService.avatar.asObservable();
  }

  ngOnInit(): void {

  }

}
