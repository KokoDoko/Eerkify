# Eerkify 

Spotify API for little robots

![bmo](bmo.gif)

This is just a cleaned up version of the official Spotify example, removing everything but the bare essentials. 

Use [Implicit Grant flow](https://developer.spotify.com/documentation/general/guides/authorization-guide/), running entirely in the client browser. 

## Installing

`git clone` this repository and run `npm install`

## Add credentials
Go to the [Spotify Developers Dashboard](https://beta.developer.spotify.com/dashboard) and create your application. 

 * Register the Redirect URI: http://localhost:8888 in the Spotify dashboard.
 * Replace `redirect_uri` in `main.js` with http://localhost:8888
 * Replace `client_id` in `main.js` with your own client id from the dashboard

## Running the server
Run `node app.js`. Then, open `http://localhost:8888` in a browser. Click the login button.

## Making API calls
Once logged in, you can make [API calls](https://developer.spotify.com/documentation/web-api/reference-beta/) in the client from `main.js`:

```
let url = 'https://api.spotify.com/v1/browse/new-releases'
let header = {
    method: 'get',
    headers: {'Authorization': 'Bearer ' + access_token}
}
fetch(url, header)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error))
```