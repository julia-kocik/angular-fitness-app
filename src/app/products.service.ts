import {Subject} from 'rxjs';

export class ProductsService {
    private products: string[] = [];
    productsUpdated = new Subject();

    addProduct(product: string) {
        this.products = [...this.products, product];
        this.productsUpdated.next(this.products);
    }

    getProducts() {
        return [...this.products]
    }

    deleteProduct(product: string) {
       this.products = this.products.filter(item => item !== product);
       this.productsUpdated.next(this.products);
    }
}