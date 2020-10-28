import { Observable, of as observableOf, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Product } from '../product.model';

// TODO: replace this with real data from your application
const EXAMPLE_DATA: Product[] = [
  {id: 1, name: 'Geladeira', price: 1874.41},
  {id: 2, name: 'Notebook', price: 6699.90},
  {id: 3, name: 'Televisão', price: 4520.65},
  {id: 4, name: 'Sofá', price: 4025.52},
  {id: 5, name: 'Cama', price: 855.41},
  {id: 6, name: 'Mesa', price: 251.44},
  {id: 7, name: 'Cadeira', price: 548.87},
  {id: 8, name: 'Ferro de Passar', price: 74.55},
  {id: 9, name: 'Máquina de Lavar', price: 1800.00},
  {id: 10, name: 'Impressora', price: 899.90},
  {id: 11, name: 'Roteador', price: 524.88},
  {id: 12, name: 'Modem', price: 355.63},
  {id: 13, name: 'Lâmpada', price: 12.25},
  {id: 14, name: 'Mouse', price: 75.00},
  {id: 15, name: 'Teclado', price: 89.90},
  {id: 16, name: 'Monitor', price: 1659.89},
  {id: 17, name: 'Ventilador', price: 55.65},
  {id: 18, name: 'Ar Condicionado', price: 1589.52},
  {id: 19, name: 'Controle PS4', price: 200.00},
  {id: 20, name: 'PS4', price: 3900.99},
];

/**
 * Data source for the ProductRead2 view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ProductRead2DataSource extends DataSource<Product> {
  data: Product[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Product[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Product[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Product[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
