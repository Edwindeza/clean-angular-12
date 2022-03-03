import { NgModule, Optional, SkipSelf, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';


/****** Interceptors ******/
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { HeaderInterceptor } from './interceptors/header.interceptor';


/****** Services ******/
import { LocalStorageService } from './services/local-storage.service';
import { HttpClienteService } from './services/http-cliente.service';
import { AuthService } from './services/authentication/auth.service';
import { AppErrorHandler } from '@core/services/app-error-handler.service';


/****** Guards ******/
import { LoginGuard } from './guards/login.guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const SERVICES = [
  LocalStorageService,
  HttpClienteService,
  AuthService,
];

const GUARDS = [
  LoginGuard,
]

const MODULES = [
  CommonModule,
  HttpClientModule,
  FormsModule,
  ReactiveFormsModule
]
const COMPONENTS = [];

const INTERCEPTORS = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true }
];
@NgModule({
  // declarations: [...COMPONENTS],
  imports: [
    ...MODULES
  ],
  providers: [
    ...SERVICES,
    ...INTERCEPTORS,
    ...GUARDS,
    { provide: ErrorHandler, useClass: AppErrorHandler },
  ]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
