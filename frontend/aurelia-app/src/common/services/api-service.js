import { inject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';
import {ServerError} from 'common/error/server-error';

@inject(HttpClient)
export class APIService {

    constructor(http) {
        this.http = http;
    }
    
    callApi(apiName, method){
        return Promise.race([
            this.http.fetch(apiName, {
            method: method || 'GET'
        })
						.then(response => response.text().then(text => ({
							data: ((text.length > 0 || text == null || response.status == 412) && response.status != 504) ? JSON.parse(text) : text,
							status: response.status
						})))
            .then(response => {
							if(response.status == 504) {
								throw new Error("Temporarily unavailable. Please try after some time");
							}else if(response.status != 200){
								
                    throw new ServerError(response.data); 
                }
                else {
                    return response.data;
                }   
                return response;
            })
            .catch(error => {
               throw error;
            })
//            ,this.waitForServer(10000)
       ]);
    }
    
    callApiWithBody(apiName, method, bodyData){
			return Promise.race([
				this.http.fetch(apiName, {
					method: method || 'POST',
					body: json(bodyData)
				})            
				.then(response => response.text().then(text => ({
					data: ((text.length > 0 || text == null || response.status == 412) && response.status != 504) ? JSON.parse(text) : text,
					status: response.status
				})))
				.then(response => {
					if(response.status == 504) {
						throw new Error("Temporarily unavailable. Please try after some time");
					}else if(response.status != 200){
						throw new ServerError(response.data); 
					}
					else {
						return response.data;
					}   
					return response;
				})
				.catch(error => {
					throw error;
				})
				//            ,this.waitForServer(10000)
			]);
    }
	
	callApiWithFormData(apiName, method, formData){
		return Promise.race([
			this.http.fetch(apiName, {
				method: method || 'POST',
				body: (formData)
			})            
			.then(response => response.text().then(text => ({
				data: ((text.length > 0 || text == null || response.status == 412) && response.status != 504) ? JSON.parse(text) : text,
				status: response.status
			})))
			.then(response => {
				if(response.status == 504) {
					throw new Error("Temporarily unavailable. Please try after some time");
				}else if(response.status != 200){
					throw new ServerError(response.data); 
				}
				else {
					return response.data;
				}   
			})
			.catch(error => {
				throw error;
			})
			//            ,this.waitForServer(10000)
		]);
	}
    
    waitForServer(timeout){
        return;
    }

}
