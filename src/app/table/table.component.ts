import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort , MatDialog, MatTableDataSource } from '@angular/material';
import { TableDataSource, EXAMPLE_DATA } from './table-datasource';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit  {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
   // dataSource: TableDataSource;

  public dataSource = new MatTableDataSource<any>();

  constructor(private dialog: MatDialog) {
 
    
  }
  

  
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['icon', 'firstname','lastname',
   'address', 'city', 'state', 'ordertotal' ];

  ngOnInit() {
  
    this.dataSource.data = EXAMPLE_DATA ;
    this.dataSource.sort = this.sort;
   // this.dataSource = new TableDataSource(this.paginator, this.sort);
  }

openAdduser() {

  this.dialog.open(AddUserComponent, {width: '400px' , height: '800px'})
}

doFilter(value: string) {
  // filterValue = filterValue.trim(); // Remove whitespace
  // filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
  this.dataSource.filter = value.trim().toLocaleLowerCase();

}
ngAfterViewInit(): void {
  this.dataSource.sort = this.sort;
}


}
