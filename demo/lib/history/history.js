/** Oslo JavaScript Framework. */
define(["../util/util","../timer/timer","../dom/util","../events/handlermanager","../events/eventtarget","../events/eventtype","./eventtype","./event","../util/memoize","../string/util","../ua/util"],function(a,b,c,d,e,f,g,h,i,j,k){"use strict";var l=[f.MOUSEDOWN,f.KEYDOWN,f.MOUSEMOVE],m="<title>%s</title><body>%s</body>",n='<iframe id="%s" style="display:none" %s></iframe>',o='<input type="text" name="%s" id="%s" style="display:none">',p=0,q={NORMAL:150,LONG:1e4},r=i.memoize(function(){return k.isIE?document.documentMode>=8:"onhashchange"in window}),s=k.isIE&&!k.isDocumentModeOrHigher(8),t=s,u=function(a,g,h,i){if(e.call(this),a&&!g)throw Error("Can't use invisible history without providing a blank page.");var l;if(h)l=h;else{var m="history_state"+p;document.write(j.subs(o,m,m)),l=c.getElement(m)}if(this.hiddenInput_=l,this.window_=h?c.getWindow(c.getOwnerDocument(h)):window,this.iframeSrc_=g,k.isIE&&!g&&(this.iframeSrc_="https"===window.location.protocol?"https:///":'javascript:""'),this.timer_=new b(q.NORMAL),this.registerDisposable(this.timer_),this.userVisible_=!a,this.handlerManager_=new d(this),a||s){var r;if(i)r=i;else{var t="history_iframe"+p,u=this.iframeSrc_?'src="'+j.htmlEscape(this.iframeSrc_)+'"':"";document.write(j.subs(n,t,u)),r=c.getElement(t)}this.iframe_=r,this.unsetIframe_=!0}s&&(this.handlerManager_.listen(this.window_,f.LOAD,this.onDocumentLoaded),this.documentLoaded=!1,this.shouldEnable_=!1),this.userVisible_?this.setHash_(this.getToken(),!0):this.setIframeToken_(this.hiddenInput_.value),p++};return a.inherits(u,e),a.mixin(u.prototype,{enabled_:!1,longerPolling_:!1,lastToken_:null,lockedToken_:null,disposeInternal:function(){u.superClass_.disposeInternal.call(this),this.handlerManager_.dispose(),this.setEnabled(!1)},setEnabled:function(c){return c!==this.enabled_?s&&!this.documentLoaded?(this.shouldEnable_=c,void 0):(c?(k.isOPERA?this.handlerManager_.listen(this.window_.document,l,this.operaDefibrillator_):k.isGECKO&&this.handlerManager_.listen(this.window_,"pageshow",this.onShow_),r()&&this.userVisible_?(this.handlerManager_.listen(this.window_,f.HASHCHANGE,this.onHashChange_),this.enabled_=!0,this.dispatchEvent(new h(this.getToken(),!1))):(!k.isIE||this.documentLoaded)&&(this.handlerManager_.listen(this.timer_,b.TICK,a.bind(this.check_,this,!0)),this.enabled_=!0,s||(this.lastToken_=this.getToken(),this.dispatchEvent(new h(this.getToken(),!1))),this.timer_.start())):(this.enabled_=!1,this.handlerManager_.removeAll(),this.timer_.stop()),void 0):void 0},onDocumentLoaded:function(){this.documentLoaded=!0,this.hiddenInput_.value&&this.setIframeToken_(this.hiddenInput_.value,!0),this.setEnabled(this.shouldEnable_)},onHashChange_:function(){var a=this.getLocationFragment_(this.window_);a!==this.lastToken_&&this.update_(a,!0)},getToken:function(){return null!==this.lockedToken_?this.lockedToken_:this.userVisible_?this.getLocationFragment_(this.window_):this.getIframeToken_()||""},setToken:function(a,b){this.setHistoryState_(a,!1,b)},replaceToken:function(a,b){this.setHistoryState_(a,!0,b)},getLocationFragment_:function(a){var b=a.location.href,c=b.indexOf("#");return 0>c?"":b.substring(c+1)},setHistoryState_:function(a,b,c){this.getToken()!==a&&(this.userVisible_?(this.setHash_(a,b),r()||k.isIE&&this.setIframeToken_(a,b,c),this.enabled_&&this.check_(!1)):(this.setIframeToken_(a,b),this.lockedToken_=this.lastToken_=this.hiddenInput_.value=a,this.dispatchEvent(new h(a,!1))))},setHash_:function(a,b){var c=this.window_.location,d=c.href.split("#")[0],e=j.contains(c.href,"#");(t||e||a)&&(d+="#"+a),d!==c.href&&(b?c.replace(d):c.href=d)},check_:function(a){if(this.userVisible_){var b=this.getLocationFragment_(this.window_);b!==this.lastToken_&&this.update_(b,a)}if(!this.userVisible_||s){var c=this.getIframeToken_()||"";(null===this.lockedToken_||c===this.lockedToken_)&&(this.lockedToken_=null,c!==this.lastToken_&&this.update_(c,a))}},update_:function(a,b){this.lastToken_=this.hiddenInput_.value=a,this.userVisible_?(s&&this.setIframeToken_(a),this.setHash_(a)):this.setIframeToken_(a),this.dispatchEvent(new h(this.getToken(),b))},setIframeToken_:function(a,b,d){if(this.unsetIframe_||a!==this.getIframeToken_())if(this.unsetIframe_=!1,a=j.urlEncode(a),k.isIE){var e=c.getFrameContentDocument(this.iframe_);e.open("text/html",b?"replace":void 0),e.write(j.subs(m,j.htmlEscape(d||this.window_.document.title),a)),e.close()}else{var f=this.iframeSrc_+"#"+a,g=this.iframe_.contentWindow;g&&(b?g.location.replace(f):g.location.href=f)}},getIframeToken_:function(){if(k.isIE){var a=c.getFrameContentDocument(this.iframe_);return a.body?j.urlDecode(a.body.innerHTML):null}var b=this.iframe_.contentWindow;if(b){var d;try{d=j.urlDecode(this.getLocationFragment_(b))}catch(e){return this.longerPolling_||this.setLongerPolling_(!0),null}return this.longerPolling_&&this.setLongerPolling_(!1),d||null}return null},setLongerPolling_:function(a){this.longerPolling_!==a&&this.timer_.setInterval(a?q.LONG:q.NORMAL),this.longerPolling_=a},onShow_:function(a){a.getBrowserEvent().persisted&&(this.setEnabled(!1),this.setEnabled(!0))},operaDefibrillator_:function(){this.timer_.stop(),this.timer_.start()}}),u});