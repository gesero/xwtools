import utils from './Utils';

export default class WebPhone {

	constructor(params) {
		this.widgetId = params.widgetId;
		this.targetClass = params.targetClass;
		this.scriptUrl = params.scriptUrl;
		this.prefix = params.prefix || '';
		this.successMessage = params.successMessage || '';
		this.errorMessage = params.errorMessage || '';
		this.phoneError = params.phoneError || '';
		this.onSubmit = params.onSubmit;
		this.onSuccess = params.onSuccess;
		this.onError = params.onError;
		this.init();
	}

	init() {
		let el = document.querySelectorAll('form.'+this.targetClass);
		for (let i = 0; i < el.length; i++) {
			let childEl = el[i].querySelector('a.'+this.targetClass);
			let that = this;
			utils.bindEvent(el[i], 'submit', this.contactFormDataProcess.bind(that));
			if (childEl) {
				utils.bindEvent(childEl, 'click', this.contactFormDataProcess.bind(that));	
			}	
		}
	}
	
	contactFormDataProcess(e) {
		e.preventDefault();
		let validate = this.contactFormValidate();
		if (validate) {
			let data = this.conatctFormDataCollect(e);
			this.contactFormDataSend(data);	
		}
		
	}

	contactFormValidate() {
        let webFormPhoneErrorMessage = this.phoneError;
        if (webFormPhoneErrorMessage == undefined || webFormPhoneErrorMessage == '') {
            webFormPhoneErrorMessage = 'Error';
        }
        let webForm = document.querySelector('form.'+this.targetClass);
        let webFormInputPhone = document.querySelector('form.'+this.targetClass+' input[name="phone"]');
        let webFormInputPhoneVal = webFormInputPhone.value;
        webFormInputPhoneVal = webFormInputPhoneVal.replace(/[^0-9]/gi, '');
        if (this.prefix.length > 0) {
        	webFormInputPhoneVal = webFormInputPhoneVal.substr(webFormInputPhoneVal.length - 9);
        }

        if (webFormInputPhoneVal == undefined) {
            return false;
        } else if (webFormInputPhoneVal.length < 9 || webFormInputPhoneVal == '') {
            if (webForm.querySelector('.lirax-custom-form-phone-validate') !== null ) {
                utils.setText(document.querySelector('form.'+this.targetClass+' .lirax-custom-form-phone-validate'),webFormPhoneErrorMessage);
            } else {
            	webFormInputPhone.insertAdjacentHTML('afterend', '<div class="lirax-custom-form-phone-validate" style="color:red;font-size:12px;width:300px;"></div>');
                utils.setText(document.querySelector('form.'+this.targetClass+' .lirax-custom-form-phone-validate'),webFormPhoneErrorMessage);
            }
            return false;
        } else {
        	if (webForm.querySelector('.lirax-custom-form-phone-validate') !== null ) {
                utils.setText(document.querySelector('form.'+this.targetClass+' .lirax-custom-form-phone-validate'),'');
            } else {
            	webFormInputPhone.insertAdjacentHTML('afterend', '<div class="lirax-custom-form-phone-validate" style="color:red;font-size:12px;width:300px;"></div>');
                utils.setText(document.querySelector('form.'+this.targetClass+' .lirax-custom-form-phone-validate'),'');
            }
            
        }

        return true;
	}

	conatctFormDataCollect(e) {
		let form,
		    event = e || window.event,
		    webFormInputPhoneVal;
		if (event.type == 'submit') {
            form = event.target;
        } else {
            form = form = document.querySelector('form.'+this.targetClass);
        }
        let formData = utils.serializeArray(form),
            formFields = {}; 
        utils.forEach(formData, (b, el) => {
        	if (b.name == 'phone') {
        		if (this.prefix.length > 0) {
            		let phonevalue = b.value.replace(/[^0-9]/gi, '');
		        	webFormInputPhoneVal = phonevalue.substr(phonevalue.length - 9);
		        } else {
		        	let phonevalue = b.value.replace(/[^0-9]/gi, '');
		        	webFormInputPhoneVal = phonevalue;
		        }
                formFields[b.name] = this.prefix+webFormInputPhoneVal;
            }
		});
		formFields.utm_src = sbjs.get.current.src || 'none';
		formFields.utm_mdm = sbjs.get.current.mdm || 'none';
		formFields.utm_cmp = sbjs.get.current.cmp || 'none';
		formFields.utm_trm = sbjs.get.current.trm || 'none';
		formFields.widget_id = this.widgetId || 'none';
		formFields.ga_cid = utils.getClientId() || 'none';
		formFields.ga_trid = utils.getTrackingId() || 'none';
		//console.log(JSON.stringify(formFields));
		return JSON.stringify(formFields);
	}

