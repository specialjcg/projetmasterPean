import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {OrdersService} from '../service/orders.service';
import {Order} from '../../model/Order';
import {Product} from '../../model/product';
import {ProductService} from '../service/product.service';
import {Subscription} from 'rxjs';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit {
  @ViewChild('toggleGroup') toogle: string;
  @ViewChild('picker3') newDate: Date;
  createdAt = new FormControl(new Date());
  dateupdatedat = new FormControl(new Date());
  datefinishat = new FormControl(new Date());
  public newOrder: Order;
  isEnabled: true;
  products: Product[] = [];
  selected: any;
  private orders: Order[] = [];


  constructor(private http: HttpClient, private changeRef: ChangeDetectorRef,
              private orderService: OrdersService,
              private productService: ProductService, private route: ActivatedRoute) {


  }

  createOrder(): void {
    this.newOrder.id = Math.max(...this.orders.map((order => order.id))) + 1;
    this.orderService
      .add(this.newOrder)
      .subscribe(() => {
        const time = new Date(Date.now());
        this.newOrder = {id: 0, id_Product: 0, id_lyon: 1, state: '', quantity: 0, updated_at: time, finish_at: time}; // clear input form value
      });
  }

  ngOnInit() {
    const time = new Date(Date.now());
    this.newOrder = {id: 0, id_Product: 0, id_lyon: 1, state: '', quantity: 0, updated_at: time, finish_at: time}; // clear input form value
    this.toogle = this.newOrder.state;
    this.getListOrder();
    this.getListProduct();

  }

  ngAfterViewChecked(): void {
    this.changeRef.detectChanges();
  }

  getListOrder(): Subscription {

    return this.orderService
      .get()
      .subscribe((todos: Order[]) => {

        this.orders = todos;


      });
  }

  getListProduct(): Subscription {

    return this.productService
      .get()
      .subscribe((todos: Product[]) => {

        this.products = todos;
      });
  }

  changeState(value: string): void {
    this.newOrder.state = value;

  }


  changeProductName(): void {
    this.newOrder.id_Product = this.products.findIndex(val => val.name === this.selected) + 1;

  }

  addEventupdatedat(event: MatDatepickerInputEvent<Date>): void {
    this.newOrder.updated_at = new Date(event.value);

  }

  addEventfinishat(event: MatDatepickerInputEvent<Date>): void {
    this.newOrder.finish_at = new Date(event.value);

  }


}
