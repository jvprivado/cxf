var aClient = "";

function loginGo(){

console.log(  document.getElementsByClassName("auth0-lock-header").length);

document.getElementById("1-submit").click();


}


function loginNow(){

var intv = setInterval(function(){
  if(document.getElementsByClassName("auth0-lock-header").length==1){
  document.getElementById("1-submit").setAttribute("style","width:0px;height:0px;");
  document.getElementsByClassName("auth0-lock-alternative")[0].remove();  
  document.getElementsByClassName("auth0-lock-header")[0].remove();  
  document.getElementById("fff").setAttribute("style","display:block;");
  clearInterval(intv);  
  }
  
  
},2000);

var wm = new WeakMap();
var privateStore = {};
var lock;

lock = new Auth0Lock(
  'NReLRFqp11SxQjBkwgjqt8lszUcpusVd',
'dev-rysgkhvq2lgtw0up.us.auth0.com',

{   allowSignUp: false,"container":"fff","auth":{"redirectUrl":'http://localhost:3000/Dashboard', "redirect":true}}


);
wm.set(privateStore, {
appName: "example"
});


lock.show();


// return wm.get(privateStore).profile;


lock.on("authenticated", function(authResult) {
// Use the token in authResult to getUserInfo() and save it if necessary
lock.getUserInfo(authResult.accessToken, function(error, profile) {
  if (error) {
    // Handle error
    return;
  }

  //we recommend not storing Access Tokens unless absolutely necessary
  wm.set(privateStore, {
    accessToken: authResult.accessToken
  });

  wm.set(privateStore, {
    profile: profile
  });


});


}());


}


loginNow();

function register(email,password){
// Script uses auth0.js. See Remarks for details.

// Initialize client
var webAuth = new auth0.WebAuth({
domain:       'dev-rysgkhvq2lgtw0up.us.auth0.com',
clientID:     'NReLRFqp11SxQjBkwgjqt8lszUcpusVd'
});

webAuth.signup({ 
connection: 'Username-Password-Authentication', 
email: email, 
password: password,
username: "johndoe",
given_name: "John",
family_name: "Doe",
name: "John Doe",
nickname: "johnny",
picture: "http://example.org/jdoe.png",
user_metadata: { plan: 'silver', team_id: 'a111' }
}, function (err) { 
if (err) return 'Something went wrong: ' + err.message; 
  return 'success signup without login!' 
});


}


function go(){

auth0.createAuth0Client({
domain: "dev-rysgkhvq2lgtw0up.us.auth0.com",
clientId: "NReLRFqp11SxQjBkwgjqt8lszUcpusVd",
clientSecret: "Q_r2p9XLeRrk3eUjbQBVMMwYOcBuO6zEZaSqeeoazfM9Vilb7fp-B8RoAIZWpsyB",
authorizationParams: {
redirect_uri: window.location.origin
}
}).then(async (auth0Client) => {

aClient = auth0Client;

if (location.search.includes("state=") && 
(location.search.includes("code=") || 
location.search.includes("error="))) {


await auth0Client.handleRedirectCallback();
window.history.replaceState({}, document.title, "/");

//auth0Client.logout();

setTimeout(async function(){

const isAuthenticated = await auth0Client.isAuthenticated();
const userProfile = await auth0Client.getUser();

if (isAuthenticated) {
console.log(userProfile.name);
} else {
console.log("NONE");
}

},3000);



//
}





});


}


go();