/** Oslo JavaScript Framework. */
define(["../util/util","../timer/timer","../array/array","../events/eventtarget","../json/json","../log/log","./errorcode","./eventtype","./httpstatus","./xmlhttp","../object/object","../string/util","../ds/util","../ds/map","../uri/util","../ua/util","../debug/entrypointregistry"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q){"use strict";var r=[],s=function(a){d.call(this),this.headers=new n,this.xmlHttpFactory_=a||null,this.active_=!1,this.xhr_=null,this.xhrOptions_=null,this.lastUri_="",this.lastMethod_="",this.lastErrorCode_=g.NO_ERROR,this.lastError_="",this.errorDispatched_=!1,this.inSend_=!1,this.inOpen_=!1,this.inAbort_=!1,this.timeoutInterval_=0,this.timeoutId_=null,this.responseType_=s.ResponseType.DEFAULT,this.withCredentials_=!1,this.useXhr2Timeout_=!1};return a.inherits(s,d),s.ResponseType={DEFAULT:"",TEXT:"text",DOCUMENT:"document",BLOB:"blob",ARRAY_BUFFER:"arraybuffer"},s.prototype.logger_=f.getLogger("Oslo.net.XhrIo"),s.CONTENT_TYPE_HEADER="Content-Type",s.HTTP_SCHEME_PATTERN=/^https?$/i,s.METHODS_WITH_FORM_DATA=["POST","PUT"],s.FORM_CONTENT_TYPE="application/x-www-form-urlencoded;charset=utf-8",s.XHR2_TIMEOUT_="timeout",s.XHR2_ON_TIMEOUT_="ontimeout",s.send=function(a,b,c,d,e,f,g){var i=new s;r.push(i),b&&i.listen(h.COMPLETE,b),i.listenOnce(h.READY,i.cleanupSend_),f&&i.setTimeoutInterval(f),g&&i.setWithCredentials(g),i.send(a,c,d,e)},s.cleanup=function(){for(var a=r;a.length;)a.pop().dispose()},s.protectEntryPoints=function(a){s.prototype.onReadyStateChangeEntryPoint_=a.protectEntryPoint(s.prototype.onReadyStateChangeEntryPoint_)},s.prototype.cleanupSend_=function(){this.dispose(),c.remove(r,this)},s.prototype.getTimeoutInterval=function(){return this.timeoutInterval_},s.prototype.setTimeoutInterval=function(a){this.timeoutInterval_=Math.max(0,a)},s.prototype.setResponseType=function(a){this.responseType_=a},s.prototype.getResponseType=function(){return this.responseType_},s.prototype.setWithCredentials=function(a){this.withCredentials_=a},s.prototype.getWithCredentials=function(){return this.withCredentials_},s.prototype.send=function(d,e,h,i){if(this.xhr_)throw Error("[Oslo.net.XhrIo] Object is active with another request="+this.lastUri_+"; newUri="+d);var l=e?e.toUpperCase():"GET";this.lastUri_=d,this.lastError_="",this.lastErrorCode_=g.NO_ERROR,this.lastMethod_=l,this.errorDispatched_=!1,this.active_=!0,this.xhr_=this.createXhr(),this.xhrOptions_=this.xmlHttpFactory_?this.xmlHttpFactory_.getOptions():j.getOptions(),this.xhr_.onreadystatechange=a.bind(this.onReadyStateChange_,this);try{f.fine(this.logger_,this.formatMsg_("Opening Xhr")),this.inOpen_=!0,this.xhr_.open(l,d,!0),this.inOpen_=!1}catch(n){return f.fine(this.logger_,this.formatMsg_("Error opening Xhr: "+n.message)),this.error_(g.EXCEPTION,n),void 0}var o=h||"",p=this.headers.clone();i&&m.forEach(i,function(a,b){p.set(b,a)});var q=c.find(p.getKeys(),s.isContentTypeHeader_),r=a.global.FormData&&o instanceof a.global.FormData;!c.contains(s.METHODS_WITH_FORM_DATA,l)||q||r||p.set(s.CONTENT_TYPE_HEADER,s.FORM_CONTENT_TYPE),m.forEach(p,function(a,b){this.xhr_.setRequestHeader(b,a)},this),this.responseType_&&(this.xhr_.responseType=this.responseType_),k.containsKey(this.xhr_,"withCredentials")&&(this.xhr_.withCredentials=this.withCredentials_);try{this.cleanUpTimeoutTimer_(),this.timeoutInterval_>0&&(this.useXhr2Timeout_=s.shouldUseXhr2Timeout_(this.xhr_),f.fine(this.logger_,this.formatMsg_("Will abort after "+this.timeoutInterval_+"ms if incomplete, xhr2 "+this.useXhr2Timeout_)),this.useXhr2Timeout_?(this.xhr_[s.XHR2_TIMEOUT_]=this.timeoutInterval_,this.xhr_[s.XHR2_ON_TIMEOUT_]=a.bind(this.timeout_,this)):this.timeoutId_=b.callOnce(this.timeout_,this.timeoutInterval_,this)),f.fine(this.logger_,this.formatMsg_("Sending request")),this.inSend_=!0,this.xhr_.send(o),this.inSend_=!1}catch(n){f.fine(this.logger_,this.formatMsg_("Send error: "+n.message)),this.error_(g.EXCEPTION,n)}},s.shouldUseXhr2Timeout_=function(b){return p.isIE&&p.isVersionOrHigher(9)&&a.isNumber(b[s.XHR2_TIMEOUT_])&&a.isDef(b[s.XHR2_ON_TIMEOUT_])},s.isContentTypeHeader_=function(a){return l.caseInsensitiveEquals(s.CONTENT_TYPE_HEADER,a)},s.prototype.createXhr=function(){return this.xmlHttpFactory_?this.xmlHttpFactory_.createInstance():j()},s.prototype.timeout_=function(){"undefined"==typeof Oslo||this.xhr_&&(this.lastError_="Timed out after "+this.timeoutInterval_+"ms, aborting",this.lastErrorCode_=g.TIMEOUT,f.fine(this.logger_,this.formatMsg_(this.lastError_)),this.dispatchEvent(h.TIMEOUT),this.abort(g.TIMEOUT))},s.prototype.error_=function(a,b){this.active_=!1,this.xhr_&&(this.inAbort_=!0,this.xhr_.abort(),this.inAbort_=!1),this.lastError_=b,this.lastErrorCode_=a,this.dispatchErrors_(),this.cleanUpXhr_()},s.prototype.dispatchErrors_=function(){this.errorDispatched_||(this.errorDispatched_=!0,this.dispatchEvent(h.COMPLETE),this.dispatchEvent(h.ERROR))},s.prototype.abort=function(a){this.xhr_&&this.active_&&(f.fine(this.logger_,this.formatMsg_("Aborting")),this.active_=!1,this.inAbort_=!0,this.xhr_.abort(),this.inAbort_=!1,this.lastErrorCode_=a||g.ABORT,this.dispatchEvent(h.COMPLETE),this.dispatchEvent(h.ABORT),this.cleanUpXhr_())},s.prototype.disposeInternal=function(){this.xhr_&&(this.active_&&(this.active_=!1,this.inAbort_=!0,this.xhr_.abort(),this.inAbort_=!1),this.cleanUpXhr_(!0)),s.superClass_.disposeInternal.call(this)},s.prototype.onReadyStateChange_=function(){this.isDisposed()||(this.inOpen_||this.inSend_||this.inAbort_?this.onReadyStateChangeHelper_():this.onReadyStateChangeEntryPoint_())},s.prototype.onReadyStateChangeEntryPoint_=function(){this.onReadyStateChangeHelper_()},s.prototype.onReadyStateChangeHelper_=function(){if(this.active_)if("undefined"==typeof Oslo);else if(this.xhrOptions_[j.OptionType.LOCAL_REQUEST_ERROR]&&this.getReadyState()===j.ReadyState.COMPLETE&&2===this.getStatus())f.fine(this.logger_,this.formatMsg_("Local request error detected and ignored"));else{if(this.inSend_&&this.getReadyState()===j.ReadyState.COMPLETE)return b.callOnce(this.onReadyStateChange_,0,this),void 0;if(this.dispatchEvent(h.READY_STATE_CHANGE),this.isComplete()){f.fine(this.logger_,this.formatMsg_("Request complete")),this.active_=!1;try{this.isSuccess()?(this.dispatchEvent(h.COMPLETE),this.dispatchEvent(h.SUCCESS)):(this.lastErrorCode_=g.HTTP_ERROR,this.lastError_=this.getStatusText()+" ["+this.getStatus()+"]",this.dispatchErrors_())}finally{this.cleanUpXhr_()}}}},s.prototype.cleanUpXhr_=function(b){if(this.xhr_){this.cleanUpTimeoutTimer_();var c=this.xhr_,d=this.xhrOptions_[j.OptionType.USE_NULL_FUNCTION]?a.nullFunction:null;this.xhr_=null,this.xhrOptions_=null,b||this.dispatchEvent(h.READY);try{c.onreadystatechange=d}catch(e){f.error(this.logger_,"Problem encountered resetting onreadystatechange: "+e.message)}}},s.prototype.cleanUpTimeoutTimer_=function(){this.xhr_&&this.useXhr2Timeout_&&(this.xhr_[s.XHR2_ON_TIMEOUT_]=null),a.isNumber(this.timeoutId_)&&(b.clear(this.timeoutId_),this.timeoutId_=null)},s.prototype.isActive=function(){return!!this.xhr_},s.prototype.isComplete=function(){return this.getReadyState()===j.ReadyState.COMPLETE},s.prototype.isSuccess=function(){var a=this.getStatus();return i.isSuccess(a)||0===a&&!this.isLastUriEffectiveSchemeHttp_()},s.prototype.isLastUriEffectiveSchemeHttp_=function(){var a=o.getEffectiveScheme(String(this.lastUri_));return s.HTTP_SCHEME_PATTERN.test(a)},s.prototype.getReadyState=function(){return this.xhr_?this.xhr_.readyState:j.ReadyState.UNINITIALIZED},s.prototype.getStatus=function(){try{return this.getReadyState()>j.ReadyState.LOADED?this.xhr_.status:-1}catch(a){return f.warning(this.logger_,"Can not get status: "+a.message),-1}},s.prototype.getStatusText=function(){try{return this.getReadyState()>j.ReadyState.LOADED?this.xhr_.statusText:""}catch(a){return f.fine(this.logger_,"Can not get status: "+a.message),""}},s.prototype.getLastUri=function(){return String(this.lastUri_)},s.prototype.getResponseText=function(){try{return this.xhr_?this.xhr_.responseText:""}catch(a){return f.fine(this.logger_,"Can not get responseText: "+a.message),""}},s.prototype.getResponseBody=function(){try{if(this.xhr_&&"responseBody"in this.xhr_)return this.xhr_.responseBody}catch(a){f.fine(this.logger_,"Can not get responseBody: "+a.message)}return null},s.prototype.getResponseXml=function(){try{return this.xhr_?this.xhr_.responseXML:null}catch(a){return f.fine(this.logger_,"Can not get responseXML: "+a.message),null}},s.prototype.getResponseJson=function(a){if(!this.xhr_)return void 0;var b=this.xhr_.responseText;return a&&0===b.indexOf(a)&&(b=b.substring(a.length)),e.parse(b)},s.prototype.getResponse=function(){try{if(!this.xhr_)return null;if("response"in this.xhr_)return this.xhr_.response;switch(this.responseType_){case s.ResponseType.DEFAULT:case s.ResponseType.TEXT:return this.xhr_.responseText;case s.ResponseType.ARRAY_BUFFER:if("mozResponseArrayBuffer"in this.xhr_)return this.xhr_.mozResponseArrayBuffer}return f.error(this.logger_,"Response type "+this.responseType_+" is not supported on this browser"),null}catch(a){return f.fine(this.logger_,"Can not get response: "+a.message),null}},s.prototype.getResponseHeader=function(a){return this.xhr_&&this.isComplete()?this.xhr_.getResponseHeader(a):void 0},s.prototype.getAllResponseHeaders=function(){return this.xhr_&&this.isComplete()?this.xhr_.getAllResponseHeaders():""},s.prototype.getLastErrorCode=function(){return this.lastErrorCode_},s.prototype.getLastError=function(){return a.isString(this.lastError_)?this.lastError_:String(this.lastError_)},s.prototype.formatMsg_=function(a){return a+" ["+this.lastMethod_+" "+this.lastUri_+" "+this.getStatus()+"]"},q.register(function(a){s.prototype.onReadyStateChangeEntryPoint_=a(s.prototype.onReadyStateChangeEntryPoint_)}),s});