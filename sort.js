const file = document.getElementById('input');
const selPlayer = document.getElementById('selectPlayer');
const choose = document.getElementById('choose');
var bgList;

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
  console.log(filter(bgList));
});

function filter(bgList){
  return filterPlayer(bgList);
}

function filterPlayer(bgList){
  var filteredList = [];

  for(var i=0; i<bgList.length-1; i++) {
    for(var j=0; j< bgList[i].Players.length; j++) {
      if (bgList[i].Players[j] == selPlayer.value) {
        filteredList.push(bgList[i].Game);
      }
    }
  }
  return filteredList;
}

function splitPlayers(games){
  for(var i=0; i<games.length-1; i++) {
    games[i].Players = games[i].Players.split(",");
  };
}
