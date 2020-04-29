import { DialogBoxComponent } from './../dialog-box/dialog-box.component'
import { Component, Input, ViewChild, OnInit } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource, MatTable } from '@angular/material/table'
import { MatDialog } from '@angular/material/dialog'

@Component({
    selector: 'app-csv-table',
    templateUrl: './csv-table.component.html',
    styleUrls: ['./csv-table.component.css'],
})
export class CsvTableComponent implements OnInit{
  @Input() data: Array<Array<string>>
  @Input() headers: Array<string>
  dataSource: MatTableDataSource<any>


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator
  @ViewChild(MatTable,{static:true}) table: MatTable<any>


  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
      this.dataSource = new MatTableDataSource(this.data)
      this.dataSource.paginator = this.paginator
  }

  openDialog(action, obj) {
      obj.action = action
      const dialogRef = this.dialog.open(DialogBoxComponent, {
          width: '250px',
          data:obj
      })

      dialogRef.afterClosed().subscribe(result => {
          if(result.event == 'Add'){
              this.addRowData()
          }else if(result.event == 'Update'){
              this.updateRowData(result.data)
          }else if(result.event == 'Delete'){
              this.deleteRowData(result.data)
          }
      })
  }

  addRowData(){
      const d = this.headers.map(() => '')
      this.data.push(d)
      this.table.renderRows()

  }
  updateRowData(rowIndex){
      // this.data = this.data.filter((value, key)=>{
      //     if(value.id == rowIndex.id){
      //         value.name = rowIndex.name
      //     }
      //     return true
      // })
  }
  deleteRowData(rowIndex){
      this.data = this.data.splice(rowIndex, 1)
  }
}
