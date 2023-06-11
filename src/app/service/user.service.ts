import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = 'http://127.0.0.1:8000/api/';
  constructor(private _httpClient: HttpClient) { }
  get_all_product(): Observable<any> {
    return this._httpClient.get<any>(this.API_URL + 'products/')};
  get_product(id: number): Observable<any> {
    return this._httpClient.get<any>(this.API_URL + 'products/' + id, )
  }
  get_all_category(): Observable<any> {
    return this._httpClient.get<any>(this.API_URL + 'categorys/')};
  get_category(id: number): Observable<any> {
    return this._httpClient.get<any>(this.API_URL + 'categorys/' + id, )
  }
  get_category_product(id: number): Observable<any> {
    return this._httpClient.get<any>(this.API_URL + 'category_products/' + id, )
  }
  check_out(data: any): Observable<any> {
    return this._httpClient.post<any>(this.API_URL + 'order/' , data )
  }
  get_all_new(): Observable<any> {
    return this._httpClient.get<any>(this.API_URL + 'new/')};
  get_new(id: number): Observable<any> {
    return this._httpClient.get<any>(this.API_URL + 'new/' + id, )
  }
  get_new_home(): Observable<any> {
    return this._httpClient.get<any>(this.API_URL + 'new-home/')};
   
}
