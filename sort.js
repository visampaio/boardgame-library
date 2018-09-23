const file = document.getElementById('input');
const selPlayer = document.getElementById('selectPlayer');
const selLength = document.getElementById('selectLength');
const selComplex = document.getElementById('selectComplex');
const selMode = document.getElementById('selectMode');
const checkNew = document.getElementById('checkNew');
const maxPlayers = document.getElementById('maxPlayers');
const choose = document.getElementById('choose');
const list = document.getElementById('list');
var bgList;
var filteredList = [];
var selected = [];
var template = document.getElementById("selectedGames").innerHTML;

file.addEventListener("change", function() {
  Papa.parse(file.files[0], {
    header: true,
    complete: function(results) {
      bgList = results.data;
      splitPlayers(bgList);
  	}
  });
});

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

});

list.addEventListener("click", function() {
  filteredList = [];
  console.log(filter(bgList));
});

function sort(){
  filteredList = filter(bgList);
  selected = filteredList[Math.floor(Math.random() * filteredList.length)];
  return selected;
}

function filter(bgList){
   filterPlayer(bgList);
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

function filterPlayer(bgList){

  for(var i=0; i<bgList.length-1; i++) {
    for(var j=0; j<bgList[i].Players.length; j++){
      switch(maxPlayers.checked) {
        case true:
          if (bgList[i].Players[bgList[i].Players.length-1] == selPlayer.value) {
            filteredList.push(bgList[i]);
          }
          break;
        case false:
          if (bgList[i].Players[j] == selPlayer.value) {
            filteredList.push(bgList[i]);
          }
          break;
      }
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

function splitPlayers(games){
  for(var i=0; i<games.length-1; i++) {
    games[i].Players = games[i].Players.split(",");
  };
}
