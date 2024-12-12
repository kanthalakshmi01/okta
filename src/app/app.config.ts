import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import myAppConfig from './config/my-app-config';
import { OktaAuthModule } from '@okta/okta-angular';
import { OKTA_CONFIG } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';

const oktaConfig = {
  issuer: myAppConfig.oidc.issuer,
  clientId: myAppConfig.oidc.clientId,
  redirectUri: myAppConfig.oidc.redirectUri,
  scopes: myAppConfig.oidc.scopes,
};
const oktaAuth = new OktaAuth(oktaConfig);
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom(RouterModule, OktaAuthModule),
    { provide: OKTA_CONFIG, useValue: { oktaAuth } },
  ],
};
