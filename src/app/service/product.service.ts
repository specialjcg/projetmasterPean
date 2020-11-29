import { Injectable } from '@angular/core';
import {Product} from '../../model/product';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
const API = '/api/products';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {

  }

  get(): Observable<any> {
    return this.http.get(API);
  }

  add(data: Product): Observable<any> {
    return this.http.post(API, data);
  }

  put(changed: Product): Observable<any> {
    return this.http.put(`${API}/${changed._id}`, changed);
  }


  delete(selected: string): Observable<any> {
    return this.http.delete(`${API}/${selected}`);
  }


}
