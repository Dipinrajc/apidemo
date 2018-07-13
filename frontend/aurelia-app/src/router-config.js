import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import { I18N } from 'aurelia-i18n';
import {AuthService} from 'aurelia-authentication';

@inject(Router,I18N)

export default class {

	constructor(router,i18n) {
		this.router = router;
		this.i18n = i18n;
	};

	configure() {

		var appRouterConfig = function(config) {

			config.title = 'K-DISC';

			config.addPipelineStep('authorize', AuthorizeStep);

			let navigationStrategy = (instruction) => {
				instruction.redirect = '/logout';
				return instruction;
			};

			config.mapUnknownRoutes(navigationStrategy);

			config.map([

				{ route: ['','launcher'], name: 'launcher', moduleId: './launcher', nav: true, title:'Loading', auth: true},
				
				{ route: ['404'], name: '404', moduleId: './404', nav:false, auth:false },

				{ route: ['','home'], name: 'home', moduleId: './home', nav: true, title:'Home', auth: true},

				{ route: 'login', name: 'login', moduleId: './login', nav: false, title:'Login', authRoute:true},
				
				{ route: 'logout', name: 'logout', moduleId: './logout', nav: false, title:'Logout', authRoute: true },

				{ route: ['product-detail'], name: 'product-detail', moduleId: './product-detail', nav: true, title:'Product Detail'}
			]);
    };
		this.router.fallbackRoute = "/product-detail";
		this.router.configure(appRouterConfig);
	};
}

@inject(Router, AuthService)
class AuthorizeStep {

	constructor(router, auth) {
		this.router = router;
		this.auth = auth;
	}

	run(navigationInstruction, next) {
		window.scrollTo(0, 0);
		if (navigationInstruction.config.auth === true) {
			var isLoggedIn = this.auth.authenticated;
			var loginRoute = this.auth.config.loginRoute;
			if (!isLoggedIn) {
				return next.cancel(this.router.navigate('login'));
			}		
			else if (isLoggedIn && navigationInstruction.config === loginRoute){
				return next.cancel(this.router.navigate('launcher'));
			}
		}
		if (navigationInstruction.config.requiredAccessRights) {
			const accessRightsList = localStorage.getItem('authorities') ? localStorage.getItem('authorities') : [];
			const isAuthorized = this.isAuthorized(navigationInstruction.config.requiredAccessRights,accessRightsList);
			if (!isAuthorized) {
				this.router.navigate('404');
			}
		}
		return next();
	}

	isAuthorized(requiredAccessRights,accessRightsList) {
		let isAuthorized = false;
		if(requiredAccessRights instanceof Array) {
			for(let accessRights of requiredAccessRights) {
				isAuthorized = accessRightsList.indexOf( accessRights ) > -1;
				if(!isAuthorized) {
					break;
				}
			}
		}else {
			isAuthorized = accessRightsList.indexOf( requiredAccessRights ) > -1;
		}
		return isAuthorized;
	}
}