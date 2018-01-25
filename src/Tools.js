import WebForm from './WebForm';
import WebCall from './WebCall';
import WebPhone from './WebPhone';
import sbjs from 'sourcebuster';
if (!window.sbjs) {
	window.sbjs = sbjs;	
}

export default class Tools {

	constructor() {
		if (typeof sbjs.get == 'undefined') {
			sbjs.init();	
		}
	}

	liraxWebFormInit(params) {
		return new WebForm(params);
	}

	liraxWebCallInit(params) {
		return new WebCall(params);
	}

	liraxWebPhoneInit(params) {
		return new WebPhone(params);
	}


}