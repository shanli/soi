/** Oslo JavaScript Framework. */
define("@ds.Set",["@util","@ds.util","@ds.Map"],function(a,b,c){"use strict";function d(b){var c=typeof b;return"object"===c&&b||"function"===c?"o"+a.getUid(b):c.substr(0,1)+b}var e=function(a){this.map_=new c,a&&this.addAll(a)};return e.prototype.getCount=function(){return this.map_.getCount()},e.prototype.add=function(a){this.map_.set(d(a),a)},e.prototype.addAll=function(a){for(var c=b.getValues(a),d=c.length,e=0;d>e;e++)this.add(c[e])},e.prototype.removeAll=function(a){for(var c=b.getValues(a),d=c.length,e=0;d>e;e++)this.remove(c[e])},e.prototype.remove=function(a){return this.map_.remove(d(a))},e.prototype.clear=function(){this.map_.clear()},e.prototype.isEmpty=function(){return this.map_.isEmpty()},e.prototype.contains=function(a){return this.map_.containsKey(d(a))},e.prototype.containsAll=function(a){return b.every(a,this.contains,this)},e.prototype.intersection=function(a){for(var c=new e,d=b.getValues(a),f=0;f<d.length;f++){var g=d[f];this.contains(g)&&c.add(g)}return c},e.prototype.difference=function(a){var b=this.clone();return b.removeAll(a),b},e.prototype.getValues=function(){return this.map_.getValues()},e.prototype.clone=function(){return new e(this)},e.prototype.equals=function(a){return this.getCount()===b.getCount(a)&&this.isSubsetOf(a)},e.prototype.isSubsetOf=function(a){var c=b.getCount(a);return this.getCount()>c?!1:(!(a instanceof e)&&c>5&&(a=new e(a)),b.every(this,function(c){return b.contains(a,c)}))},e.prototype.__iterator__=function(){return this.map_.__iterator__(!1)},e});