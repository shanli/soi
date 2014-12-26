/** Oslo JavaScript Framework. */
define(["../util/util","./coordinate"],function(a,b){"use strict";var c=function(a,b,c,d){this.top=a,this.right=b,this.bottom=c,this.left=d};return c.boundingBox=function(){for(var a=new c(arguments[0].y,arguments[0].x,arguments[0].y,arguments[0].x),b=1;b<arguments.length;b++){var d=arguments[b];a.top=Math.min(a.top,d.y),a.right=Math.max(a.right,d.x),a.bottom=Math.max(a.bottom,d.y),a.left=Math.min(a.left,d.x)}return a},c.prototype.clone=function(){return new c(this.top,this.right,this.bottom,this.left)},c.prototype.contains=function(a){return c.contains(this,a)},c.prototype.expand=function(b,c,d,e){return a.isObject(b)?(this.top-=b.top,this.right+=b.right,this.bottom+=b.bottom,this.left-=b.left):(this.top-=b,this.right+=c,this.bottom+=d,this.left-=e),this},c.prototype.expandToInclude=function(a){this.left=Math.min(this.left,a.left),this.top=Math.min(this.top,a.top),this.right=Math.max(this.right,a.right),this.bottom=Math.max(this.bottom,a.bottom)},c.prototype.ceil=function(){return this.top=Math.ceil(this.top),this.right=Math.ceil(this.right),this.bottom=Math.ceil(this.bottom),this.left=Math.ceil(this.left),this},c.prototype.floor=function(){return this.top=Math.floor(this.top),this.right=Math.floor(this.right),this.bottom=Math.floor(this.bottom),this.left=Math.floor(this.left),this},c.prototype.round=function(){return this.top=Math.round(this.top),this.right=Math.round(this.right),this.bottom=Math.round(this.bottom),this.left=Math.round(this.left),this},c.prototype.translate=function(c,d){return c instanceof b?(this.left+=c.x,this.right+=c.x,this.top+=c.y,this.bottom+=c.y):(this.left+=c,this.right+=c,a.isNumber(d)&&(this.top+=d,this.bottom+=d)),this},c.prototype.scale=function(b,c){var d=a.isNumber(c)?c:b;return this.left*=b,this.right*=b,this.top*=d,this.bottom*=d,this},c.equals=function(a,b){return a===b?!0:a&&b?a.top===b.top&&a.right===b.right&&a.bottom===b.bottom&&a.left===b.left:!1},c.contains=function(a,b){return a&&b?b instanceof c?b.left>=a.left&&b.right<=a.right&&b.top>=a.top&&b.bottom<=a.bottom:b.x>=a.left&&b.x<=a.right&&b.y>=a.top&&b.y<=a.bottom:!1},c.relativePositionX=function(a,b){return b.x<a.left?b.x-a.left:b.x>a.right?b.x-a.right:0},c.relativePositionY=function(a,b){return b.y<a.top?b.y-a.top:b.y>a.bottom?b.y-a.bottom:0},c.distance=function(a,b){var d=c.relativePositionX(a,b),e=c.relativePositionY(a,b);return Math.sqrt(d*d+e*e)},c.intersects=function(a,b){return a.left<=b.right&&b.left<=a.right&&a.top<=b.bottom&&b.top<=a.bottom},c.intersectsWithPadding=function(a,b,c){return a.left<=b.right+c&&b.left<=a.right+c&&a.top<=b.bottom+c&&b.top<=a.bottom+c},c});