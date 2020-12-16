import {Component, OnInit, ViewChild} from '@angular/core';
import {Product} from '../../model/product';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ProductService} from '../service/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {


  loading = true;


  displayedColumns = ['id', 'name', 'formule', 'image', 'operations'];
  pageSize = 5;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public products: Product[];
  dataSource: MatTableDataSource<Product>;
  base64 = 'data:image/png;base64,';
  indexRow = 0;
  private path: string;
  private choose: any;

  constructor(private http: HttpClient, private router: Router, private productService: ProductService, private route: ActivatedRoute) {

  }

  deleteCustomer(id): void  {
    this.productService.delete(id).subscribe();
    this.ngOnInit();
  }

  editCustomer(id): void  {
    this.router.navigate(['/product-edition', id]);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.path = params.status;
      this.getTodos();
      this.dataSource = new MatTableDataSource<Product>(this.products);
      this.loading = false;

    });
  }

  handleInputChange(e): void {
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    const pattern = /image-*/;
    const reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this.handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);

  }

  trackByFn(index): number {
    return index;
  }

  handleReaderLoaded(e): void {
    const reader = e.target;
    this.compressImage(reader.result, 200, 100).then(compressed => {
      if (typeof compressed === 'string') {

        this.changeImage(compressed);
      }
    });
  }

  compressImage(src, newX, newY): Promise<any> {
    return new Promise((res, rej) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        const elem = document.createElement('canvas');
        elem.width = newX;
        elem.height = newY;
        const ctx = elem.getContext('2d');
        ctx.drawImage(img, 0, 0, newX, newY);
        const data = ctx.canvas.toDataURL();
        res(data);
      };
      img.onerror = error => rej(error);
    });
  }

  modifyProduct(newProduct): void {
    this.productService
      .put(newProduct)
      .subscribe();
  }

  getTodos(): Subscription {

    return this.productService
      .get()
      .subscribe((todos: Product[]) => {
        this.products = todos.sort((a, b) => (a.id - b.id));
      });
  }


  base64ToDataUri(base64): string {
    return 'data:image/png;base64,' + base64;
  }

  changeImage(image: string): void {
    this.products[this.choose - 1].imageBase64 = image.split(';base64,')[1];
    this.modifyProduct(this.products[this.choose - 1]);

  }

  getRecord(row: any): void {

    this.choose = row;
  }
}
