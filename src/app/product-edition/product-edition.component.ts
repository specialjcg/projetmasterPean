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

    this.newProduct = {id: 0, name: '', job: '', imageBase64: ''};
  }

  modifyCustomer(): void {
    this.productService
      .put(this.newProduct)
      .subscribe(() => {
        this.newProduct = {id: 0, name: '', job: '', imageBase64: ''}; // clear input form value
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
        const id = parseInt(this.route.snapshot.paramMap.get('id'), 0);

        this.products = todos;
        this.newProduct._id = this.products[id - 1]._id;
        this.newProduct.id = this.products[id - 1].id;
        this.newProduct.name = this.products[id - 1].name;
        this.newProduct.job = this.products[id - 1].job;
        this.newProduct.imageBase64 = this.products[id - 1].imageBase64;
      });
  }

  base64ToDataUri(base64) {
    return 'data:image/png;base64,' + base64;
  }

}
