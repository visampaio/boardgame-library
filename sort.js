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
var fullTemplate = "<div class='container'><img height='' alt='' src='' class='GamePicture'><div class='overlay'><div class='linkA'><a class='GameLink' href='' target='_blank'><img class='logos' src='logos/bgglogo-original.png' /></a></div><div class='linkA'><a class='GameVideoLink' href='' target='_blank'><img class='logos' src='logos/watchitplayed-original.jpeg' /></a></div></div></div><p id='GameName'>Title: </p><p id='GamePlayers'>Number of Players: </p><p id='GameTime'>Game Length: </p><p id='GameComplexity'>Game Complexity: </p><p id='GamePlayed'>Previously Played: </p><p id='GameMode'>Game Type: </p>";
var picturesHeight = 200;
var revUnplayedOriginal;

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

// Accessibility Buttons: Increase, Decrease, and reset Image sizes
  increaseImg.addEventListener("click", function() {
    var pictures = document.getElementsByClassName("GamePicture");
    for (var i=0; i<pictures.length; i++) {
    pictures[i].height = pictures[i].height*1.1;
  }
    picturesHeight = pictures[0].height;
  });

  decreaseImg.addEventListener("click", function() {
    var pictures = document.getElementsByClassName("GamePicture");
    for (var i=0; i<pictures.length; i++) {
    pictures[i].height = pictures[i].height*0.9;
  }
    picturesHeight = pictures[0].height;
  });

  resetImgSize.addEventListener("click", function() {
    picturesHeight = 200;
    var pictures = document.getElementsByClassName("GamePicture");
    for (var i=0; i<pictures.length; i++) {
    pictures[i].height = picturesHeight;
  }
  });

// Button: Show the entire collection

fullCollection.addEventListener("click", function() {
  if (bgList) {
setTimeout(function() {
  document.getElementById("selectedGames").innerHTML = "Number of Games selected: " + bgList.length + "<br>";
  for (var i=0; i<bgList.length; i++) {
    document.getElementById("selectedGames").innerHTML += "<div class='container'><img height='' alt='' src='' class='GamePicture'></img><div class='overlay'><div class='linkA'><a class='GameLink' href='' target='_blank'><img class='logos' src='logos/bgglogo-original.png' /></a></div><div class='linkA'><a class='GameVideoLink' href='' target='_blank'><img class='logos' src='logos/watchitplayed-original.jpeg' /></a></div></div></div>";
    var pictures = document.getElementsByClassName("GamePicture");
    var gameLink = document.getElementsByClassName("GameLink");
    var gameVideoLink = document.getElementsByClassName("GameVideoLink");
    for (var j=0; j<pictures.length; j++) {
      pictures[j].alt=bgList[j].Game;
      pictures[j].height=picturesHeight;
      pictures[j].src=bgList[j].Picture;
      gameLink[j].href= bgList[j].Link;

      if (bgList[j].Video) {
      gameVideoLink[j].href= bgList[j].Video;
      }
      else {
        gameVideoLink[j].style='visibility:hidden;'
      }
      if(bgList[j].Played == "No" && unplayed.checked) {
        // Option with yellow outline to represent games unplayed
        // pictures[j].style='outline: 3px solid yellow; outline-offset: -10px;';
        pictures[j].style='-webkit-filter: grayscale(100%); filter: grayscale(100%);';
      }
    }
  }
    document.getElementById("loader").style.display = "none";
}, 1);
    document.getElementById("selectedGames").innerHTML += "<div id='loader'></div>"
  }
  else {
    document.getElementById("selectedGames").innerHTML += "<div id='error'> <b>Error:</b> The CSV file has not loaded yet. If the CSV file is located online, please wait a few seconds (2 or 3 seconds) and try again.</div>";
  };
});

// Preserve 'Reveal Unplayed' Status when selecting 'New Games Only' Option
checkNew.addEventListener("change", function() {
  if (checkNew.checked) {
    revUnplayedOriginal = unplayedGames.checked;
    unplayedGames.checked = false;
  }
  else {
    unplayedGames.checked = revUnplayedOriginal;
  }
})

