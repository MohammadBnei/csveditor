import { Component, ViewChild, ElementRef  } from '@angular/core'
import { HttpEventType, HttpErrorResponse } from '@angular/common/http'
import { of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { CsvService } from '../csv.service'
import { UploadService } from '../upload.service'
import { NgxCSVParserError } from 'ngx-csv-parser'

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
      private csvService: CsvService,
      private uploadService: UploadService
    ) { }

    uploadFile(file): void {
        const formData = new FormData()

        formData.append('file', file.data)
        file.inProgress = true

        this.uploadService.upload(formData).pipe(
            map(event => {
                switch (event.type) {
                case HttpEventType.UploadProgress:
                    file.progress = Math.round(event.loaded * 100 / event.total)
                    break
                case HttpEventType.Response:
                    return event
                }
            }),
            catchError((error: HttpErrorResponse)  => {
                file.inProgress = false

                return of(`${file.data.name} upload failed.`, error)
            })
        )
            .subscribe((event: any) => {
                if (typeof (event) === 'object') {
                    console.log(event.body)
                }
            })

    }

    private uploadFiles(): void {
        this.fileUpload.nativeElement.value = ''

        this.files.forEach(file => {
            this.uploadFile(file)
        })
    }

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
        this.csvService.parseCsvFile(file)
            .pipe(
                map((data: Array<any>) => data.filter(d => !Array.isArray(d)))
            )
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
