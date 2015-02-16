
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
  };
}

var calChrome = new Horse('California Chrome', 9, 6);
var seaBiscuit = new Horse('Seabiscuit', 7, 7);
var seattleSlew = new Horse('Seattle Slew', 5, 8.5);

while(calChrome.position < (finishLine *.25) && seaBiscuit.position < (finishLine * .25) && seattleSlew.position < (finishLine * .25) ) {
  horseRace();
};

console.log('We are about ' + (finishLine * .25) + ' yards or 1/4 through the race.  Here are the standings.')
raceStatus();

while(calChrome.position < (finishLine *.5) && seaBiscuit.position < (finishLine * .5) && seattleSlew.position < (finishLine * .5) ) {
  horseRace();
};

console.log('We are about ' + (finishLine * .5) + ' yards or 1/2 through the race.  Here are the standings.')
raceStatus();

while(calChrome.position < (finishLine *.75) && seaBiscuit.position < (finishLine * .75) && seattleSlew.position < (finishLine * .75)) {
  horseRace();
};

console.log('We are about ' + (finishLine * .75) + ' yards or 3/4 through the race.  Here are the standings.')
raceStatus();

while(calChrome.position < finishLine && seaBiscuit.position < finishLine && seattleSlew.position < finishLine ) {
  horseRace();
};

console.log('The race is finished. Here are the standings.')
raceStatus();
console.log(raceWinner());
