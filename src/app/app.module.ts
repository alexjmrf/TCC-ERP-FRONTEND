import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { NgModule } from '@angular/core';

@NgModule({
  // ...
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // ... outros serviços
  ],
  // ...
})
export class AppModule { }