let stateKey = 'spotify_auth_state'
let loginScreen = document.getElementById("login")
let loggedinScreen = document.getElementById("loggedin")
let profile = document.getElementById("user-profile")
let params = getHashParams()
let access_token = params.access_token
let state = params.state
let storedState = localStorage.getItem(stateKey)
let loginbutton = document.getElementById('login-button')
let releases = document.getElementById("releases")

loginbutton.addEventListener('click', () => loginButton())

/**
* Check the starting state
*
*/
if (access_token && (state == null || state !== storedState)) {
    alert('There was an error during the authentication')
} else {
    localStorage.removeItem(stateKey);
    if (access_token) {
        let header = {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        }
        fetch('https://api.spotify.com/v1/me', header)
            .then(response => response.json())
            .then(response => {
                profile.innerHTML = `Logged in as <a href="${response.external_urls.spotify}">${response.display_name}</a>`
                console.log("access token: " + access_token)

                loginScreen.style.display = "none"
                loggedinScreen.style.display = "block"

                userLoggedIn()
            })
            .catch(error => console.error('Error', error))
    } else {
        loginScreen.style.display = "block"
        loggedinScreen.style.display = "none"
    }
}

/**
* Spotify login button shows the spotify auth page and returns a token
*
*/
function loginButton(){
    let client_id = 'YOUR_ID_HERE' // Your client id
    let redirect_uri = 'http://localhost:8888' // Your redirect uri

    let state = generateRandomString(16);

    localStorage.setItem(stateKey, state);
    let scope = 'user-read-private user-read-email'

    let url = 'https://accounts.spotify.com/authorize'
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(client_id)
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri)
    url += '&state=' + encodeURIComponent(state)

    window.location = url;
}

/**
 * The user is logged in, now you can make spotify api calls
 * 
 */
function userLoggedIn() {
    let header = {
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + access_token
        }
    }
    fetch('https://api.spotify.com/v1/browse/new-releases', header)
        .then(response => response.json())
        .then(data => showNewReleases(data))
        .catch(error => console.error('Error', error))
}

/**
* An example function that loops through new releases data
*
*/
function showNewReleases(data){
    for(let a of data.albums.items){
        let div = document.createElement("div")
        div.innerHTML = a.name + "<br>" + a.artists[0].name
        releases.appendChild(div)
    }
}

/**
 * Obtains parameters from the hash of the URL
 * @return Object
 */
function getHashParams() {
    var hashParams = {}
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1)
    while (e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2])
    }
    return hashParams;
}

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
function generateRandomString(length) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
};