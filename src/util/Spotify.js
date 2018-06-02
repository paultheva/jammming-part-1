let accessToken;
let expiresIn;
const clientId = '7f0d6d854de14dac9994cfa4c2645056';
const redirectURI = 'http://localhost:3000/';

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
    if (urlAccessToken && urlExpiresIn) {
      accessToken = urlAccessToken[1];
      expiresIn = urlExpiresIn[1];
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }
  },

  search(term) {
    const searchUrl = `https://api.spotify.com/v1/search?type=track&q=${term.replace(' ', '%20')}`;
    return fetch(searchUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then(response => response.json())
      .then(jsonResponse => {
        if (!jsonResponse.tracks) return [];
        return jsonResponse.tracks.items.map(track => {
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          }
        })
      });
  },

  async savePlaylist(name, trackURIs) {
    if(accessToken === undefined) {
      this.getAccessToken();
    }
    if (name === undefined || trackURIs === undefined) {
      return;
    } else {
      let userId = await this.findUserId();
      let playlistID;
      fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({name: name})
      }).then(response => {return response.json()}
      ).then(playlist => {
        playlistID = playlist.id;
        this.addTracks(playlistID, trackURIs, userId);
      });
    }
  },

  addTracks(playlistID, trackURIs, userId) {
    fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistID}/tracks`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({uris: trackURIs})
    });
  },

  findUserId() {
    if(accessToken === undefined) {
      this.getAccessToken();
    }
    let userId;
    return fetch(`https://api.spotify.com/v1/me`, {headers: {
      Authorization: `Bearer ${accessToken}`
    }}
      ).then(response => {return response.json()}
      ).then(jsonResponse => {
        userId = jsonResponse.id;
        return userId;
      });
  }
};

export default Spotify;
