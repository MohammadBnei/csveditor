import { Injectable } from '@angular/core'
import { NgxCsvParser } from 'ngx-csv-parser'

@Injectable({
    providedIn: 'root'
})
export class CsvService {
  file: File = null
  initialFile: File = null

  constructor(private ngxCsvParser: NgxCsvParser) {}

  /**
   * Sets the file of the csv service
   * @param file File
   */
  public setFile(file: File): void {
      this.file = file
      this.initialFile = file
  }

    //   public parseCsvFile(file: File): Observable<Array<any>> {
    //       const csvParser = new Observable(observer => {
    //           console.log({file})

    //           observer.next([])

    //           return {unsubscribe() {}}
    //       })

//       return csvParser
//   }
}
