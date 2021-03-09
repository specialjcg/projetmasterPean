import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Product} from '../../model/product';
import {HttpClient} from '@angular/common/http';
import {ProductService} from '../service/product.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-product-edition',
  templateUrl: './product-edition.component.html',
  styleUrls: ['./product-edition.component.css']
})
export class ProductEditionComponent implements OnInit {
  name = '';
  formule = '';
  image = '';
  createdAt = new FormControl(new Date());
  public newProduct: Product;
  private products: Product[];

  constructor(private http: HttpClient, private productService: ProductService, private route: ActivatedRoute) {
    const time = new Date(Date.now());
    this.newProduct = {id: 0, name: '', job: '',  id_lyon: 1,imageBase64: '', updateAt: time, createdAt: time};
  }

  modifyCustomer(): void {
    this.productService
      .put(this.newProduct)
      .subscribe(() => {
        const time = new Date(Date.now());
        this.newProduct = {id: 0, name: '', job: '',  id_lyon: 1,imageBase64: '', updateAt: time, createdAt: time}; // clear input form value
        this.image = '';
      });
  }

  ngOnInit() {
    this.getTodos();

  }

  getTodos(): Subscription {

    return this.productService
      .get()
      .subscribe((todos: Product[]) => {
        const id = parseInt(this.route.snapshot.paramMap.get('id'), 0) - 1;

        this.products = todos.sort((a, b) => a.id - b.id);

        this.newProduct.id = this.products[id].id;
        this.newProduct.name = this.products[id].name;
        this.newProduct.job = this.products[id].job;
        this.newProduct.id_lyon = 1;
        this.newProduct.imageBase64 = this.products[id].imageBase64;
      });
  }

  base64ToDataUri(base64) {
    return 'data:image/png;base64,' + base64;
  }

}
