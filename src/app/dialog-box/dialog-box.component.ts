import { Component, Optional, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
    selector: 'app-dialog-box',
    templateUrl: './dialog-box.component.html',
    styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent {
  action: string
  localData: any

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: string[]
  ) {
      console.log({data})
      this.localData = {...data}
      this.action = this.localData.action
  }

  doAction() {
      this.dialogRef.close({
          event: this.action,
          data: this.localData
      })
  }

  closeDialog() {
      this.dialogRef.close({event: 'Cancel'})
  }

}
