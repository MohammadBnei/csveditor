import { DialogBoxComponent } from './../dialog-box/dialog-box.component'
import { Component, Input, ViewChild, OnInit } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource, MatTable } from '@angular/material/table'
import { MatDialog } from '@angular/material/dialog'

import * as csv from 'csvtojson'

@Component({
    selector: 'app-csv-table',
    templateUrl: './csv-table.component.html',
    styleUrls: ['./csv-table.component.css'],
})
export class CsvTableComponent implements OnInit{
  @Input() file: File
  dataSource: MatTableDataSource<any>

  headers: Array<string>
  data: Array<Array<string>>


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator
  @ViewChild(MatTable,{static:true}) table: MatTable<any>


  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
      this.parseFileToCsvArray(this.file)
          .then(() => {

              console.log({data: this.data, headers: this.headers})

              this.dataSource = new MatTableDataSource(this.data)
              this.dataSource.paginator = this.paginator
          })
  }

  async parseFileToCsvArray(file: File) {
      return csv({
          output: 'csv',
          noheader: true
      })
          .fromString(await file.text())
          .then(csvArray => {
              this.headers = csvArray[0]
              this.data = csvArray.slice(1)

              return csvArray
          })
  }

  openDialog(action, obj) {
      obj.action = action
      if (action === 'Add') {
          this.addRowData()
          return
      }
      const dialogRef = this.dialog.open(DialogBoxComponent, {
          width: '250px',
          data:obj
      })

      dialogRef.afterClosed().subscribe(result => {
          if(result.event == 'Update'){
              this.updateRowData(result.data)
          }else if(result.event == 'Delete'){
              this.deleteRowData(result.data)
          }
      })
  }

  addRowData(){
      const d = this.headers.map(() => '')
      this.data.push(d)
      this.dataSource.data = this.data

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
