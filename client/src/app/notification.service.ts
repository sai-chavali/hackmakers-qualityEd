import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {MatSnackBarConfig} from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    static readonly config: MatSnackBarConfig = {
        duration: 5000,
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
    };

    private notification: Subject<string> = new Subject();
    notification$ = this.notification.asObservable();


    constructor() {
    }

    show(message) {
        this.notification.next(message);
    }

}