// Button: Choose a random game based on the current filters
choose.addEventListener("click", function() {
  if (bgList) {
  var picture = document.getElementsByClassName("GamePicture");
  var gameLink = document.getElementsByClassName("GameLink");
  var gameVideoLink = document.getElementsByClassName("GameVideoLink");
  filteredList = [];
  document.getElementById("selectedGames").innerHTML = fullTemplate;
  console.log(sort(bgList));
  console.log(document.getElementsByClassName("GamePicture").height);
  document.getElementById("GameName").append(selected.Game);
  document.getElementById("GamePlayers").append(selected.Players);
  document.getElementById("GameTime").append(selected.Time);
  document.getElementById("GameComplexity").append(selected.Complexity);
  document.getElementById("GamePlayed").append(selected.Played);
  document.getElementById("GameMode").append(selected.Mode);
  picture[0].height = picturesHeight;
  picture[0].alt = selected.Game;
  picture[0].src = selected.Picture;
  gameLink[0].href = selected.Link;

  if (selected.Video) {
  gameVideoLink[0].href = selected.Video;
  }
  else {
    gameVideoLink[0].style = 'visibility:hidden;'
  }
}
else {
  document.getElementById("selectedGames").innerHTML += "<div id='error'> <b>Error:</b> The CSV file has not loaded yet. If the CSV file is located online, please wait a few seconds (2 or 3 seconds) and try again.</div>";
};
});



// Button: List all games based on the current filters
list.addEventListener("click", function() {
  filteredList = [];
  document.getElementById("selectedGames").innerHTML = "<p id='numberOfGames'> </p>";
  console.log(filter(bgList));

  if (bgList) {
    setTimeout(function() {
    for (var i=0; i<filteredList.length; i++) {
      document.getElementById("selectedGames").innerHTML += "<div class='container'><img height='' alt='' src='' class='GamePicture'></img><div class='overlay'><div class='linkA'><a class='GameLink' href='' target='_blank'><img class='logos' src='logos/bgglogo-original.png' /></a></div><div class='linkA'><a class='GameVideoLink' href='' target='_blank'><img class='logos' src='logos/watchitplayed-original.jpeg' /></a></div></div></div>";
      // document.getElementById("selectedGames").innerHTML += "<span class='GameContainer'><a class='GameLink' href='' target='_blank'><img height=200px src='' class='GamePicture'></img> <span class='Overlay' style='opacity:0'>New Game</span></a></span>";
      var pictures = document.getElementsByClassName("GamePicture");
      var gameLink = document.getElementsByClassName("GameLink");
      var gameVideoLink = document.getElementsByClassName("GameVideoLink");
      // var newGame = document.getElementsByClassName("Overlay");
      for (var j=0; j<pictures.length; j++) {
        pictures[j].alt=filteredList[j].Game;
        pictures[j].height= picturesHeight;
        pictures[j].src= filteredList[j].Picture;
        gameLink[j].href= filteredList[j].Link;

        if (filteredList[j].Video) {
        gameVideoLink[j].href= filteredList[j].Video;
        }
        else {
          gameVideoLink[j].style='visibility:hidden;'
        }
        if(filteredList[j].Played == "No" && unplayed.checked) {
          pictures[j].style='-webkit-filter: grayscale(100%); filter: grayscale(100%);';
        }
      }
    }
      document.getElementById("numberOfGames").append("Number of Games selected: " + filteredList.length);
      document.getElementById("loader").style.display = "none";
    }, 1);
        document.getElementById("selectedGames").innerHTML += "<div id='loader'></div>";
  }

  else {
    document.getElementById("selectedGames").innerHTML += "<div id='error'> <b>Error:</b> The CSV file has not loaded yet. If the CSV file is located online, please wait a few seconds (2 or 3 seconds) and try again.</div>";
  };

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
  if (bgList) {
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
  else {
  document.getElementById("selectedGames").innerHTML += "<div id='error'> <b>Error:</b> The CSV file has not loaded yet. If the CSV file is located online, please wait a few seconds (2 or 3 seconds) and try again.</div>";
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
