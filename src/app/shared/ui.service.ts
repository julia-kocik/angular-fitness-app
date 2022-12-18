import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class UIService {
    constructor(private snackBar: MatSnackBar){};

    showSnackbar(message: string, action: any, duration: number):void {
        this.snackBar.open(message, action, {
            duration
        })
    }
}
