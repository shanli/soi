define(function() {

  var API = '__APIDOMAIN__';

  'use strict';

  return {
    exec: function(str) {
      var arr = str.split('');
      arr = arr.reverse();
      return arr.join('');
    }
  };
});