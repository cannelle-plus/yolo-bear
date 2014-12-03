var assert = require('chai').assert;
var to = require('../../src/js/reactiveSources/to');
var SignedBear = require("../../src/js/model/signedBear");
var ajax = require('../helper/fakeAjaxGame.helper');
var socket = require('../helper/fakeSocketGame.helper');
var GamesViewModel = require('../../src/js/viewmodel/gamesViewModel');
var calljsDom = require('./calljsDom');
var logger = require('../../src/js/logger');
var bear2bearModule = require('../../src/js/bear2bearModule');
var uuid = require('node-uuid');
var Sequence = require('./sequence');


var GameModule = bear2bearModule("game", GamesViewModel);
var currentBear = new SignedBear( "12","yoann");


describe("Given that  nothing happenned before,", function() {

  calljsDom("When we initialize a gamesViewModel with the fakeAjax server, then we receive two events from the server", "games.html", function(done, window, navigation) {

    var module = new GameModule(ajax(), socket());

   new Sequence(module, done)
        .whenCount('serverGameAdded', 2, done);

    var vm = module.addToWindow(window, navigation, currentBear);

    vm.getGames();

  });

  calljsDom("When we initialize a gamesViewModel with the fakeAjax server, then we have two gameAdded events", "games.html", function(done, window, navigation) {

    var module = new GameModule(ajax(), socket());

    new Sequence(module, done)
        .whenCount('gameAdded', 2, done);

    var vm = module.addToWindow(window, navigation, currentBear);

    vm.getGames();

  });

  calljsDom("When we initialize a gamesViewModel with the fakeAjax server, then these events produce in turn uiGame events after rendering html", "games.html", function(done, window, navigation) {

    var module = new GameModule(ajax(), socket());

    new Sequence(module, done)
        .whenCount('uiGameAdded', 2, done);

    var vm = module.addToWindow(window, navigation, currentBear);

    vm.getGames();

  });

});

describe("when joining a game", function() {

  calljsDom("we join the game", "games.html", function(done, window, navigation) {

    // logger.setLevel("DEBUG");

    var module = new GameModule(ajax(), socket());

    var vm = module.addToWindow(window, navigation, currentBear);

    vm.getGames();

    new Sequence(module, done)
        .whenCount('gameAdded', 2, function(){
          vm.Join('4a82199e-7c30-4a95-b194-6d40127fbb89');
        })
        .then('gameJoined');

  });

  calljsDom("we have an ui transormation", "games.html", function(done, window, navigation) {

    var module = new GameModule(ajax(), socket());

    var vm = module.addToWindow(window, navigation, currentBear);

    vm.getGames();

    new Sequence(module, done)
      .whenCount('gameAdded', 2, function(){
        vm.Join('4a82199e-7c30-4a95-b194-6d40127fbb89');
      })
      .then('uiPlayerAddedToGame');

  });

});

describe("Given we have joined a game , when abandonning a game ", function() {


  calljsDom("we abandon the game", "games.html", function(done, window, navigation) {

    var module = new GameModule(ajax(), socket());

    var vm = module.addToWindow(window, navigation, currentBear);

    vm.getGames();

    new Sequence(module, done)
      .whenCount('gameAdded', 2, function(){
        vm.Join('4a82199e-7c30-4a95-b194-6d40127fbb89');
      })
      .when('gameJoined',function(){
        vm.Abandon('4a82199e-7c30-4a95-b194-6d40127fbb89');
      })
      .then('gameAbandonned');

  });

  calljsDom("we have an ui transormation", "games.html", function(done, window, navigation) {

    var module = new GameModule(ajax(), socket());

    var vm = module.addToWindow(window, navigation, currentBear);

    vm.getGames();

    new Sequence(module, done)
      .whenCount('gameAdded', 2, function(){
        vm.Join('4a82199e-7c30-4a95-b194-6d40127fbb89');
      })
      .when('gameJoined',function(){
        vm.Abandon('4a82199e-7c30-4a95-b194-6d40127fbb89');
      })
      .then('uiPlayerAddedToGame');

  });

});

describe("when scheduling a game", function() {


  calljsDom("we schedule the game", "games.html", function(done, window, navigation) {

    // logger.setLevel('DEBUG');

    //we wait for the viewModel to have been completed with new games, before joining one of them
    var name = 'test';
    var location = 'playSoccer';
    var date = '01/01/2020 10:00';
    var nbPlayers = 10;

    var module = new GameModule(ajax(), socket());

    var vm = module.addToWindow(window, navigation, currentBear);

    vm.getGames();

    vm.Schedule(name, location, date, nbPlayers);

    new Sequence(module, done).then('gameScheduled');

  });

  calljsDom("we have an ui transormation", "games.html", function(done, window, navigation) {

    //we wait for the viewModel to have been completed with new games, before joining one of them
    var name = 'test';
    var location = 'playSoccer';
    var date = '01/01/2020 10:00';
    var nbPlayers = 10;

    var module = new GameModule(ajax(), socket());

    var vm = module.addToWindow(window, navigation, currentBear);

    vm.getGames();

    vm.Schedule(name, location, date, nbPlayers);

    new Sequence(module, done).then('uiGameScheduled');    

  });

});

