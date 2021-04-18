import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  user: any = null;
  subscription: Subscription;

  constructor(public authService: AuthService) { 
    this.subscription = authService.authState.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
}

}
