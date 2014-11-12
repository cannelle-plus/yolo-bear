var assert = require('chai').assert;
var Reactive = require('../../src/js/reactiveSources/reactive');
var Session = require("../../src/js/session");
var Ajax = require('../../src/jsTap/fakeAjax');
var Socket = require('../../src/jsTap/fakeSocket');
var GamesViewModel = require('../../src/js/viewmodel/gamesViewModel');
var calljsDom = require('./calljsDom');
var logger = require('../../src/js/logger');
var uuid = require('node-uuid');


describe("Given that  nothing happenned before,", function() {

  calljsDom("When we initialize a gamesViewModel with the fakeAjax server, then we receive two events from the server", "games.html", function(done, window, reactive) {

    var to = reactive.to;

    var source = reactive.observable('serverGameAdded')
      .scan(0, function(count, x) {
        return count + 1;
      })
      .subscribe(to(function(x) {
        if (x == 2) done();
      }));

    var vm = new GamesViewModel(window, reactive, Session.current(), new Ajax(window), new Socket(reactive));

  });

  calljsDom("When we initialize a gamesViewModel with the fakeAjax server, then we have two gameAdded events", "games.html", function(done, window, reactive) {

    var to = reactive.to;

    var source = reactive.observable('gameAdded')
      .scan(0, function(count, x) {
        return count + 1;
      })
      .subscribe(to(function(x) {
        if (x == 2) done();
      }));

    var vm = new GamesViewModel(window, reactive, Session.current(), new Ajax(window), new Socket(reactive));

  });

  calljsDom("When we initialize a gamesViewModel with the fakeAjax server, then these events produce in turn uiGame events after rendering html", "games.html", function(done, window, reactive) {

    var to = reactive.to;

    var source = reactive.observable('uiGameAdded')
      .scan(0, function(count, x) {
        return count + 1;
      })
      .subscribe(to(function(x) {
        if (x == 2) done();
      }));

    var vm = new GamesViewModel(window, reactive, Session.current(), new Ajax(window), new Socket(reactive));

  });

});

describe("when joining a game", function() {

  calljsDom("we join the game", "games.html", function(done, window, reactive) {

    var to = reactive.to;
    var vm = new GamesViewModel(window, reactive, Session.current(), new Ajax(window), new Socket(reactive));

    //we wait for the viewModel to have been completed with new games, before joining one of them
    reactive.observable('gameAdded')
      .scan(0, function(count, x) {
        return count + 1;
      })
      .subscribe(to(function(x) {
        if (x == 2) {
          vm.Join('4a82199e-7c30-4a95-b194-6d40127fbb89');
        }
      }));

    reactive.observable('gameJoined')
      .subscribe(to(function() {
        done();
      }));
  });

  calljsDom("we have an ui transormation", "games.html", function(done, window, reactive) {

    var to = reactive.to;

    var vm = new GamesViewModel(window, reactive, Session.current(), new Ajax(window), new Socket(reactive));

    //we wait for the viewModel to have been completed with new games, before joining one of them
    reactive.observable('gameAdded')
      .scan(0, function(count, x) {
        return count + 1;
      })
      .subscribe(to(function(x) {
        if (x == 2) {

          vm.Join('4a82199e-7c30-4a95-b194-6d40127fbb89');

        }
      }));

    reactive.observable('uiGameUpdated')
      .subscribe(to(function() {
        done();
      }));


  });

});