describe("Given that we scheduled a game", function() {

  calljsDom("when we join the game,  then the game  is not joined", "games.html", function(done, window, navigation) {

    // logger.setLevel('DEBUG');
        
    var name = 'test';
    var location = 'playSoccer';
    var date = '01/01/2020 10:00';
    var nbPlayers = 10;

    var module = new GameModule(ajax(), socket());

    var vm = module.addToWindow(window, navigation, currentBear);

    vm.getGames();

    vm.Schedule(name, location, date, nbPlayers);

    new Sequence(module, done)
      .when('gameScheduled',function(evt){
        vm.Join(evt.payLoad.id);
      })
      .then('gameNotJoined');

  });



  calljsDom("whe can abandon this game", "games.html", function(done, window, navigation) {

    // logger.setLevel('DEBUG');
    var name = 'test';
    var location = 'playSoccer';
    var date = '01/01/2020 10:00';
    var nbPlayers = 10;

    var module = new GameModule(ajax(), socket());

    var vm = module.addToWindow(window, navigation, currentBear);

    vm.getGames();

    vm.Schedule(name, location, date, nbPlayers);

    new Sequence(module, done)
      .when('gameScheduled',function(evt){
        vm.Abandon(evt.payLoad.id);
      })
      .then('gameAbandonned');

  });

});

describe("Given that we joined a scheduled game", function() {

  calljsDom("when we join the game anew,  then the game  is not joined", "games.html", function(done, window, navigation) {

    // logger.setLevel('DEBUG');
    var module = new GameModule(ajax(), socket());

    var vm = module.addToWindow(window, navigation, currentBear);

    vm.getGames();

    new Sequence(module, done)
      .whenCount('gameAdded', 2, function(){
        vm.Join('4a82199e-7c30-4a95-b194-6d40127fbb89');
      })
      .when('gameJoined',function(){
        vm.Join('4a82199e-7c30-4a95-b194-6d40127fbb89');
      })
      .then('gameNotJoined');

  });

});

describe("Given that we  have two games,", function() {

  calljsDom("when a new game is received through the socket,  then the game  is added", "games.html", function(done, window, navigation) {

    // logger.setLevel('DEBUG');
    var module = new GameModule(ajax(), socket());

    var vm = module.addToWindow(window, navigation, currentBear);

    vm.getGames();

    new Sequence(module, done)
      .whenCount('gameAdded', 2, function(){
        module.publish("emitFakeSocketGameScheduled", {id: uuid.v1() });
      })
      .whenCount('gameAdded', 3, done);

  });

});

describe("Given that we  have two games,", function() {

  calljsDom("when a new player joins the game through the socket,  then the ui is updated", "games.html", function(done, window, navigation) {

    // logger.setLevel('DEBUG');
    var module = new GameModule(ajax(), socket());

    var vm = module.addToWindow(window, navigation, currentBear);

    vm.getGames();

    new Sequence(module, done)
      .whenCount('gameAdded', 2, function(){
        module.publish("emitFakeSocketGameJoined", { id: '4a82199e-7c30-4a95-b194-6d40127fbb89'  });
      })
      .then('uiPlayerAddedToGame');

  });

});

describe("Given that we  have two games,", function() {

  calljsDom("when a  player abandons the game through the socket,  then the ui is updated", "games.html", function(done, window, navigation) {

    // logger.setLevel('DEBUG');
    var module = new GameModule(ajax(), socket());

    var vm = module.addToWindow(window, navigation, currentBear);

    vm.getGames();

    new Sequence(module, done)
      .whenCount('gameAdded', 2, function(){
        module.publish("emitFakeSocketGameAbandonned", {
            id: '4a82199e-7c30-4a95-b194-6d40127fbb89',
            username: 'aziz'
          });
      })
      .then('uiPlayerRemovedFromGame');

  });

});


describe("Given that we  have two games,", function() {

  calljsDom("when we ask for the detail of the first one,  then the ui is updated", "games.html", function(done, window, navigation) {

    // logger.setLevel('DEBUG');
    var module = new GameModule(ajax(), socket());

    var vm = module.addToWindow(window, navigation, currentBear);

    vm.getGames();

    new Sequence(module, done)
      .whenCount('gameAdded', 2, function(){
        vm.ViewDetail('4a82199e-7c30-4a95-b194-6d40127fbb89');
      })
      .then('uiGameDetailled');

  });

});