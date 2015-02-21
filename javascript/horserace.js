$(function() {
  $('#start').hide();
  $('#awards').hide();

  $('.pony button').click(function() {
    $(this).parent().addClass('chosen');
    $('.pony button').hide();
    $('#start').slideDown('slow');
    
    /*This is where I need to find a way to declare my horse choice based on the '.pony button' parent
     - also make sure the variable has global scope for later use outside this function*/
    
  });
  $('#info').click(function() {
    $('footer').toggleClass('footshow');
  });
});

$('#start').on('click', function() {

  var finishLine = 100;

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
    this.allMoves = function() {
      return('Here are the postions after each move that ' + this.name + " made. " + this.eachMove + " " + this.eachMove.length);
    };
  }

  var calChrome = new Horse('California Chrome', 9, 6, 'horse1');
  var seaBiscuit = new Horse('Seabiscuit', 7, 7, 'horse2');
  var seattleSlew = new Horse('Seattle Slew', 5, 8.5, 'horse3');

  while(calChrome.position < finishLine && seaBiscuit.position < finishLine && seattleSlew.position < finishLine ) {
    horseRace();
  };

  allFinish();

  console.log('The race is finished. Here are the standings.')
  raceStatus();
  console.log(raceWinner());
  allHorseMoves();
  $('#awards').show();

});

$('#reset').click(function() {
  $('#start').hide();
  $('#awards').hide();
  $('.pony button').show();
  $('.pony').removeClass('chosen');
  raceHistory();
});




