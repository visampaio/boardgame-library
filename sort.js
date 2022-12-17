const selPlayer = document.getElementById('selectPlayer');
const selLength = document.getElementById('selectLength');
const selComplex = document.getElementById('selectComplex');
const selMode = document.getElementById('selectMode');
const checkNew = document.getElementById('checkNew');
const checkPlayed = document.getElementById('checkPlayed');
const maxPlayers = document.getElementById('maxPlayers');
const minPlayers = document.getElementById('minPlayers');
const choose = document.getElementById('choose');
const list = document.getElementById('list');
const unplayed = document.getElementById('unplayedGames');
const pagination = document.getElementById('pagination');
const paginationItems = document.getElementById('paginationItems');

var segmentadinha = [];
var pageItems;
var pageNum = 0;
var bgList;
var filteredList = [];
var selected = [];
var fullTemplate = "<div class='container'><img height='' alt='' src='' class='GamePicture'><div class='overlay'><div class='linkA'><a class='GameLink' href='' target='_blank'><img class='logos' src='logos/bgglogo-original.png' /></a></div><div class='linkA'><a class='GameVideoLink' href='' target='_blank'><img class='logos' src='logos/watchitplayed-original.jpeg' /></a></div></div></div><p id='GameName'>Title: </p><p id='GamePlayers'>Number of Players: </p><p id='GameTime'>Game Length: </p><p id='GameComplexity'>Game Complexity: </p><p id='GamePlayed'>Previously Played: </p><p id='GameMode'>Game Type: </p><p id='GameLocation'>Game Location: </p>";
var picturesHeight = 200;
var revUnplayedOriginal;

document.getElementById("pageright").addEventListener("click", function() {
  pageNum++;
  listGames();
});

