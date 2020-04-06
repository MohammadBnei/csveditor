import { Component, Input } from '@angular/core'

@Component({
    selector: 'app-csv-table',
    templateUrl: './csv-table.component.html',
    styleUrls: ['./csv-table.component.css'],
})
export class CsvTableComponent {
  @Input() data: Array<Array<string>>
  @Input() headers: Array<string>

  constructor() {
      console.log(this.data, this.headers)
  }
}
