import { NgModule } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from "@angular/material/core";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
    imports: [
      MatPaginatorModule,
      MatSortModule,
      MatTableModule,
      MatDialogModule,
      MatProgressSpinnerModule,
      MatSelectModule,
      MatCardModule,
      MatTabsModule,
      MatListModule,
      MatToolbarModule,
      MatSidenavModule,
      MatCheckboxModule,
      MatButtonModule,
      MatIconModule,
      MatInputModule,
      MatFormFieldModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatSnackBarModule
    ],
    exports: [
      MatPaginatorModule,
      MatSortModule,
      MatTableModule,
      MatDialogModule,
      MatProgressSpinnerModule,
      MatSelectModule,
      MatCardModule,
      MatTabsModule,
      MatListModule,
      MatToolbarModule,
      MatSidenavModule,
      MatCheckboxModule,
      MatButtonModule,
      MatIconModule,
      MatInputModule,
      MatFormFieldModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatSnackBarModule
    ]
})
export class MaterialModule {}