document.getElementById("pageleft").addEventListener("click", function() {
  pageNum--;
  listGames();
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

// Preserve 'Reveal Unplayed' Status when selecting 'New Games Only' Option
checkNew.addEventListener("change", function() {
  if (checkNew.checked) {
    checkPlayed.checked = false;
    revUnplayedOriginal = unplayedGames.checked;
    unplayedGames.checked = false;
  }
  else {
    unplayedGames.checked = revUnplayedOriginal;
  }
})

checkPlayed.addEventListener("change", function() {
  if (checkPlayed.checked) {
    checkNew.checked = false;
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
  document.getElementById("GameLocation").append(selected.Position);
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

pagination.addEventListener("change", function() {
  if (pagination.checked) {
    paginationItems.style='visibility:visible';
  }
  else {
    paginationItems.style='visibility:hidden';
  };
});
// Button: List all games based on the current filters
list.addEventListener("click", function() {
pageNum = 0;
if (pagination.checked) {
pageItems=Number(paginationItems.value);
listGames();
}
else {
pageItems= 9999;
listGames();
};
});


// Function: Organize filtered games into different arrays for display + etc
function listGames(){
  filteredList = [];
  document.getElementById("selectedGames").innerHTML = "<p id='numberOfGames'> </p>";
  filter(bgList);
  segmentadinha = [];
  segmentadinha = createPages(filteredList);
  console.log(segmentadinha);
  var segmento = segmentadinha[pageNum];

  if (bgList == false) {
    document.getElementById("selectedGames").innerHTML += "<div id='error'> <b>Error:</b> The CSV file has not loaded yet. If the CSV file is located online, please wait a few seconds (2 or 3 seconds) and try again.</div>";
  }
  // Check if csv has already loaded
  if (filteredList.length > 0) {

    setTimeout(function() {
    for (var i=0; i<segmento.length; i++) {
      document.getElementById("selectedGames").innerHTML += "<div class='container'><img height='' alt='' src='' class='GamePicture'></img><div class='overlay'><div class='linkA'><a class='GameLink' href='' target='_blank'><img class='logos' src='logos/bgglogo-original.png' /></a></div><div class='linkA'><a class='GameVideoLink' href='' target='_blank'><img class='logos' src='logos/watchitplayed-original.jpeg' /></a></div></div></div>";
      var pictures = document.getElementsByClassName("GamePicture");
      var gameLink = document.getElementsByClassName("GameLink");
      var gameVideoLink = document.getElementsByClassName("GameVideoLink");
      for (var j=0; j<pictures.length; j++) {
        pictures[j].alt=segmento[j].Game;
        pictures[j].height= picturesHeight;
        pictures[j].src= segmento[j].Picture;
        gameLink[j].href= segmento[j].Link;

        if (segmento[j].Video) {
        gameVideoLink[j].href= segmento[j].Video;
        }
        else {
          gameVideoLink[j].style='visibility:hidden;'
        }
        if(segmento[j].Played == "No" && unplayed.checked) {
          pictures[j].style='-webkit-filter: grayscale(100%); filter: grayscale(100%);';
        }
      }
    }
      document.getElementById("numberOfGames").append("Total Number of Games selected: " + filteredList.length);

      if (filteredList.length !== segmento.length) {
      document.getElementById("numberOfGames").append("Games in this Page: " + segmento.length);
};

      if (segmentadinha[pageNum-1]) {
        pageleft.style='visibility:visible';
        console.log("Esquerda");
      }
      else {
        pageleft.style='visibility:hidden';
      };

      if (segmentadinha[pageNum+1]) {
        pageright.style='visibility:visible';
        console.log("Direita");
      }
      else {
        pageright.style='visibility:hidden';
      };
      document.getElementById("loader").style.display = "none";
    }, 1);
        document.getElementById("selectedGames").innerHTML += "<div id='loader'></div>";
  }

  else {
    document.getElementById("selectedGames").innerHTML += "<div id='error'> <b>Error:</b> There are no games that fulfill these parameters.</div>";
  };

};

// Create pages when listing more than 50 Games
function createPages(totalList){
  var totalLength = totalList.length/pageItems;
  var pageQuant = 0;


  for (var i=0; i<totalLength; i++) {
    segmentadinha.push(totalList.slice(pageQuant, pageQuant+pageItems));
    pageQuant = pageQuant+pageItems;
    console.log(pageQuant);
  }

  return segmentadinha;
}

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
   if(checkNew.checked || checkPlayed.checked){
     filteredList = filterPlayed(filteredList);
   }
   return filteredList;
}

// Filters
function filterPlayer(bgList){
  if (bgList) {
  for(var i=0; i<bgList.length; i++) {

    switch(maxPlayers.checked && minPlayers.checked == false) {
      case true:
        if (bgList[i].Players[bgList[i].Players.length-1] == selPlayer.value) {
          filteredList.push(bgList[i]);
        }
        break;
  default:
  break;
    }

    switch(minPlayers.checked && maxPlayers.checked == false) {
      case true:
        if (bgList[i].Players[0] == selPlayer.value) {
          filteredList.push(bgList[i]);
        }
        break;
        default:
        break;
    }

    switch(maxPlayers.checked && minPlayers.checked) {
      case true:
        if (bgList[i].Players[bgList[i].Players.length-1] == selPlayer.value && bgList[i].Players[0] == selPlayer.value) {
          filteredList.push(bgList[i]);
        }
        break;
      case false:
        break;
    }

    switch(maxPlayers.checked == false && minPlayers.checked == false) {
      case true:
        for (var j=0; j<bgList[i].Players.length; j++) {
            if (bgList[i].Players[j] == selPlayer.value) {
                filteredList.push(bgList[i]);
              }
    }
        break;
      case false:
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
    for (var j=0; j<=filteredList[i].Mode.length; j++) {
      console.log(filteredList[i].Mode[j]);
      if (filteredList[i].Mode[j] == selMode.value) {
          filtradinho.push(filteredList[i]);
    };
  }
}
  filteredList = filtradinho;
  return filteredList;
}

function filterPlayed(filteredList){
  var filtradinho = [];
  if (checkNew.checked) {
  for (var i=0; i<filteredList.length; i++) {
    if (filteredList[i].Played == "No") {
        filtradinho.push(filteredList[i]);
    }
  }
}
  if (checkPlayed.checked) {
    for (var i=0; i<filteredList.length; i++) {
      if (filteredList[i].Played == "Yes") {
          filtradinho.push(filteredList[i]);
      }
    }
  }
  filteredList = filtradinho;
  return filteredList;
}
