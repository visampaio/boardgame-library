function matchGame(name) {
  for (var i=0; i<bgList.length; i++) {
    if (name === bgList[i].Game) {
      return bgList[i];
    }
  }
}

function findGamePosition() {
  var game = matchGame("Welcome To");
  var furnitureNumber = findFurnitureNumber(game.Position[0]);
  var shelfNumber = findShelfNumber(game.Position[0], game.Position[1]);
  var columnNumber = findColumnNumber(game.Position[0], game.Position[1], game.Position[2]);
  var quantityNumber = findQuantityNumber(game.Position[0], game.Position[1], game.Position[2], game.Position[3]);

  console.log("Jogo: " + game.Game + " Total Numero: " + furnitureNumber + " Total Prateleiras: " + shelfNumber);
  console.log("Total Colunas:" + columnNumber + " Total Pilha:" + quantityNumber);
}

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
