//This is just for local tests purporses
var bgList = [{
  Game: "5-Minute Dungeon",
  Position: "GE,5,1,1,4"
}, {
  Game: "51st State: Master Set",
  Position: "GE,4,1,1,3"
}, {
  Game: "PENIS",
  Position: "KA,1,5,1,1"
}, {
  Game: "7 Wonders",
  Position: "GE,2,5,1,1"
}]

var movelIndex = 0;
var moveis = [];

// function Gersby(number, shelf, column, position, name) {
//   for (var i=0, i<)
// }
//
// {
//   5{
//     1{
//       1{
//         1, 2, 3, 4
//       }
//     }
//   }
// }
function sortPosition() {
  for (i=0; i<bgList[0].Position.length; i++) {
    filterFurniture(i);
    movelIndex++;
  }
}


function filterFurniture(movelIndex) {
  for (var i=0; i<bgList.length; i++) {
    if (moveis.filter(movel => (movel.name == bgList[i].Position[movelIndex])).length > 0) {
      moveis[moveis.findIndex(movel => movel.name == bgList[i].Position[movelIndex])].array.push(bgList[i]);
    }
    else {
      var movelTipo = {name: bgList[i].Position[movelIndex], array: []};
      moveis.push(movelTipo);
      moveis[moveis.findIndex(movel => movel.name == bgList[i].Position[movelIndex])].array.push(bgList[i]);
    }
  }
}

function movelCondition(movel, i) {
  return movel.name == bgList[i].Position[0];
}
