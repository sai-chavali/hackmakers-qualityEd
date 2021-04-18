import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {SpinnerInfo} from './spinner/spinner.service';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    public static readonly CACHE_INDICATOR_HEADER = 'X-DATA-CLIENT-CACHE';

    constructor(private httpClient: HttpClient, ) {
    }

    public static readonly TIMEOUT = 200;

    spinnerStatus = new BehaviorSubject<SpinnerInfo>({status: false});
    spinnerIndicator = this.spinnerStatus.asObservable();
    timeoutHandler: any;

    get<T = any>(url: string, queryParams?: HttpParams,
                 options: { description?: string, ignoreSpinner?: boolean, headers?: HttpHeaders, cache?: boolean } = {}) {

        // tslint:disable-next-line:variable-name
        if (!!!options.headers) {
            options.headers = new HttpHeaders();
        }

        if (!!!options.ignoreSpinner) {
            clearTimeout(this.timeoutHandler);
            this.timeoutHandler = setTimeout(() => this.spinnerStatus.next({
                status: true,
                text: options.description
            }), HttpService.TIMEOUT);
        }
        return this.httpClient.get<T>(`/api/${url}`, {
            params: queryParams,
            headers: options.headers
        }).pipe(
            finalize(() => {
                clearTimeout(this.timeoutHandler);
                this.spinnerStatus.next({status: false});
            })
        );
    }


    post<T = any>(url: string, data?: any,
                  options: {
                      description?: string,
                      ignoreSpinner?: boolean,
                      params?: HttpParams, headers?: HttpHeaders,
                      cache?: boolean
                  } = {}) {

        if (!!!options.headers) {
            options.headers = new HttpHeaders();
        }

        if (!!!options.ignoreSpinner) {
            clearTimeout(this.timeoutHandler);
            this.timeoutHandler = setTimeout(() => this.spinnerStatus.next({
                status: true,
                text: options.description
            }), HttpService.TIMEOUT);
        }
        return this.httpClient.post<T>(`/api/${url}`, data, {
            params: options.params,
            headers: options.headers
        }).pipe(
            finalize(() => {
                clearTimeout(this.timeoutHandler);
                this.spinnerStatus.next({status: false});
            })
        );
    }

}
