import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VietnamApiService {
  private host = "https://provinces.open-api.vn/api/";

  constructor(private http: HttpClient) {}

  getProvinces(): Observable<any> {
    return this.http.get(this.host);
  }

  getDistricts(provinceCode: string): Observable<any> {
    return this.http.get(`${this.host}p/${provinceCode}?depth=2`);
  }

  getWards(districtCode: string): Observable<any> {
    return this.http.get(`${this.host}d/${districtCode}?depth=2`);
  }
}
