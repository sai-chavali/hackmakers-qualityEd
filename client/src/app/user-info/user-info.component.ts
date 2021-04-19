import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service'
import {Observable} from 'rxjs';
import {User} from '../models'

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  userData$: Observable<User>;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userData$ = this.userService.getUserData();
  }

}
