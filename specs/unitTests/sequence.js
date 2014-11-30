var to = require('../../src/js/reactiveSources/to');
var logger = require('../../src/js/logger');

var Sequence = function(module, done){

    var _seq = [];
    var _self = this;

    var _executeSequence = function(){
      for (var i =  0; i < _seq.length; i++) _seq[i]();
    } ;

    this.when = function(evtType, action){
      _seq.push(function(){
          module.observable(evtType)
              .subscribe(to(action));
        });

      return _self;
    };

    var _increment = function(count, x) {
      return count + 1;
    };

    this.whenCount = function(evtType, nb, action){

      _seq.push( function(){
          module.observable(evtType)
                .scan(0, _increment)
                .subscribe(to(function(x){ if (x===nb) action(); }));
      });

      if (done===action) _executeSequence();

      return _self;
    };

    this.then = function(evtType){
      
      _executeSequence();

      module.observable(evtType)
            .subscribe(to(function(x){
              done();
            }));
    };

};


module.exports = Sequence;