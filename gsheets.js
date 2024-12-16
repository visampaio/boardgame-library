function start() {
  // Initializes the Google Sheets API library.
  gapi.client.init({
    'apiKey': 'AIzaSyDaGUPSr4asMfHt_Qlie01vzbpl8B35nBo',
    'discoveryDocs': ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
    'clientId': '37348095959-i0nd20ns5vklh6q2drb7mf2am83vqou4.apps.googleusercontent.com',
    'scope': 'https://www.googleapis.com/auth/spreadsheets.readonly',
  }).then(function() {
    parseSheet();
  });
};

function parseSheet() {
  // Reads values on the spreadsheet, starting from row 2.
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: "1ZLdvkWefFzPAZtWy8s6GG2HN17eRvJdH-LvL3Uqbeoc",
    range: "A2:K"
  }).then((response) => {
    let completeList = response.result.values;
    let list = [];
    for (let i=0; i < completeList.length; i++) {
      let game = new Game(completeList[i]);
      list.push(game);
    }
    bgList = list;
  });
}

function Game(game) {
  this.Game = game[0];
  this.Players = splitArray(game[1], ", ");
  this.Time = game[2];
  this.Complexity = game[3];
  this.Played = game[4];
  this.Mode = splitArray(game[5], ", ");
  this.Picture = game[6];
  this.Link = game[7];
  this.Video = game[8];
  this.Position = game[10];
}

function splitArray(array, comma) {
  if (array) {
    return (array.length > 1) ? array.split(comma) : array;
  } else {return "";}
}

// Loads the Google Sheets API library.
gapi.load('client', start);
