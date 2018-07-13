import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { I18N } from 'aurelia-i18n';
import 'jquery-ui';

@inject(Router, I18N)
export class Home {

	constructor(router, i18n) {
		this.i18n = i18n;
		this.router = router;
	}

	activate() {
	}
}
