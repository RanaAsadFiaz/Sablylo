import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AppComponent} from './app.component';
import {
  TranslateModule,
  TranslateLoader,
  TranslateService
} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AuthGuard} from './services/core/guards/auth.guard';
import {TokenInterceptorService} from './services/core/interceptors/tokenInterceptor';
import {CoreService} from './services/core/authorization/core.service';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {CompilerProvider} from './services/common/compiler/compiler';
import {ToasterComponent} from './components/toaster/toaster.component';
import {ConfirmationModalComponent} from './dialogs/conformationModal/confirmationModal.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ProfileImagePipe} from './pipes/profileImage/profile-image.pipe';
import {ImageLightboxComponent} from './dialogs/imageLightbox/imageLightbox.component';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import { NotificationsComponent } from './components/notifications/notifications.component';
import {MaterialModule} from './material.module';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

// tslint:disable-next-line:typedef
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    ToasterComponent,
    ConfirmationModalComponent,
    ProfileImagePipe,
    ImageLightboxComponent,
    NotificationsComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    // CalendarModule.forRoot({
    //   provide: DateAdapter,
    //   useFactory: adapterFactory
    // }),
    AppRoutingModule,
    DragDropModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    MatDatepickerModule,
    TranslateService,
    CoreService,
    AuthGuard,
    CompilerProvider,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // },
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {
        duration: 2000,
      }
    },
  ],

  bootstrap: [AppComponent],
  exports: [],
  entryComponents: [
    ToasterComponent,
    ConfirmationModalComponent,
    ImageLightboxComponent,
    NotificationsComponent,
  ]
})
export class AppModule {
}
