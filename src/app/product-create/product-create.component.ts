import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ProductService} from '../service/product.service';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../model/product';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  name = '';
  formule = '';
  image = '';
  createdAt = new FormControl(new Date());
  public newProduct: Product;
  private products: Product[];

  constructor(private http: HttpClient, private productService: ProductService, private route: ActivatedRoute) {


  }

  createCustomer(): void {
    this.newProduct.id = Math.max(...this.products.map(product => product.id)) + 1;
    this.productService
      .add(this.newProduct)
      .subscribe(() => {
        const time = new Date(Date.now());
        this.newProduct = {id: 0, name: '', job: '', imageBase64: '', updateAt: time, createdAt: time}; // clear input form value
        this.image = '';
      });
  }

  getTodos(): Subscription {

    return this.productService
      .get()
      .subscribe((todos: Product[]) => {
        this.products = todos;
      });
  }

  ngOnInit() {
    this.getTodos();
    const time = new Date(Date.now());
    this.newProduct = {id: 0, name: '', job: '', imageBase64: '', updateAt: time, createdAt: time};
  }

}
