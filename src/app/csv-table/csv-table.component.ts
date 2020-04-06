import { Component, Input, ViewChild, OnInit } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'

@Component({
    selector: 'app-csv-table',
    templateUrl: './csv-table.component.html',
    styleUrls: ['./csv-table.component.css'],
})
export class CsvTableComponent implements OnInit{
  @Input() data: Array<Array<string>>
  @Input() headers: Array<string>
  dataSource: MatTableDataSource<any>


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit(): void {
      this.dataSource = new MatTableDataSource(this.data)
      this.dataSource.paginator = this.paginator
  }
}
