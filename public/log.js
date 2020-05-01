var CLIENT_ID = 'YOUR_CLIENT_ID';
var API_KEY = 'YOUR_API_KEY';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/spreadsheets";

var signin = document.getElementById('signin');
var logout = document.getElementById('logout');


function handleClientLoad() {
    gapi.load('client:auth2', initClient);
  }

  /**
   *  Initializes the API client library and sets up sign-in state
   *  listeners.
   */
  function initClient() {
    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    }).then(function () {
        console.log("Working")
      // Listen for sign-in state changes.
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

      // Handle the initial sign-in state.
      updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      signin.onclick = handleAuthClick;
      logout.onclick = handleSignoutClick;
    }, function(error) {
        console.log(error)
    });
  }

  
 function updateSigninStatus(isSignedIn) {
     console.log("running")
   if (isSignedIn) {
     signin.style.display = 'none';
     logout.style.display = 'block';
   } else {
     signin.style.display = 'block';
     logout.style.display = 'none';
   }
 }

 function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
  }

  function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
  }

