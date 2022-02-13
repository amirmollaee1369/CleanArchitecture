import { NgModule } from '@angular/core';
// tslint:disable-next-line:max-line-length
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
    imports: [
        MatTableModule,
        MatTabsModule,
        MatDatepickerModule,
        MatIconModule,
        MatButtonModule,
        MatCheckboxModule,
        MatToolbarModule,
        FormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatToolbarModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatListModule,
        MatSidenavModule,
        MatGridListModule,
        MatSlideToggleModule,
    ],
    exports: [
        MatTableModule,
        MatTabsModule,
        MatDatepickerModule,
        MatIconModule,
        MatButtonModule,
        MatCheckboxModule,
        MatToolbarModule,
        FormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatToolbarModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatListModule,
        MatSidenavModule,
        MatGridListModule,
        MatSlideToggleModule,
    ],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'fa-IR' },
        //  { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
      ],
})
export class MyMaterialModule { }
