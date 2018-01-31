export default {
	bindEvent(el, eventName, eventHandler) {
		if (el.addEventListener) {
            el.addEventListener(eventName, eventHandler);
        } else {
            el.attachEvent('on' + eventName, function(){
                eventHandler.call(el);
            });
        }
	},
    /*In IE8+ custom events are not natively supported*/
    triggerCustomEvent(eventName, data) {
        let newEvent;
        if (window.CustomEvent) {
            newEvent = new CustomEvent(eventName, {detail: data});
        } else {
            newEvent = document.createEvent('CustomEvent');
            newEvent.initCustomEvent(eventName, true, true, data);
        }

        document.dispatchEvent(newEvent);
    },
    sendRequest(method, url, data, success, error) {
        let createCORSRequest = (m, u) => {
            var xhr = new XMLHttpRequest();
            if ("withCredentials" in xhr){
                xhr.open(method, url, true);
            } else if (typeof XDomainRequest != "undefined"){
                xhr = new XDomainRequest();
                xhr.open(method, url);
            } else {
                xhr = null;
            }
            return xhr;
        };

        let request = createCORSRequest(method, url);
        if (request){
            request.onload = () => {
                success(request.responseText);
            };
            request.onerror = () => {
                error();
            };
            request.send(data);
        } else {
            error();
        }
    },
    setText(el, string) {
        if (el.textContent !== undefined)
            el.textContent = string;
        else
            el.innerText = string;
    },
    addClass(el, className) {
        if (el.classList)
            el.classList.add(className);
        else
            el.className += ' ' + className;
    },
    hasClass (el, classNmae) {
        let result;
        if (el.classList)
           result = el.classList.contains(className);
        else
           result = new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
        return result;
    },
    forEachElement(selector, fn) {
        let elements = document.querySelectorAll(selector);
        for (let i = 0; i < elements.length; i++)
            fn(elements[i], i);
    },
    forEach(array, fn) {
        for (let i = 0; i < array.length; i++)
            fn(array[i], i);
    },
	getClientId(callback) {
		let clientId;
        if (typeof (ga) !== "undefined") {
            ga(function (tracker) {
                clientId = tracker.get('clientId');
                if (clientId !== undefined) {
                    if (typeof callback === 'function') callback();
                }
            });
            if (clientId == undefined) {
                ga(function() {
                    clientId = ga.getAll()[0].get('clientId');
                    if (typeof callback === 'function') callback();
                });
            }
        }
        return clientId;
	},
	getTrackingId() {
		let trackingId;
        if (typeof (ga) !== "undefined") {
            ga(function (tracker) {
                trackingId = tracker.get('trackingId');
            });
            if (trackingId == undefined) {
                ga(function() {
                    trackingId = ga.getAll()[0].get('trackingId');
                });
            }
        }
        return trackingId;
	},

    serializeArray(form) {
        let field, l, s = [];
        if (typeof form == 'object' && form.nodeName == "FORM") {
            let len = form.elements.length;
            for (let i=0; i<len; i++) {
                field = form.elements[i];
                if (field.name && !field.disabled && field.type != 'file' && field.type != 'reset' && field.type != 'submit' && field.type != 'button') {
                    if (field.type == 'select-multiple') {
                        l = form.elements[i].options.length; 
                        for (j=0; j<l; j++) {
                            if(field.options[j].selected)
                                s[s.length] = { name: field.name, value: field.options[j].value };
                        }
                    } else if ((field.type != 'checkbox' && field.type != 'radio') || field.checked) {
                        s[s.length] = { name: field.name, value: field.value };
                    }
                }
            }
        }
        return s;
    },

    closest(el, selector, stopSelector) {
        var retval = null;
        while (el) {
            el = el.parentElement;
            if (el.className.indexOf(selector) > -1) {
                retval = el;break;
            } else if (stopSelector && el.className.indexOf(stopSelector) > -1) {
                break;
            }
        }
        return retval;
    }
};