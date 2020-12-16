import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Order} from '../../model/Order';
import {OrdersService} from '../service/orders.service';
import {Product} from '../../model/product';
import {ProductService} from '../service/product.service';

@Component({
  selector: 'app-order-product',
  templateUrl: './order-product.component.html',
  styleUrls: ['./order-product.component.css']
})
export class OrderProductComponent implements OnInit {

  loading = true;
  products: Product[] = [];

  displayedColumns = ['id', 'id_product', 'Quantity', 'state', 'updated_at', 'finish_at', 'operations'];
  pageSize = 6;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public orders: Order[];
  dataSource: MatTableDataSource<Order>;

  indexRow = 0;
  private path: string;

  constructor(private http: HttpClient, private productService: ProductService, private router: Router, private orderService: OrdersService, private route: ActivatedRoute) {

  }


  deleteCustomer(id): void {
    this.orderService.delete(id).subscribe();
    this.ngOnInit();
  }

  editCustomer(id): void {
    this.router.navigate(['/order-edition', id]);
  }


  ngOnInit(): void {
    this.getListProduct();

  }


  trackByFn(index): number {
    return index;
  }

  getListProduct(): Subscription {

    return this.productService
      .get()
      .subscribe((todos: Product[]) => {

        this.products = todos;
        this.route.params.subscribe(params => {
          this.path = params.status;
          this.getTodos();
          this.dataSource = new MatTableDataSource<Order>(this.orders);
          this.loading = false;

        });
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  getTodos(): Subscription {

    return this.orderService
      .get()
      .subscribe((todos: Order[]) => {
        this.orders = todos.sort((a, b) => (a.id - b.id));
      });
  }


}
