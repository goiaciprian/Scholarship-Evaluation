import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(private _snackbar: MatSnackBar) { }

  openSnackbar (message: string, type: "error" | "success" = "success") {
    this._snackbar.open(message, undefined, {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: `${type}-snack`
    })
  }
}
