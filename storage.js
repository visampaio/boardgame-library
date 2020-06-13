const gameLocation = document.getElementById("gamesLocation");
const gamesLocationText = document.getElementById("gamesLocationText");
const screenOverlay = document.getElementById("screenOverlay");
function matchGame(name) {
  for (var i=0; i<bgList.length; i++) {
    if (name === bgList[i].Game) {
      return bgList[i];
    }
  }
}

function findGamePosition(name) {
  gameLocation.style.display = "flex";
  screenOverlay.style.display = "inline";
  gamesLocationText.style.display = "inline";
  gameLocation.innerHTML = "";
  var game = matchGame(name);
  gamesLocationText.innerHTML = "<span style='font-size:1.5vw'> " + game.Game +"</b> is located at" + "</span>" + "<br> " + game.Position[0] + ", Number " + game.Position[1] + ", shelf number " + game.Position[2] + ", column number " + game.Position[3] + ", position " + game.Position[4] + ".";
  var furnitureNumber = findFurnitureNumber(game.Position[0]);
  var shelfNumber = findShelfNumber(game.Position[0], game.Position[1]);
  var columnNumber = findColumnNumber(game.Position[0], game.Position[1], game.Position[2]);
  var quantityNumber = findQuantityNumber(game.Position[0], game.Position[1], game.Position[2], game.Position[3]);

  console.log("Jogo: " + game.Game + " Total Numero: " + furnitureNumber + " Total Prateleiras: " + shelfNumber);
  console.log("Total Colunas:" + columnNumber + " Total Pilha:" + quantityNumber);

  //Draw game location
  for (var i=0; i < furnitureNumber; i++) {
    var furniture = document.createElement("div");
    furniture.setAttribute("class", game.Position[0]);
    var numFurniture = i+1;
    furniture.setAttribute("id", numFurniture.toString());
    gameLocation.appendChild(furniture);
    console.log("Id: " + furniture.id);
    console.log("Game Position:" + game.Position[1]);

    if (furniture.id === game.Position[1]) {
      var selectedFurniture = document.getElementById(furniture.id);
      for (var j=0; j <= shelfNumber; j++) {
        var shelf = document.createElement("DIV");
        shelf.setAttribute("class", "prateleira");
        if (shelfNumber == 0) {shelf.setAttribute("class", "roof");}
        var numShelf = j;
        shelf.setAttribute("id", "s" + numShelf.toString());
        selectedFurniture.appendChild(shelf);

        if (shelf.id === "s" + game.Position[2]) {
          var selectedShelf = document.getElementById(shelf.id);
//        selectedShelf.style.background = "yellow";
          for (var k=0; k < columnNumber; k++) {
            var column = document.createElement("DIV");
            column.setAttribute("class", "column");
            var numColumn = k+1;
            column.setAttribute("id", "c" + numColumn.toString());
            selectedShelf.appendChild(column);

            if (column.id === "c" + game.Position[3]) {
              var selectedColumn = document.getElementById(column.id);
//            selectedColumn.style.background = "green";
              for (var l=0; l < quantityNumber; l++) {
                var box = document.createElement("DIV");
                box.setAttribute("class", "box");
                var numBox = l+1;
                box.setAttribute("id", "b" + numBox.toString());
                selectedColumn.appendChild(box);

                if (box.id === "b" + game.Position[4]) {
//                box.innerHTML += game.Game;
                  box.style.background = "blue";
                }
              }
            }
          }
        }
      }
    }
  }
}

screenOverlay.addEventListener("click", function(){
  screenOverlay.style.display = "none";
  gameLocation.style.display = "none";
  gamesLocationText.style.display = "none";
});

function findFurnitureNumber(furniture) {
  var moveisCounter = 0;

  for (var i=0; i<bgList.length; i++) {
    if (bgList[i].Position[0] === furniture) {
      if (bgList[i].Position[1] > moveisCounter) {
        moveisCounter = bgList[i].Position[1];
      }
    }
  }
  return moveisCounter;
}

function findShelfNumber(furniture, number) {
  var moveisCounter = 0;

  for (var i=0; i<bgList.length; i++) {
    if (bgList[i].Position[0] === furniture && bgList[i].Position[1] === number) {
      if (bgList[i].Position[2] > moveisCounter) {
        moveisCounter = bgList[i].Position[2];
      }
    }
  }

  return moveisCounter;
}

function findColumnNumber(furniture, number, shelf) {
  var moveisCounter = 0;

  for (var i=0; i<bgList.length; i++) {
    if (bgList[i].Position[0] === furniture && bgList[i].Position[1] === number && bgList[i].Position[2] === shelf) {
      if (bgList[i].Position[3] > moveisCounter) {
        moveisCounter = bgList[i].Position[3];
      }
    }
  }

  return moveisCounter;
}

function findQuantityNumber(furniture, number, shelf, column) {
  var moveisCounter = 0;

  for (var i=0; i<bgList.length; i++) {
    if (bgList[i].Position[0] === furniture && bgList[i].Position[1] === number && bgList[i].Position[2] === shelf && bgList[i].Position[3] === column) {
      if (bgList[i].Position[4] > moveisCounter) {
        moveisCounter = bgList[i].Position[4];
      }
    }
  }

  return moveisCounter;
}
