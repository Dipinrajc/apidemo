import environment from './environment';
import { config } from './auth-config';
import { I18N, Backend, TCustomAttribute } from 'aurelia-i18n';
import { HttpClient } from 'aurelia-fetch-client';
import { Router } from 'aurelia-router';
export function configure(aurelia) {
  this.config = config;
  aurelia.use
    .standardConfiguration()
    .plugin('aurelia-authentication', (baseConfig) => {
      baseConfig.configure(this.config);
    })
    .plugin('aurelia-i18n', (instance) => {
      let aliases = ['t', 'i18n'];
      // add aliases for 't' attribute
      TCustomAttribute.configureAliases(aliases);
      // register backend plugin
      instance.i18next.use(Backend.with(aurelia.loader));
      return instance.setup({
        lng: 'en',
        attributes: aliases,
        fallbackLng: 'en',
        debug: false,
        backend: {
          loadPath: 'locales/{{lng}}/{{ns}}.json'
        },
      });
    })
    .plugin("aurelia-validation")
    .plugin('aurelia-cookie')
    .feature('resources');
  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  let httpClient = aurelia.container.get(HttpClient);
  httpClient.configure(config => {
    config
      .withBaseUrl()
      .withDefaults({
        credentials: 'same-origin',
        headers: {
          'Accept': '*'
        }
      })
      .withInterceptor({
        request(request) {
          return request;
        },
        response(response) {
          if (response.status === 401) {
            location.reload();
            let router = aurelia.container.get(Router);
            router.navigate('#/logout');
            return;
          }
          return response;
        }
      });
  });
  aurelia.start().then(() => aurelia.setRoot());
}
