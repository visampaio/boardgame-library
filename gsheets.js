const CLIENT_ID = '37348095959-i0nd20ns5vklh6q2drb7mf2am83vqou4.apps.googleusercontent.com';
const API_KEY = 'AIzaSyDaGUPSr4asMfHt_Qlie01vzbpl8B35nBo';

// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4';

// Authorization scopes required by the API; multiple scopes can be included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly';

let tokenClient;
let gapiInited = false;
let gisInited = false;
let retries = 3;

function gapiLoaded() {
  gapi.load('client', initializeGapiClient);
}

async function initializeGapiClient() {
   await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: [DISCOVERY_DOC],
  });
  gapiInited = true;
  parseSheet();
}

function gisLoaded() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: '', // defined later
  });
  gisInited = true;
}

async function parseSheet() {
  try {
    // Reads values on the spreadsheet, starting from row 2.
    const response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: "1ZLdvkWefFzPAZtWy8s6GG2HN17eRvJdH-LvL3Uqbeoc",
      range: "A2:N600",
    });

  let completeList = response.result.values;
    bgList = completeList.map(row => new Game(row));
    displayAtStart();
  } catch (error) {
    if (retries > 0) {
      console.log(`Encountered ${error.status}. Retrying in 2s...`);
      setTimeout(() => parseSheet(), 2000);
      retries--;
    }
    else {
      console.log("Failed to get sheet data.")
    }
  }
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
  this.Replay = game[13];
}

function splitArray(array, comma) {
  if (array) {
    return (array.length > 1) ? array.split(comma) : array;
  } else {return "";}
}