	contactFormDataSend(data) {
		let webForm = document.querySelector('form.'+this.targetClass);
		if (typeof this.onSubmit === "function") {
			this.onSubmit();
		}
		utils.sendRequest('POST', this.scriptUrl, data,
			(response) => {
				let data = JSON.parse(response);
				if (data.message.ok == '1') {
					if (webForm.querySelector('.lirax-custom-form-sent-message') !== null ) {
						utils.setText(document.querySelector('form.'+this.targetClass+' .lirax-custom-form-sent-message'),this.successMessage);
						utils.setText(document.querySelector('form.'+this.targetClass+' .lirax-custom-form-phone-validate'),'');
						utils.addClass(webForm, 'lirax-custom-form-sent');
					} else {
						let newDiv = document.createElement('div');
						utils.addClass(newDiv, 'lirax-custom-form-sent-message');
						webForm.insertBefore(newDiv, webForm.firstChild);
						utils.setText(document.querySelector('form.'+this.targetClass+' .lirax-custom-form-sent-message'),this.successMessage);
						utils.setText(document.querySelector('form.'+this.targetClass+' .lirax-custom-form-phone-validate'),'');
						utils.addClass(webForm, 'lirax-custom-form-sent');
					}
					if (typeof this.onSuccess === "function") {
						this.onSuccess();
					}
					//utils.triggerCustomEvent('liraxEventCallBackSubmit', {success:true});
				} else {
					if (webForm.querySelector('.lirax-custom-form-sent-message') !== null ) {
						utils.setText(document.querySelector('form.'+this.targetClass+' .lirax-custom-form-sent-message'),this.errorMessage);
						utils.setText(document.querySelector('form.'+this.targetClass+' .lirax-custom-form-phone-validate'),'');
						utils.addClass(webForm, 'lirax-custom-form-sent');
					} else {
						let newDiv = document.createElement('div');
						utils.addClass(newDiv, 'lirax-custom-form-sent-message');
						webForm.insertBefore(newDiv, webForm.firstChild);
						utils.setText(document.querySelector('form.'+this.targetClass+' .lirax-custom-form-sent-message'),this.errorMessage);
						utils.setText(document.querySelector('form.'+this.targetClass+' .lirax-custom-form-phone-validate'),'');
						utils.addClass(webForm, 'lirax-custom-form-sent');
					}
					if (typeof this.onError === "function") {
						this.onError();
					}
					//utils.triggerCustomEvent('liraxEventCallBackSubmit', {success:false});
				}
			},
			() => {
				if (webForm.querySelector('.lirax-custom-form-sent-message') !== null ) {
					utils.setText(document.querySelector('form.'+this.targetClass+' .lirax-custom-form-sent-message'),this.errorMessage);
					utils.setText(document.querySelector('form.'+this.targetClass+' .lirax-custom-form-phone-validate'),'');
					utils.addClass(webForm, 'lirax-custom-form-sent');
				} else {
					let newDiv = document.createElement('div');
					utils.addClass(newDiv, 'lirax-custom-form-sent-message');
					webForm.insertBefore(newDiv, webForm.firstChild);
					utils.setText(document.querySelector('form.'+this.targetClass+' .lirax-custom-form-sent-message'),this.errorMessage);
					utils.setText(document.querySelector('form.'+this.targetClass+' .lirax-custom-form-phone-validate'),'');
					utils.addClass(webForm, 'lirax-custom-form-sent');
				}
				if (typeof this.onError === "function") {
					this.onError();
				}
				//utils.triggerCustomEvent('liraxEventCallBackSubmit', {success:false});
			}
		);
	}
}