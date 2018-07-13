import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {FetchConfig} from 'aurelia-authentication';
import AppRouterConfig from 'router-config';
import 'bootstrap';
import 'bootstrap-datepicker';
import { I18N } from 'aurelia-i18n';
import {AuthService} from 'aurelia-authentication';

@inject(Router, FetchConfig, AppRouterConfig, I18N, AuthService)
export class App {
	
	_isAuthenticated = false;

	constructor(router, fetchConfig, appRouterConfig, i18n, auth) {
		this.router = router;
		this.fetchConfig = fetchConfig;
		this.appRouterConfig = appRouterConfig;
        this.i18n = i18n;
		this.auth = auth;
  }
	
	activate(){
		this.fetchConfig.configure();
		this.appRouterConfig.configure();
	}

	get isAuthenticated() {
		return this.auth.isAuthenticated();
	};
}
