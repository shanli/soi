/** Oslo JavaScript Framework. */
define(["../array/array"],function(a){"use strict";function b(a){return Math.floor(Math.random()*a)}function c(a,b){return a+Math.random()*(b-a)}function d(a,b,c){return Math.min(Math.max(a,b),c)}function e(a,b){var c=a%b;return 0>c*b?c+b:c}function f(a,b,c){return a+c*(b-a)}function g(a,b,c){return Math.abs(a-b)<=(c||1e-6)}function h(a){return e(a,360)}function i(a){return a*Math.PI/180}function j(a){return 180*a/Math.PI}function k(a,b,c,d){return h(j(Math.atan2(d-b,c-a)))}function l(a,b){var c=h(b)-h(a);return c>180?c-=360:-180>=c&&(c=360+c),c}function m(a){return 0===a?0:0>a?-1:1}function n(a,b,c,d){var e,f,g=c||function(a,b){return a===b},h=d||function(b){return a[b]},i=a.length,j=b.length,k=[];for(e=0;i+1>e;e++)k[e]=[],k[e][0]=0;for(f=0;j+1>f;f++)k[0][f]=0;for(e=1;i>=e;e++)for(f=1;j>=f;f++)k[e][f]=g(a[e-1],b[f-1])?k[e-1][f-1]+1:Math.max(k[e-1][f],k[e][f-1]);var l=[];for(e=i,f=j;e>0&&f>0;)g(a[e-1],b[f-1])?(l.unshift(h(e-1,f-1)),e--,f--):k[e-1][f]>k[e][f-1]?e--:f--;return l}function o(){return a.reduce(arguments,function(a,b){return a+b},0)}function p(){return o.apply(null,arguments)/arguments.length}function q(){var b=arguments.length;if(2>b)return 0;var c=p.apply(null,arguments),d=o.apply(null,a.map(arguments,function(a){return Math.pow(a-c,2)}))/(b-1);return Math.sqrt(d)}function r(a){return isFinite(a)&&0===a%1}function s(a){return isFinite(a)&&!isNaN(a)}function t(a,b){return Math.floor(a+(b||2e-15))}function u(a,b){return Math.ceil(a-(b||2e-15))}return{randomInt:b,uniformRandom:c,clamp:d,modulo:e,lerp:f,nearlyEquals:g,angle:k,angleDifference:l,sign:m,sum:o,average:p,standardAngle:h,standardDeviation:q,toRadians:i,toDegrees:j,isInt:r,isFiniteNumber:s,longestCommonSubsequence:n,safeFloor:t,safeCeil:u}});