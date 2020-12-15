import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Order} from '../../model/Order';

const API = '/orders';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {


  constructor(private http: HttpClient) {

  }

  get(): Observable<any> {
    return this.http.get(API + '/all');
  }

  add(data: Order): Observable<any> {
    return this.http.post(API, data);
  }

  put(changed: Order): Observable<any> {
    return this.http.put(`${API}/${changed.id}`, changed);
  }


  delete(selected: string): Observable<any> {
    return this.http.delete(`${API}/${selected}`);
  }


}
