import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from './../product.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

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

  updateProduct(): void {
    this.productService.updateProduct(this.product)
      .subscribe(() => {
        this.productService.showMessage('Produto atualizado com sucesso!!!')
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
