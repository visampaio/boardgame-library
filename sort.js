const file = document.getElementById('input');
const selPlayer = document.getElementById('selectPlayer');
const selLength = document.getElementById('selectLength');
const selComplex = document.getElementById('selectComplex');
const selMode = document.getElementById('selectMode');
const checkNew = document.getElementById('checkNew');
const choose = document.getElementById('choose');
var bgList;
var filteredList = [];

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
  console.log(sort(bgList));
});

function sort(){
  return filter(bgList);
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

   var nameList = [];

   for(var i=0; i<filteredList.length; i++) {
     nameList.push(filteredList[i].Game);
   }

  return nameList;
}

function filterPlayer(bgList){

  for(var i=0; i<bgList.length-1; i++) {
    for(var j=0; j<bgList[i].Players.length; j++){
      if (bgList[i].Players[j] == selPlayer.value) {
        filteredList.push(bgList[i]);
      }
    }
  }
}

function filterLength(filteredList){
  var filtradinho = [];

  for(var i=0; i<filteredList.length; i++) {
    if (filteredList[i].Length == selLength.value) {
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
  for(var i=0; i<filteredList.length-1; i++) {
    if (filteredList[i].Mode == selMode.value) {
        filtradinho.push(filteredList[i]);
    }
  }

  filteredList = filtradinho;
  return filteredList;
}

function filterPlayed(filteredList){
  var filtradinho = [];

  for(var i=0; i<filteredList.length-1; i++) {
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
