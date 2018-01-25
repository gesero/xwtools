import utils from './Utils';

export default class WebPhone {

	constructor(params) {
		this.widgetId = params.widgetId;
		this.targetClass = params.targetClass;
		this.scriptUrl = params.scriptUrl;
		this.init();
	}

	init() {
		let liraxMakeCallsElemns = document.getElementsByClassName(this.targetClass);
	    for (let i = 0; i < liraxMakeCallsElemns.length; i++) {
	        utils.bindEvent(liraxMakeCallsElemns[i], "click", (e) => {
	            let elm = e.target,
	                xPos = elm.offsetLeft,
	                yPos = elm.offsetTop,
	                password = this.widgetId;
	            let parentUrl = location.protocol+"//"+location.host,
	                randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
	            window.open(
	                this.scriptUrl+"/?"+"&src="+sbjs.get.current.src+"&mdm="+sbjs.get.current.mdm+"&cmp="+
	                sbjs.get.current.cmp+"&trm="+sbjs.get.current.trm+"&pass="+password+"&parentUrl="+parentUrl+"&v="+randomString+
	                "&ga_cid="+utils.getClientId()+"&ga_trid="+utils.getTrackingId(),
	                "liraxMakeCall",
	                "height=320,width=320,top="+yPos+",left="+xPos+",location=no,status=no"
	            );
	        });
    	}
	}

}