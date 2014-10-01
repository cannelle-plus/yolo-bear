yolo-bear
=========

Site web statique proto


Install ruby
Install sass
follow the instructions of this page to do so : http://compass-style.org/install/

gem update --system
gem install compass

Add the path to compass.bat in your environment variables  ie:pathToRuby/bin


Json Contracts
==============


CreateGame :
------------

json expected : 

{
	"Id":"88085239-6f0f-48c6-b73d-017333cb99bb",
	"Version":0,
	"CorrelationId":"88085239-6f0f-48c6-b73d-017333cb99bc",
	"TokenId":"88085239-6f0f-48c6-b73d-017333cb99ba",
	"PayLoad": { "Case":"CreateGame",
				 "Fields": ["88085239-6f0f-48c6-b73d-017333cb99bb","2014-12-31T10:00:00","2014-12-31T09:34:12.456","Toulouse"]	
			   }
 }

 here fields stands for :

 	[	"88085239-6f0f-48c6-b73d-017333cb99bb", -> gameId
 		"2014-12-31T10:00:00",					-> creationDate
 		"2014-12-31T09:34:12.456",				-> gameDate
 		"Toulouse"								-> gameLocation
	]

JoinGame :
----------

json expected : 

{
	"Id":"88085239-6f0f-48c6-b73d-017333cb99bb",
	"Version":0,
	"CorrelationId":"88085239-6f0f-48c6-b73d-017333cb99bc",
	"TokenId":"88085239-6f0f-48c6-b73d-017333cb99ba",
	"PayLoad": { "Case":"JoinGame",
				 "Fields": ["88085239-6f0f-48c6-b73d-017333cb99bb"]	
			   }
 }

 here fields stands for :

 	[	"88085239-6f0f-48c6-b73d-017333cb99bb", -> gameId
	]	

AbandonGame :
-------------

json expected : 

{
	"Id":"88085239-6f0f-48c6-b73d-017333cb99bb",
	"Version":0,
	"CorrelationId":"88085239-6f0f-48c6-b73d-017333cb99bc",
	"TokenId":"88085239-6f0f-48c6-b73d-017333cb99ba",
	"PayLoad": { "Case":"JoinGame",
				 "Fields": ["88085239-6f0f-48c6-b73d-017333cb99bb"]	
			   }
 }

 here fields stands for :

 	[	"88085239-6f0f-48c6-b73d-017333cb99bb", -> gameId
	]		
