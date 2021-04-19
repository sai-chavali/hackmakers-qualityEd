import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../auth.service';
import {NotificationService} from '../notification.service';
import {UserService} from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  profile_pic: string;
  formDataAvailable = false;


  constructor(private fb: FormBuilder,
    private userService: UserService,
    private notificationService: NotificationService,
    private authService: AuthService) { }

  initializeFormWithData() {
    return this.userService.getUserData().subscribe(res => {
        this.formDataAvailable = true;
        this.profile_pic = res.PROFILE_PIC;
        this.profileForm = this.fb.group({
            first_name: new FormControl({value: res.NAME, disabled: false}),
            last_name: new FormControl({value: res.LAST_NAME, disabled: true}),
            email: [{value: res.EMAILID, disabled: true}]
        });
    });
  }

  ngOnInit(): void {
    this.initializeFormWithData();
  }

  save() {
    this.userService.updateUserData(this.profileForm.getRawValue()).subscribe(() => {
        this.notificationService.show('Updated Successfully!');
    }, err => {
        console.log('some error ', err);
    });
  }

  signOut() {
    this.authService.signOut();
  }

}
