import { Component, ViewChild, ElementRef  } from '@angular/core'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
  selectedFile: File = null
    @ViewChild('fileUpload', {static: false}) fileUpload: ElementRef; files: Array<File> = []


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

    selectFile(index: number): void {
        if (!this.files[index])
            throw 'There was an error with the selected file'

        this.selectedFile = this.files[index]
    }

    removeFile(index: number): void {
        if (index >= this.files.length) {
            console.error('index out of range : ', index)
            return
        }
        this.files.splice(index, 1)
    }
}
