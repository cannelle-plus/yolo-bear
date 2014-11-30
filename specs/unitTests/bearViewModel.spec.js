var assert = require('chai').assert;
var to = require('../../src/js/reactiveSources/to');
var ajax = require('../helper/fakeAjaxBear.helper');
var socket = require('../helper/fakeSocketBear.helper');
var BearsViewModel = require('../../src/js/viewmodel/bearsViewModel');
var calljsDom = require('./calljsDom');
var Sequence = require('./sequence');
var logger = require('../../src/js/logger');
var uuid = require('node-uuid');
var bear2bearModule = require('../../src/js/bear2bearModule');

var BearModule = bear2bearModule("bear", BearsViewModel);

describe("Given that  nothing hapenned before,", function() {

  calljsDom("When we create a bear view model, then we receive a current bear received event from the server ", "games.html", function(done, window) {

  	var bear= { 
			bearId : '4a82199e-7c30-4a66-b194-6d40127fbb89',
      bearUsername : "jason",
			socialId : '24567789',
			avatarId : 23,
			hasSignedIn : false
		};

    var module = new BearModule(ajax([bear]), socket());

    new Sequence(module, done).then('serverCurrentBearReceived');

    module.addToWindow(window);


  });

});

describe("Given that we have a bear view model,", function() {

  calljsDom("when  we have a current bear who has not yet signedIn, then we receive a notSignedIn event ", "games.html", function(done, window) {

    var bear= { 
      bearId : '4a82199e-7c30-4a66-b194-6d40127fbb89',
      bearUsername : undefined,
      socialId : '24567789',
      avatarId : undefined,
      hasSignedIn : false
    };

    var module = new BearModule(ajax([bear]), socket());

    new Sequence(module, done).then('notSignedIn');

    module.addToWindow(window);


  });

});


describe("Given that we have a bear view model,", function() {

  calljsDom("when  we have a current bear who has signedIn, then we receive a SignedIn event ", "games.html", function(done, window) {

    // logger.setLevel('DEBUG');
    var bear= { 
      bearId : '4a82199e-7c30-4a66-b194-6d40127fbb89',
      bearUsername : "jason",
      socialId : '24567789',
      avatarId : 23,
      hasSignedIn : true
    };

    var module = new BearModule(ajax([bear]), socket());

    new Sequence(module, done).then('signedIn');

    module.addToWindow(window);


  });

});

describe("Given that we have a bear view model,", function() {

  calljsDom("when  we receive a signed in bear, then we receive a uiBearRenderer event ", "games.html", function(done, window) {

    // logger.setLevel('DEBUG');
    var bear= { 
      bearId : '4a82199e-7c30-4a66-b194-6d40127fbb89',
      bearUsername : "jason",
      socialId : '24567789',
      avatarId : 23,
      hasSignedIn : true
    };

    var module = new BearModule(ajax([bear]), socket());

    new Sequence(module, done).then('uiBearRenderer');

    module.addToWindow(window);

  });

});

describe("Given that we have a bear view model,", function() {

  calljsDom("when  we receive a not signed in bear, then we receive a uiSigninRendered event ", "games.html", function(done, window) {

    // logger.setLevel('DEBUG');
    var bear= { 
      bearId : '4a82199e-7c30-4a66-b194-6d40127fbb89',
      bearUsername : undefined,
      socialId : '24567789',
      avatarId : undefined,
      hasSignedIn : false
    };

    var module = new BearModule(ajax([bear]), socket());

    module.observable('uiSigninRendered')
      .subscribe(to(function(x) {
        done();
      }));

    module.addToWindow(window);

  });

});



describe("Given that we have a bear view model with a not signed in bear,", function() {

  calljsDom("when  we sign in, then we receive a hasSignedIn event", "games.html", function(done, window) {

    // logger.setLevel('DEBUG');
    var bear= { 
      bearId : '4a82199e-7c30-4a66-b194-6d40127fbb89',
      bearUsername : undefined,
      socialId : '24567789',
      avatarId : undefined,
      hasSignedIn : false
    };

    var module = new BearModule(ajax([bear]), socket());

    var vm = module.addToWindow(window);

    new Sequence(module, done)
        .when('serverCurrentBearReceived', function(x) {
          vm.signIn("jason",3);
        })
        .then('hasSignedIn');

  });

});


