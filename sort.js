const selPlayer = document.getElementById('selectPlayer');
const selLength = document.getElementById('selectLength');
const selComplex = document.getElementById('selectComplex');
const selMode = document.getElementById('selectMode');
const checkNew = document.getElementById('checkNew');
const maxPlayers = document.getElementById('maxPlayers');
const choose = document.getElementById('choose');
const list = document.getElementById('list');
const fullCollection = document.getElementById('fullCollection');
const unplayed = document.getElementById('unplayedGames');

var bgList;
var filteredList = [];
var selected = [];
var template = document.getElementById("selectedGames").innerHTML;


// Using Papaparse library to parse a CSV to be filtered.
// Cors-anywhere is currently used to bypass CORS restrictions in regards to accessing the CSV directly from GDrive.
  Papa.parse("https://cors-anywhere.herokuapp.com/https://docs.google.com/spreadsheets/d/e/2PACX-1vSK-1NdXaNwkyIZPiKHahN5jC3pckcvaU9PBv1dN-PCJ-aP5x8Iss4ghw5qCwe0KYSbE0Kzclv-5J8q/pub?gid=332499702&single=true&output=csv", {
    download: true,
    header: true,
    // delimiter: "",
    complete: function(results) {
      bgList = results.data;
      splitPlayers(bgList);
  	}
  });

// Button: Show the entire collection
fullCollection.addEventListener("click", function() {
  document.getElementById("selectedGames").innerHTML = "Number of Games selected: " + bgList.length + "<br>";
  for (var i=0; i<bgList.length; i++) {
    document.getElementById("selectedGames").innerHTML += "<a class='GameLink' href='' target='_blank'><img height=200px src='' class='GamePicture'></img></a>";
    var pictures = document.getElementsByClassName("GamePicture");
    var gameLink = document.getElementsByClassName("GameLink");
    for (var j=0; j<pictures.length; j++) {
      pictures[j].src=bgList[j].Picture;
      gameLink[j].href= bgList[j].Link;

      if(bgList[j].Played == "No" && unplayed.checked) {
        // Option with yellow outline to represent games unplayed
        // pictures[j].style='outline: 3px solid yellow; outline-offset: -10px;';
        pictures[j].style='-webkit-filter: grayscale(100%); filter: grayscale(100%);';
      }
    }
  }
});

// Button: Choose a random game based on the current filters
choose.addEventListener("click", function() {
  filteredList = [];
  document.getElementById("selectedGames").innerHTML = template;
  console.log(sort(bgList));
  document.getElementById("GameName").append(selected.Game);
  document.getElementById("GamePlayers").append(selected.Players);
  document.getElementById("GameTime").append(selected.Time);
  document.getElementById("GameComplexity").append(selected.Complexity);
  document.getElementById("GamePlayed").append(selected.Played);
  document.getElementById("GameMode").append(selected.Mode);
  document.getElementById("GamePicture").src=selected.Picture;
  document.getElementById("GameLink").href=selected.Link;
});

// Button: List all games based on the current filters
list.addEventListener("click", function() {
  filteredList = [];
  document.getElementById("selectedGames").innerHTML = "<p id='numberOfGames'> </p>";
  console.log(filter(bgList));
  for (var i=0; i<filteredList.length; i++) {
    document.getElementById("selectedGames").innerHTML += "<a class='GameLink' href='' target='_blank'><img height=200px src='' class='GamePicture'></img></a>";
    // document.getElementById("selectedGames").innerHTML += "<span class='GameContainer'><a class='GameLink' href='' target='_blank'><img height=200px src='' class='GamePicture'></img> <span class='Overlay' style='opacity:0'>New Game</span></a></span>";
    var pictures = document.getElementsByClassName("GamePicture");
    var gameLink = document.getElementsByClassName("GameLink");
    // var newGame = document.getElementsByClassName("Overlay");
    for (var j=0; j<pictures.length; j++) {
      pictures[j].src= filteredList[j].Picture;
      gameLink[j].href= filteredList[j].Link;

      if(filteredList[j].Played == "No" && unplayed.checked) {
        pictures[j].style='-webkit-filter: grayscale(100%); filter: grayscale(100%);';
      }
    }
  }
    document.getElementById("numberOfGames").append("Number of Games selected: " + filteredList.length);
});

// Randomly pick an item from the array
function sort(){
  filteredList = filter(bgList);
  selected = filteredList[Math.floor(Math.random() * filteredList.length)];
  return selected;
}

// Filter CSV array based on selected filters
function filter(bgList){
   if(selectPlayer.value != ""){
   filterPlayer(bgList);
   }
   else {
     filteredList = bgList;
   }
   if(selLength.value != ""){
     filteredList = filterLength(filteredList);
   }
   if(selComplex.value != ""){
     filteredList = filterComplex(filteredList);
   }
   if(selMode.value != ""){
     filteredList = filterMode(filteredList);
   }
   if(checkNew.checked){
     filteredList = filterPlayed(filteredList);
   }

   return filteredList;
}

// Filters
function filterPlayer(bgList){

  for(var i=0; i<bgList.length; i++) {

    switch(maxPlayers.checked) {
      case true:
        if (bgList[i].Players[bgList[i].Players.length-1] == selPlayer.value) {
          filteredList.push(bgList[i]);
        }
        break;
      case false:
      for(var j=0; j<bgList[i].Players.length; j++){
        if (bgList[i].Players[j] == selPlayer.value) {
          filteredList.push(bgList[i]);
        }
      }
        break;
    }
  }
}

function filterLength(filteredList){
  var filtradinho = [];

  for(var i=0; i<filteredList.length; i++) {
    if (filteredList[i].Time == selLength.value) {
        filtradinho.push(filteredList[i]);
    }
  }
  filteredList = filtradinho;
  return filteredList;
}

function filterComplex(filteredList){
  var filtradinho = [];

  for(var i=0; i<filteredList.length; i++) {
    if (filteredList[i].Complexity == selComplex.value) {
        filtradinho.push(filteredList[i]);
    }
  }

  filteredList = filtradinho;
  return filteredList;
}

function filterMode(filteredList){
  var filtradinho = [];
  for(var i=0; i<filteredList.length; i++) {
    if (filteredList[i].Mode == selMode.value) {
        filtradinho.push(filteredList[i]);
    }
  }

  filteredList = filtradinho;
  return filteredList;
}

function filterPlayed(filteredList){
  var filtradinho = [];

  for(var i=0; i<filteredList.length; i++) {
    if (filteredList[i].Played == "No") {
        filtradinho.push(filteredList[i]);
    }
  }

  filteredList = filtradinho;
  return filteredList;
}

// Split players field into an array
function splitPlayers(games){
  for(var i=0; i<games.length-1; i++) {
    games[i].Players = games[i].Players.split(",");
  };
}
