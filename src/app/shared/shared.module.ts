import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeEspE from '@angular/common/locales/es-PE';
import { MaterialModule } from './material/material.module';

registerLocaleData(localeEspE, 'es-PE');

const MODULES = [
  CommonModule,
  MaterialModule
  // NgbModule
];

const COMPONENTS = [
];
@NgModule({
  declarations: [],
  imports: [...MODULES],
  exports: [...MODULES],
})
export class SharedModule { }
