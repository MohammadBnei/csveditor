import { Injectable } from '@angular/core'
import { NgxCsvParser } from 'ngx-csv-parser'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class CsvService {
  config = {
      header: true,
      delimiter: ','
  }

  constructor(private csvParser: NgxCsvParser) { }

  public parseCsvFile(file: File): Observable<Array<any>> {
      return this.csvParser.parse(file, this.config)

  }
}
