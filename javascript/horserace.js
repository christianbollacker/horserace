$(function() {
  $('#start').hide();
  $('#awards').hide();

  $('.pony button').on('click', function() {
    $(this).parent().addClass('chosen');
    $('.pony button').hide();
    $('#start').slideDown('slow');
  });

  $('#calChrome').on('click', function() {
    var userChoice = calChrome.name;
    console.log('The user has picked ' + userChoice + ' to win.');
  });

  $('#seaBiscuit').on('click', function() {
    var userChoice = seaBiscuit.name;
    console.log('The user has picked ' + userChoice + ' to win.');
  });

  $('#seattleSlew').on('click', function() {
    var userChoice = seattleSlew.name;
    console.log('The user has picked ' + userChoice + ' to win.');
  });

  $('#info').on('click', function() {
    $('footer').toggleClass('footshow');
  });


  var finishLine = 100;

  var userChoice = 0;

  var horseRace = function() {
    calChrome.run();
    seaBiscuit.run();
    seattleSlew.run();

    calChrome.updatePosition();
    seaBiscuit.updatePosition();
    seattleSlew.updatePosition();
  }

  var allFinish = function () {
    calChrome.raceFinish();
    seaBiscuit.raceFinish();
    seattleSlew.raceFinish();
  }

  var raceReset = function () {
    calChrome.horseReset();
    seaBiscuit.horseReset();
    seattleSlew.horseReset();
  }

  var raceStatus = function() {
    console.log(calChrome.horseStatus());
    console.log(seaBiscuit.horseStatus());
    console.log(seattleSlew.horseStatus());
  }

  var allHorseMoves = function() {
    console.log(calChrome.allMoves());
    console.log(seaBiscuit.allMoves());
    console.log(seattleSlew.allMoves());
  }

  var raceWinner = function() {
    if (calChrome.position > seaBiscuit.position && calChrome.position > seattleSlew.position) {
      return(calChrome.name);
    }
    else if (seaBiscuit.position > calChrome.position && seaBiscuit.position > seattleSlew.position) {
      return(seaBiscuit.name);
    }
    else {
      return(seattleSlew.name);
    }
  }

  function awardShow() {
    var primaPony = function() {
      return "<h1> The winner is " + raceWinner(); + "</h1>";
    } 
    var goodPick = function () {
      if (userChoice == raceWinner()) {
        return ("<p>Your horse won!  You sure now how to pick your ponies.</p>");
      } else {
        return ("<p>Your horse lost...  Better luck next time picking the ponies</p>");
      }
    }
    $('#awards').prepend(goodPick());
    $('#awards').prepend(primaPony());  
  }

  function raceHistory() {
    var toList = function (){
      return "<li>" + raceWinner(); + "</li>";
    }
    $('#winners > ul').prepend(toList());
  }
    
  var Horse = function(name, speed, endurance, num){
    this.name = name;
    this.speed = speed;
    this.endurance = endurance;
    this.num = num;
    this.position = 0;
    this.eachMove = [0];
    this.raceMojo = function() {
      return(Math.random() + 1);
    };
    this.horseStatus = function() {
      return(this.name + " is at yard marker " + Math.floor(this.position));
    };
    this.raceSpeed = function() {
      return(this.speed * ((finishLine - this.position) / finishLine) + this.endurance);
    };
    this.run = function() {
      this.position += (this.raceSpeed() * this.raceMojo());
      this.eachMove.push(Math.floor(this.position));
    };
    this.updatePosition = function() {
      $('#' + this.num).animate({marginLeft: (this.position * 10)}, 500, 'linear');
    };
    this.raceFinish = function() {
      if (this.position < 100) {
        $('#' + this.num).animate({marginLeft: '1000'}, 200, 'linear');
      }
    };
    this.horseReset = function() {
      this.position = 0;
      this.eachMove = [0];
      $('#' + this.num).animate({marginLeft: '0'}, 0);
    };
    this.allMoves = function() {
      return('Here are the postions after each move that ' + this.name + " made. " + this.eachMove + " " + this.eachMove.length);
    };
  }

  var calChrome = new Horse('California Chrome', 9, 6, 'horse1');
  var seaBiscuit = new Horse('Seabiscuit', 7, 7, 'horse2');
  var seattleSlew = new Horse('Seattle Slew', 5, 8.4, 'horse3');

  $('#start').on('click', function() {
    while(calChrome.position < finishLine && seaBiscuit.position < finishLine && seattleSlew.position < finishLine ) {
      horseRace();
    };

    allFinish();

    console.log('The race is finished. Here are the standings.')
    raceStatus();
    console.log(raceWinner());
    allHorseMoves();
    awardShow();

    $('#awards').delay(4000).show('fast');
  });

  $('#reset').click(function() {
    $('#start').hide();
    $('#awards').hide();
    $('#awards h1').remove();
    $('#awards p').remove();
    $('.pony button').show();
    $('.pony').removeClass('chosen');
    raceHistory();
    raceReset();
  });

});



