import { Injectable } from '@angular/core'
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class CsvService {
  config = {
      header: false,
      delimiter: ','
  }

  constructor(private csvParser: NgxCsvParser) { }

  public parseCsvFile(file: File): Observable<any> {
      return this.csvParser.parse(file, this.config)

  }
}
