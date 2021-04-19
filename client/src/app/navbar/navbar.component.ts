import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service'
import {Observable} from 'rxjs';
import {User} from '../models'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userData$: Observable<User>;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userData$ = this.userService.getUserData();
  }

}