describe("Given we have joined a game , when abandonning a game ", function() {


  calljsDom("we abandon the game", "games.html", function(done, window, reactive) {

    var to = reactive.to;

    var vm = new GamesViewModel(window, reactive, Session.current(), new Ajax(window), new Socket(reactive));

    //we wait for the viewModel to have been completed with new games, before joining one of them
    reactive.observable('gameAdded')
      .scan(0, function(count, x) {
        return count + 1;
      })
      .subscribe(to(function(x) {
        if (x == 2) {
          vm.Join('4a82199e-7c30-4a95-b194-6d40127fbb89');
        }
      }));

    reactive.observable('gameJoined')
      .subscribe(to(function() {
        vm.Abandon('4a82199e-7c30-4a95-b194-6d40127fbb89');
      }));

    reactive.observable('gameAbandonned')
      .subscribe(to(function() {
        done();
      }));


  });

  // calljsDom("we receive a event from the server", "games.html",  function(done, window, reactive) {

  //    var to = reactive.to;

  //    var vm = new GamesViewModel(window, reactive, Session.current(), new Ajax(window), new Socket(reactive));   

  //    //we wait for the viewModel to have been completed with new games, before joining one of them
  //    reactive.observable('gameAdded')
  //            .scan(0, function(count, x) { return count + 1 ;})
  //            .subscribe(to(function(x){
  //               if (x==2)  
  //               {

  //                 vm.Join('4a82199e-7c30-4a95-b194-6d40127fbb89');

  //               }
  //            }));

  //    reactive.observable('gameJoined')
  //            .subscribe(to(function(){
  //                  vm.Abandon('4a82199e-7c30-4a95-b194-6d40127fbb89');
  //            }));

  //     reactive.observable('serverGameAbandonned')
  //            .subscribe(to(function(){
  //               done();
  //            }));

  // });

  calljsDom("we have an ui transormation", "games.html", function(done, window, reactive) {

    var to = reactive.to;

    var vm = new GamesViewModel(window, reactive, Session.current(), new Ajax(window), new Socket(reactive));

    //we wait for the viewModel to have been completed with new games, before joining one of them
    reactive.observable('gameAdded')
      .scan(0, function(count, x) {
        return count + 1;
      })
      .subscribe(to(function(x) {
        if (x == 2) {
          vm.Join('4a82199e-7c30-4a95-b194-6d40127fbb89');
        }
      }));

    reactive.observable('gameJoined')
      .subscribe(to(function() {
        vm.Abandon('4a82199e-7c30-4a95-b194-6d40127fbb89');
      }));

    reactive.observable('uiGameUpdated')
      .scan(0, function(count, x) {
        return count + 1;
      })
      .subscribe(to(function(x) {
        if (x == 2) {
          done();
        }
      }));
  });

});

describe("when scheduling a game", function() {


  calljsDom("we schedule the game", "games.html", function(done, window, reactive) {

    // logger.setLevel('DEBUG');

    var to = reactive.to;

    var vm = new GamesViewModel(window, reactive, Session.current(), new Ajax(window), new Socket(reactive));

    //we wait for the viewModel to have been completed with new games, before joining one of them
    var name = 'test';
    var location = 'playSoccer';
    var date = '01/01/2020 10:00';
    var nbPlayers = 10;


    reactive.observable('gameScheduled')
      .subscribe(to(function() {
        done();
      }));

    vm.Schedule(name, location, date, nbPlayers);

  });

  // calljsDom("we receive a event from the server", "games.html",  function(done, window, reactive) {

  //    var to = reactive.to;

  //    var vm = new GamesViewModel(window, reactive, Session.current(), new Ajax(window), new Socket(reactive));   

  //    reactive.observable('serverGameScheduled')
  //            .subscribe(to(function(){  
  //               done();
  //            }));

  //    //we wait for the viewModel to have been completed with new games, before joining one of them
  //    var name = 'test';
  //    var location = 'playSoccer';
  //    var date = '01/01/2020 10:00';
  //    var  nbPlayers = 10;

  //     vm.Schedule(name, location, date, nbPlayers);

  // });

  calljsDom("we have an ui transormation", "games.html", function(done, window, reactive) {

    var to = reactive.to;

    var vm = new GamesViewModel(window, reactive, Session.current(), new Ajax(window), new Socket(reactive));

    reactive.observable('uiGameScheduled')
      .subscribe(to(function() {
        done();
      }));

    //we wait for the viewModel to have been completed with new games, before joining one of them
    var name = 'test';
    var location = 'playSoccer';
    var date = '01/01/2020 10:00';
    var nbPlayers = 10;

    vm.Schedule(name, location, date, nbPlayers);

  });

});

describe("Given that we scheduled a game", function() {

  calljsDom("when we join the game,  then the game  is nto joined", "games.html", function(done, window, reactive) {

    // logger.setLevel('DEBUG');

    var to = reactive.to;

    var vm = new GamesViewModel(window, reactive, Session.current(), new Ajax(window), new Socket(reactive));

    //we wait for the viewModel to have been completed with new games, before joining one of them
    var name = 'test';
    var location = 'playSoccer';
    var date = '01/01/2020 10:00';
    var nbPlayers = 10;


    reactive.observable('gameScheduled')
      .subscribe(to(function(evt) {
        vm.Join(evt.payLoad.id);
      }));

    reactive.observable('gameNotJoined')
      .subscribe(to(function(evt) {
        done();
      }));

    vm.Schedule(name, location, date, nbPlayers);

  });



  calljsDom("whe can abandon this game", "games.html", function(done, window, reactive) {

    // logger.setLevel('DEBUG');

    var to = reactive.to;

    var vm = new GamesViewModel(window, reactive, Session.current(), new Ajax(window), new Socket(reactive));

    var name = 'test';
    var location = 'playSoccer';
    var date = '01/01/2020 10:00';
    var nbPlayers = 10;

    reactive.observable('gameScheduled')
      .subscribe(to(function(evt) {
        vm.Abandon(evt.payLoad.id);
      }));

    reactive.observable('gameAbandonned')
      .subscribe(to(function(evt) {
        done();
      }));

    vm.Schedule(name, location, date, nbPlayers);

  });

});

