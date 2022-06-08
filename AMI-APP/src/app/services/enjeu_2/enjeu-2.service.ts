import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Enjeu_2 } from './enjeu_2';

@Injectable({
  providedIn: 'root'
})
export class Enjeu2Service {

  // Node-Express API
  REST_API: string = 'http://localhost:4002/';
  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient) {}
  // Create
  AddUser(data: Enjeu_2): Observable<any> {
    let API_URL = `${this.REST_API}enjeu2`;
    return this.httpClient
      .post(API_URL, data)
      .pipe(catchError(this.handleError));
  }
  // Get all users
  GetUsers() {
    return this.httpClient.get<any>(`${this.REST_API}enjeu2`);
  }
  // Get single user
  GetUser(id: any): Observable<any> {
    let API_URL = `${this.REST_API}enjeu2/${id}`;
    return this.httpClient.get<any>(API_URL, { headers: this.httpHeaders }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }
  // Update
  updateUser(id: any, data: any): Observable<any> {
    let API_URL = `${this.REST_API}enjeu2-update/${id}`;
    return this.httpClient
      .put(API_URL, data, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }
  // Delete
  deleteUser(id: any): Observable<any> {
    let API_URL = `${this.REST_API}enjeu2-delete/${id}`;
    return this.httpClient
      .delete(API_URL, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }
  // Error
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
