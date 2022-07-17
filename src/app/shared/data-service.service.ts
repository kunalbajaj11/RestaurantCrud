import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private backEndBaseRoute = 'http://localhost:3000/'
  constructor(private _http: HttpClient) { }

  postRestuarant (data) {
    return this._http.post(`${this.backEndBaseRoute}posts`, data);
  }

  getRestuarant () {
    return this._http.get(`${this.backEndBaseRoute}posts`);
  }

  deleteRestuarant (id) {
    return this._http.delete(`${this.backEndBaseRoute}posts/${id}`);
  }

  updateRestuarant (id, data) {
    return this._http.put(`${this.backEndBaseRoute}posts/${id}`, data);
  }
}
