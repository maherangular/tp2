import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface TableItem {
  name: string;
  id: number;
}

// TODO: replace this with real data from your application
export const EXAMPLE_DATA: any[] = [
  {icon:'fas fa-female', firstname: 'Michelle', lastname:'Avery'
   , address:'346 Creder' , city:'Dallas' , state:"Texas",ordertotal:'12452222' },
   {icon:'fas fa-male', firstname: 'Walid', lastname:'Beli'
   , address:'12 Ocean' , city:'Dallas' , state:"Texas",ordertotal:'5454121' },
   {icon:'fas fa-female', firstname: 'Monia', lastname:'Moussa'
   , address:'Tunis' , city:'Tunis' , state:"Texas",ordertotal:'12452222' },
   {icon:'fas fa-male', firstname: 'Moahmed', lastname:'Boua'
   , address:'Rades' , city:'Rades' , state:"Rades",ordertotal:'523654' },
   {icon:'fas fa-female', firstname: 'Sonia', lastname:'Gouba'
   , address:'Tunis' , city:'Tunis' , state:"Tunis",ordertotal:'4755' },
   {icon:'fas fa-female', firstname: 'Michelle', lastname:'Avery'
   , address:'346 Creder' , city:'Dallas' , state:"Texas",ordertotal:'12452222' },
   {icon:'fas fa-male', firstname: 'Walid', lastname:'Beli'
   , address:'12 Ocean' , city:'Dallas' , state:"Texas",ordertotal:'5454121' },
   {icon:'fas fa-female', firstname: 'Monia', lastname:'Moussa'
   , address:'Tunis' , city:'Tunis' , state:"Texas",ordertotal:'12452222' },
   {icon:'fas fa-male', firstname: 'Moahmed', lastname:'Boua'
   , address:'Rades' , city:'Rades' , state:"Rades",ordertotal:'523654' },
   {icon:'fas fa-female', firstname: 'Sonia', lastname:'Gouba'
   , address:'Tunis' , city:'Tunis' , state:"Tunis",ordertotal:'4755' },
   {icon:'fas fa-female', firstname: 'Sonia', lastname:'Gouba'
   , address:'Tunis' , city:'Tunis' , state:"Tunis",ordertotal:'4755' },
   {icon:'fas fa-female', firstname: 'Michelle', lastname:'Avery'
   , address:'346 Creder' , city:'Dallas' , state:"Texas",ordertotal:'12452222' },
   {icon:'fas fa-male', firstname: 'Walid', lastname:'Beli'
   , address:'12 Ocean' , city:'Dallas' , state:"Texas",ordertotal:'5454121' },
   {icon:'fas fa-female', firstname: 'Monia', lastname:'Moussa'
   , address:'Tunis' , city:'Tunis' , state:"Texas",ordertotal:'12452222' },
   {icon:'fas fa-male', firstname: 'Moahmed', lastname:'Boua'
   , address:'Rades' , city:'Rades' , state:"Rades",ordertotal:'523654' },
   {icon:'fas fa-female', firstname: 'Sonia', lastname:'Gouba'
   , address:'Tunis' , city:'Tunis' , state:"Tunis",ordertotal:'4755' },
  
 
];

/**
 * Data source for the Table view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TableDataSource extends DataSource<TableItem> {
  data: TableItem[] = EXAMPLE_DATA;

  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<TableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginator's length
    this.paginator.length = this.data.length;

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
  private getPagedData(data: TableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: TableItem[]) {
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
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
