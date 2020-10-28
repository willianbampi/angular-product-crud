import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient } from '@angular/common/http'
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = 'http://localhost:3001/products'

  constructor(
    private matSnackBar: MatSnackBar,
    private httpClient: HttpClient
  ) { }

  createProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.baseUrl, product)
      .pipe(map(obj => obj), catchError(error => this.errorHandler(error)))
  }

  readProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.baseUrl)
      .pipe(map(obj => obj), catchError(error => this.errorHandler(error)))
  }

  readProductById(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`
    return this.httpClient.get<Product>(url)
    .pipe(map(obj => obj), catchError(error => this.errorHandler(error)))
  }

  updateProduct(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`
    return this.httpClient.put<Product>(url, product)
    .pipe(map(obj => obj), catchError(error => this.errorHandler(error)))
  }

  deleteProduct(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`
    return this.httpClient.delete<Product>(url)
    .pipe(map(obj => obj), catchError(error => this.errorHandler(error)))
  }

  showMessage(message: string, isError: boolean = false): void {
    this.matSnackBar.open(
      message, 
      'X', 
      {
        duration: 3000, 
        horizontalPosition: "right", 
        verticalPosition: "top",
        panelClass: isError ? ['msg-error'] : ['msg-sucess']
      }    
    )
  }

  errorHandler(error: any): Observable<any> {
    this.showMessage('Ocorreu um erro!!!', true)
    return EMPTY
  }

}
