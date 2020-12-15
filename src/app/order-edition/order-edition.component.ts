import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {OrdersService} from '../service/orders.service';
import {Order} from '../../model/Order';
import {ProductService} from '../service/product.service';
import {Product} from '../../model/product';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';


@Component({
  selector: 'app-order-edition',
  templateUrl: './order-edition.component.html',
  styleUrls: ['./order-edition.component.css'],

})

export class OrderEditionComponent implements OnInit {
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
              private productService: ProductService, private router: Router, private route: ActivatedRoute) {
    const time = new Date(Date.now());
    this.newOrder = {id: 0, id_Product: 0, state: '', quantity: 0, updated_at: time, finish_at: time}; // clear input form value
  }

  modifyOrder(): void {
    this.orderService
      .put(this.newOrder)
      .subscribe(() => {
        const time = new Date(Date.now());
        this.selected = '';
        this.newOrder = {id: 0, id_Product: 0, state: '', quantity: 0, updated_at: time, finish_at: time}; // clear input form value
      });
    this.router.navigate(['/product-order']);
  }

  ngOnInit() {
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
        const id = parseInt(this.route.snapshot.paramMap.get('id'), 0);

        this.orders = todos;
        this.newOrder.id = this.orders[id].id;
        this.newOrder.id_Product = this.orders[id].id_Product;
        this.newOrder.quantity = this.orders[id].quantity;
        this.newOrder.state = this.orders[id].state;
        this.newOrder.updated_at = this.orders[id].updated_at;
        this.dateupdatedat = new FormControl(this.newOrder.updated_at);

        this.newOrder.finish_at = this.orders[id].finish_at;
        this.datefinishat = new FormControl(this.newOrder.finish_at);

      });
  }

  getListProduct(): Subscription {

    return this.productService
      .get()
      .subscribe((todos: Product[]) => {

        this.products = todos;
        this.selected = this.products[this.newOrder.id_Product - 1].name;
      });
  }

  changeState(value: string): void {
    this.newOrder.state = value;

  }


  changeProductName(): void {
    this.newOrder.id_Product = this.products.findIndex(val => val.name === this.selected) + 1;
    this.modifyOrder();
  }

  addEventupdatedat(event: MatDatepickerInputEvent<Date>): void {
    this.newOrder.updated_at = new Date(event.value);
    this.modifyOrder();
  }

  addEventfinishat(event: MatDatepickerInputEvent<Date>): void {
    this.newOrder.finish_at = new Date(event.value);
    this.modifyOrder();
  }
}
