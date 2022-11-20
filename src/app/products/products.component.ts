import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  productName="";
  products: string[] = []
  private productsSubscription!: Subscription;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsSubscription = this.productsService.productsUpdated.subscribe(() => {
      this.products = this.productsService.getProducts();
    });
  }

  onAddProduct(form: any) {
    if(form.valid) {
      this.productsService.addProduct(form.value.productName)
    }
    form.reset()
  }

  onRemoveProduct(product: string) {
    this.productsService.deleteProduct(product)
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }
 }
