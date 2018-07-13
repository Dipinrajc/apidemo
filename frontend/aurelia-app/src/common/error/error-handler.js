import {inject} from 'aurelia-framework';
import { ToastrUtils } from 'common/utils/toastr-utils';
import {ServerError} from 'common/error/server-error';
import { I18N } from 'aurelia-i18n';

@inject(I18N)
export class DiscErrorHandler {
    
    constructor(i18n) {
        this.i18n = i18n;
    }
    
    handle(error) {
        if(error.name == 'ServerError'){
            ToastrUtils.showError(this.i18n.tr('error_codes.' + error.errorCode));
				} else if(error.name == 'Error') {
						ToastrUtils.showError(error);
				}else {
          	ToastrUtils.showError(this.i18n.tr('error_codes.non_server_error') + " " + error);
        }
    }
}