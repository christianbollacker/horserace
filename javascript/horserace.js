$(function() {
  $('.pony button').click(function() {
    $(this).addClass('chosen');
    $('.pony button').hide();
  });
  $('#info').click(function() {
    $('footer').toggleClass('footshow');
  });

});

$('#start').on('click', function() {

});


$('#start').on('click', function() {




var finishLine = 100;
var horseRace = function() {
  calChrome.run();
  seaBiscuit.run();
  seattleSlew.run();
};
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
var Horse = function(name, speed, endurance){
  this.name = name;
  this.speed = speed;
  this.endurance = endurance;
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
  this.allMoves = function() {
    return('Here are the postions after each move that ' + this.name + " made. " + this.eachMove + " " + this.eachMove.length);
  };
}
var calChrome = new Horse('California Chrome', 9, 6);
var seaBiscuit = new Horse('Seabiscuit', 7, 7);
var seattleSlew = new Horse('Seattle Slew', 5, 8.5);
while(calChrome.position < finishLine && seaBiscuit.position < finishLine && seattleSlew.position < finishLine ) {
  horseRace();
};
console.log('The race is finished. Here are the standings.')
raceStatus();
console.log(raceWinner());
allHorseMoves();

  $.each(calChrome.eachMove, function() {
        var yards = this;
    $('#horse1').animate({
      marginLeft: "1000"
      }, 5000, "linear", function() {
   });
  });
});