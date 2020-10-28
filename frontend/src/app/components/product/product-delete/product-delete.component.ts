import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from './../product.model';
import { ProductService } from './../product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: Product

  constructor(
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const productId = +this.activatedRoute.snapshot.paramMap.get('id')
    this.productService.readProductById(productId)
      .subscribe(product => {
        this.product = product
      })
  }

  deleteProduct(): void {
    this.productService.deleteProduct(this.product.id)
      .subscribe(() => {
        this.productService.showMessage('Produto excluído com sucesso!!!')
        this.goToProduct()
      })
  }

  cancelProduct(): void {
    this.goToProduct()
  }

  goToProduct(): void {
    this.router.navigate(['/products'])
  }

}
