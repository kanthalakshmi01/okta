import { Component, Inject, PLATFORM_ID } from '@angular/core';
import OktaAuth from '@okta/okta-auth-js';

import { isPlatformBrowser } from '@angular/common';
import myAppConfig from '../../config/my-app-config';
import { RouterModule } from '@angular/router';
import { OKTA_AUTH } from '@okta/okta-angular';

@Component({
  selector: 'app-okta-signin',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './okta-signin.component.html',
  styleUrl: './okta-signin.component.css',
})
export class OktaSigninComponent {
  private oktaSignIn: any;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth
  ) {}
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      import('@okta/okta-signin-widget').then((module) => {
        const OktaSignIn = module.default;
        this.oktaSignIn = new OktaSignIn({
          //logo: 'assets/images/logo.png',
          baseUrl: myAppConfig.oidc.issuer.split('/oauth2')[0],
          clientId: myAppConfig.oidc.clientId,
          useClassicEngine: true,
          redirectUri: myAppConfig.oidc.redirectUri,
          authParams: {
            pkce: true,
            issuer: myAppConfig.oidc.issuer,
            scopes: myAppConfig.oidc.scopes,
          },
        });
        this.oktaSignIn.remove();
        this.oktaSignIn.renderEl(
          { el: '#okta-signin-widget' },
          (response: any) => {
            if (response.status === 'SUCCESS') {
              this.oktaAuth.signInWithRedirect();
            }
          },
          (error: any) => {
            throw error;
          }
        );
      });
    }
  }
}