describe("Given that we joined a scheduled game", function() {

  calljsDom("when we join the game anew,  then the game  is not joined", "games.html", function(done, window, reactive) {

    // logger.setLevel('DEBUG');

    var to = reactive.to;

    var vm = new GamesViewModel(window, reactive, Session.current(), new Ajax(window), new Socket(reactive));

    //we wait for the viewModel to have been completed with new games, before joining one of them
    reactive.observable('gameAdded')
      .scan(0, function(count, x) {
        return count + 1;
      })
      .subscribe(to(function(x) {
        if (x == 2) {

          vm.Join('4a82199e-7c30-4a95-b194-6d40127fbb89');

        }
      }));


    reactive.observable('gameJoined')
      .subscribe(to(function(evt) {
        vm.Join('4a82199e-7c30-4a95-b194-6d40127fbb89');
      }));

    reactive.observable('gameNotJoined')
      .subscribe(to(function(evt) {
        done();
      }));


    var name = 'test';
    var location = 'playSoccer';
    var date = '01/01/2020 10:00';
    var nbPlayers = 10;

    vm.Schedule(name, location, date, nbPlayers);

  });

});

describe("Given that we  have two games,", function() {

  calljsDom("when a new game is received through the socket,  then the game  is added", "games.html", function(done, window, reactive) {

    // logger.setLevel('DEBUG');

    var to = reactive.to;

    //we wait for the viewModel to have been completed with new games, before joining one of them
    reactive.observable('gameAdded')
      .scan(0, function(count, x) {
        return count + 1;
      })
      .subscribe(to(function(x) {
        if (x == 2) {
          reactive.publish("emitFakeSocketGameCreated", {
            id: uuid.v1()
          });
        }
        if (x == 3) {
          done();
        }
      }));


    var vm = new GamesViewModel(window, reactive, Session.current(), new Ajax(window), new Socket(reactive));



  });

});

describe("Given that we  have two games,", function() {

  calljsDom("when a new player joins the game through the socket,  then the ui is updated", "games.html", function(done, window, reactive) {

    // logger.setLevel('DEBUG');

    var to = reactive.to;

    //we wait for the viewModel to have been completed with new games, before joining one of them
    reactive.observable('gameAdded')
      .scan(0, function(count, x) {
        return count + 1;
      })
      .subscribe(to(function(x) {
        if (x == 2) {
          reactive.publish("emitFakeSocketGameJoined", {
            id: '4a82199e-7c30-4a95-b194-6d40127fbb89'
          });
        }
      }));

    reactive.observable('uiGameUpdated')
      .scan(0, function(count, x) {
        return count + 1;
      })
      .subscribe(to(function(x) {
        done();
      }));


    var vm = new GamesViewModel(window, reactive, Session.current(), new Ajax(window), new Socket(reactive));



  });

});

describe("Given that we  have two games,", function() {

  calljsDom("when a  player abandons the game through the socket,  then the ui is updated", "games.html", function(done, window, reactive) {

    // logger.setLevel('DEBUG');

    var to = reactive.to;


    //we wait for the viewModel to have been completed with new games, before joining one of them
    reactive.observable('gameAdded')
      .scan(0, function(count, x) {
        return count + 1;
      })
      .subscribe(to(function(x) {
        if (x == 2) {
          reactive.publish("emitFakeSocketGameAbandonned", {
            id: '4a82199e-7c30-4a95-b194-6d40127fbb89',
            username: 'aziz'
          });
        }
      }));

    reactive.observable('uiGameUpdated')
      .scan(0, function(count, x) {
        return count + 1;
      })
      .subscribe(to(function(x) {
        done();
      }));


    var vm = new GamesViewModel(window, reactive, Session.current(), new Ajax(window), new Socket(reactive));



  });

});


describe("Given that we  have two games,", function() {

  calljsDom("when we ask for the detail of the first one,  then the ui is updated", "games.html", function(done, window, reactive) {

    // logger.setLevel('DEBUG');

    var to = reactive.to;

    var vm = new GamesViewModel(window, reactive, Session.current(), new Ajax(window), new Socket(reactive));


    //we wait for the viewModel to have been completed with new games, before viewing the detail of one of them
    reactive.observable('gameAdded')
      .scan(0, function(count, x) {
        return count + 1;
      })
      .subscribe(to(function(x) {
        if (x == 2) {
          vm.ViewDetail('4a82199e-7c30-4a95-b194-6d40127fbb89');
        }
      }));

    reactive.observable('uiGameUpdated')
      .scan(0, function(count, x) {
        return count + 1;
      })
      .subscribe(to(function(x) {
        done();
      }));


  });

});