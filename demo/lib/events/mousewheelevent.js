/** Oslo JavaScript Framework. */
define("@events.mouseWheelEvent",["@util","@events.browserEvent","@events.mouseWheelEventType"],function(a,b,c){"use strict";var d=function(a,d,e,f){b.call(this,d),this.type=c.MOUSEWHEEL,this.detail=a,this.deltaX=e,this.deltaY=f};return a.inherits(d,b),d});