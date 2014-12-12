/** Oslo JavaScript Framework. */
define("@ds.Pool",["@util","@Disposable","@ds.util","@ds.Queue","@ds.Set"],function(a,b,c,d,e){"use strict";var f="[Oslo.ds.pool] Min can not be greater than max",g="[Oslo.ds.pool] Objects not released",h=function(a,c){if(b.call(this),this.minCount_=a||0,this.maxCount_=c||10,this.minCount_>this.maxCount_)throw Error(f);this.freeQueue_=new d,this.inUseSet_=new e,this.delay=0,this.lastAccess=null,this.adjustForMinMax()};return a.inherits(h,b),h.prototype.setMinimumCount=function(a){if(a>this.maxCount_)throw Error(h.ERROR_MIN_MAX_);this.minCount_=a,this.adjustForMinMax()},h.prototype.setMaximumCount=function(a){if(a<this.minCount_)throw Error(h.ERROR_MIN_MAX_);this.maxCount_=a,this.adjustForMinMax()},h.prototype.setDelay=function(a){this.delay=a},h.prototype.getObject=function(){var b=a.now();if(!a.isNull(this.lastAccess)&&b-this.lastAccess<this.delay)return void 0;var c=this.removeFreeObject_();return c&&(this.lastAccess=b,this.inUseSet_.add(c)),c},h.prototype.releaseObject=function(a){return this.inUseSet_.remove(a)?(this.addFreeObject(a),!0):!1},h.prototype.removeFreeObject_=function(){for(var a;this.getFreeCount()>0&&(a=this.freeQueue_.dequeue(),!this.objectCanBeReused(a));)this.adjustForMinMax();return!a&&this.getCount()<this.maxCount_&&(a=this.createObject()),a},h.prototype.addFreeObject=function(a){this.inUseSet_.remove(a),this.objectCanBeReused(a)&&this.getCount()<this.maxCount_?this.freeQueue_.enqueue(a):this.disposeObject(a)},h.prototype.adjustForMinMax=function(){for(var a=this.freeQueue_;this.getCount()<this.minCount_;)a.enqueue(this.createObject());for(;this.getCount()>this.maxCount_&&this.getFreeCount()>0;)this.disposeObject(a.dequeue())},h.prototype.createObject=function(){return{}},h.prototype.disposeObject=function(a){if("function"==typeof a.dispose)a.dispose();else for(var b in a)a[b]=null},h.prototype.objectCanBeReused=function(a){return"function"==typeof a.canBeReused?a.canBeReused():!0},h.prototype.contains=function(a){return this.freeQueue_.contains(a)||this.inUseSet_.contains(a)},h.prototype.getCount=function(){return this.freeQueue_.getCount()+this.inUseSet_.getCount()},h.prototype.getInUseCount=function(){return this.inUseSet_.getCount()},h.prototype.getFreeCount=function(){return this.freeQueue_.getCount()},h.prototype.isEmpty=function(){return this.freeQueue_.isEmpty()&&this.inUseSet_.isEmpty()},h.prototype.disposeInternal=function(){if(h.superClass_.disposeInternal.call(this),this.getInUseCount()>0)throw Error(g);delete this.inUseSet_;for(var a=this.freeQueue_;!a.isEmpty();)this.disposeObject(a.dequeue());delete this.freeQueue_},h});