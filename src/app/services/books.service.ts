import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from 'src/app/models/book.models';
import { Endpoints } from 'src/app/models/books-service.models';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private BASE_URL: string = 'https://fakerestapi.azurewebsites.net/api/v1/';
  private ENDPOINTS = Endpoints;

  constructor(public http: HttpClient) {}

  public getAllBooks() {
    return this.http.get<Book[]>(this.createUrl(this.ENDPOINTS.Books))
  }

  private createUrl(endpoint: string) {
    return this.BASE_URL + '/' + endpoint;
  }
}
