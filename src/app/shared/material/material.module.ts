import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';

import { MAT_DATE_LOCALE } from '@angular/material/core';

const MODULES = [
  MatAutocompleteModule,
  MatInputModule,
  MatIconModule
]



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...MODULES
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-PE' },
  ],
  exports: [ ...MODULES ],
})
export class MaterialModule { }
