/** Oslo JavaScript Framework. */
define("@debug.logRecord",[],function(){"use strict";var a=0,b=function(a,b,c,d,e){this.reset(a,b,c,d,e)};return b.prototype.time_=0,b.prototype.level_=null,b.prototype.msg_="",b.prototype.loggerName_="",b.prototype.sequenceNumber_=0,b.prototype.exception_=null,b.prototype.exceptionText_=null,b.ENABLE_SEQUENCE_NUMBERS=!0,b.prototype.reset=function(c,d,e,f,g){b.ENABLE_SEQUENCE_NUMBERS&&(this.sequenceNumber_="number"==typeof g?g:a++),this.time_=f||+new Date,this.level_=c,this.msg_=d,this.loggerName_=e,delete this.exception_,delete this.exceptionText_},b.prototype.getLoggerName=function(){return this.loggerName_},b.prototype.getException=function(){return this.exception_},b.prototype.setException=function(a){this.exception_=a},b.prototype.getExceptionText=function(){return this.exceptionText_},b.prototype.setExceptionText=function(a){this.exceptionText_=a},b.prototype.setLoggerName=function(a){this.loggerName_=a},b.prototype.getLevel=function(){return this.level_},b.prototype.setLevel=function(a){this.level_=a},b.prototype.getMessage=function(){return this.msg_},b.prototype.setMessage=function(a){this.msg_=a},b.prototype.getMillis=function(){return this.time_},b.prototype.setMillis=function(a){this.time_=a},b.prototype.getSequenceNumber=function(){return this.sequenceNumber_},b});