import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable} from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError as observableThrowError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }


  private static handleError(error: HttpErrorResponse) {
    return observableThrowError(error);
  }

  getEncryptedData(message: string): Observable<any> {
    const headers = new HttpHeaders().set(
      "Content-Type", "application/json"
    );
    let params = new HttpParams();
    params = params.append('message', message);
    return this.http.get<any>('/encryptMsg', {headers: headers, params: params }).pipe(
      catchError(DataService.handleError));
  }

  getEncodedData(encryptedMessage: string){
    const headers = new HttpHeaders().set(
      "Content-Type", "application/json"
    );
    let params = new HttpParams();
    params = params.append('message', encryptedMessage);
    return this.http.get<any>('/encodeMsg', {headers: headers, params: params }).pipe(
      catchError(DataService.handleError));
  };

  getDecodedData(encodedMessage: string){
    const headers = new HttpHeaders().set(
      "Content-Type", "application/json"
    );
    let params = new HttpParams();
    params = params.append('message', encodedMessage);
    return this.http.get<any>('/decodeMsg', {headers: headers, params: params }).pipe(
      catchError(DataService.handleError));
  };

  getDecryptedData(decodedMessage: string) {
    const headers = new HttpHeaders().set(
      "Content-Type", "application/json"
    );
    let params = new HttpParams();
    params = params.append('message', decodedMessage);
    return this.http.get<any>('/decryptMsg', {headers: headers, params: params }).pipe(
      catchError(DataService.handleError));
  };

}
