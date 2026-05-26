import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners
} from '@angular/core';

import {
  provideRouter,
  withRouterConfig
} from '@angular/router';

import { routes } from './app.routes';

import {
  provideClientHydration,
  withEventReplay
} from '@angular/platform-browser';

import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [

    provideBrowserGlobalErrorListeners(),

    provideRouter(
      routes,
      withRouterConfig({
        onSameUrlNavigation: 'reload'
      })
    ),

    provideClientHydration(withEventReplay()),

    importProvidersFrom(FormsModule),

    provideHttpClient()

  ]
};