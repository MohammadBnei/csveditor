import { Component, ViewChild, ElementRef  } from '@angular/core'
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    @ViewChild('fileUpload', {static: false}) fileUpload: ElementRef; files: Array<File> = []
    data: Array<Record<string, string>> = null
    headers: Array<string> = null

    constructor(
      private ngxCSVParser: NgxCsvParser,
    ) { }

    onClick(): void {
        const fileUpload = this.fileUpload.nativeElement
        fileUpload.onchange = (): void => {
            for (let i = 0; i < fileUpload.files.length; i++) {
                const file = fileUpload.files[i]
                this.files.push(file)
            }

            // this.uploadFiles()
        }

        fileUpload.click()
    }

    removeFile(index: number): void {
        if (index >= this.files.length) {
            console.error('index out of range : ', index)
            return
        }
        this.files.splice(index, 1)
    }

    parse(index: number): void {
        if (index >= this.files.length) {
            console.error('Incorrect index : ', index)
        }

        this.parseCsvFile(this.files[index])
    }

    parseCsvFile(file: File): void {
        this.ngxCSVParser.parse(file, {
            header: true
        })
            .pipe()
            .subscribe((result: Array<any>) => {
                if (result.length > 0) {
                    this.headers = Object.keys(result[0])
                    this.data = result
                }
            }, (error: NgxCSVParserError) => {
                console.log('Error', error)
            })
    }
}
