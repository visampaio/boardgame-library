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
var highlightedFurniture = [];
var highlightedPrateleira = [];
var highlightedColuna = [];

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
    filterFurnitureType(i);
    movelIndex++;
  }
}


function filterFurnitureType() {
  for (var i=0; i<bgList.length-1; i++) {
    if (moveis.filter(movel => (movel.name == bgList[i].Position[0])).length > 0) {
      moveis[moveis.findIndex(movel => movel.name == bgList[i].Position[0])].array.push(bgList[i]);
    }
    else {
      var movelTipo = {name: bgList[i].Position[0], array: []};
      moveis.push(movelTipo);
      moveis[moveis.findIndex(movel => movel.name == bgList[i].Position[0])].array.push(bgList[i]);
    }
  }
}

function filterFurniture() {
  for (var i=0; i<moveis.length; i++) {
    highlightedFurniture = moveis[i].array;
    // console.log("Iteracao numeross" + i + ": " + JSON.stringify(highlightedFurniture));
    var originalSize = 0;
    var indexJ = highlightedFurniture.length;
    for (var j=indexJ-1; j>=0; j--) {
      // console.log("Iteracao numero" + i + ": " + JSON.stringify(highlightedFurniture));
      if (highlightedFurniture.filter(movel => (movel.name == highlightedFurniture[j].Position[1])).length > 0) {
        highlightedFurniture[highlightedFurniture.findIndex(movel => movel.name == highlightedFurniture[j].Position[1])].array.push(highlightedFurniture[j]);
        // highlightedFurniture.splice(j,1);
      }
      else {
        var prateleiraTipo = {name: highlightedFurniture[j].Position[1], array: []};
        highlightedFurniture.push(prateleiraTipo);
        highlightedFurniture[highlightedFurniture.findIndex(movel => movel.name == highlightedFurniture[j].Position[1])].array.push(highlightedFurniture[j]);
        // highlightedFurniture.splice(j,1);
      }
    }
    highlightedFurniture.splice(0,indexJ);
  }
}

function filterPrateleira() {
  for (var i=0; i<highlightedFurniture.length; i++) {
    highlightedPrateleira = highlightedFurniture[i].array;
    var originalSize = 0;
    for (var j=highlightedPrateleira.length-1; j>=0; j--) {
      if (highlightedPrateleira.filter(movel => (movel.name == highlightedPrateleira[j].Position[2])).length > 0) {
        highlightedPrateleira[highlightedPrateleira.findIndex(movel => movel.name == highlightedPrateleira[j].Position[1])].array.push(highlightedPrateleira[j]);
        highlightedPrateleira.splice(j,1);
      }
      else {
        var prateleiraTipo = {name: highlightedPrateleira[j].Position[2], array: []};
        highlightedPrateleira.push(prateleiraTipo);
        highlightedPrateleira[highlightedPrateleira.findIndex(movel => movel.name == highlightedPrateleira[j].Position[2])].array.push(highlightedPrateleira[j]);
        highlightedPrateleira.splice(j,1);
      }
    }

  }
}

function filterColuna() {
  for (var i=0; i<moveis.length; i++) {
    var highlightedFurniture = moveis[i].array;
    console.log(highlightedFurniture);
    var originalSize = 0;
    for (var j=highlightedFurniture.length-1; j>=0; j--) {
      if (highlightedFurniture.filter(movel => (movel.name == highlightedFurniture[j].Position[1])).length > 0) {
        highlightedFurniture[highlightedFurniture.findIndex(movel => movel.name == highlightedFurniture[j].Position[1])].array.push(highlightedFurniture[j]);
        highlightedFurniture.splice(j,1);
      }
      else {
        var prateleiraTipo = {name: highlightedFurniture[j].Position[1], array: []};
        highlightedFurniture.push(prateleiraTipo);
        highlightedFurniture[highlightedFurniture.findIndex(movel => movel.name == highlightedFurniture[j].Position[1])].array.push(highlightedFurniture[j]);
        highlightedFurniture.splice(j,1);
      }
    }

  }
}


function movelCondition(movel, i) {
  return movel.name == bgList[i].Position[0];
}
