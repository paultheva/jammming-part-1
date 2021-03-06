// import React
import React from 'react';
// import CSS
import './App.css';
// import Components and Utilities
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: [],
      term: ''
    }
    this.addTrack = this.addTrack.bind(this);
		this.removeTrack = this.removeTrack.bind(this);
		this.updatePlaylistName = this.updatePlaylistName.bind(this);
		this.savePlaylist = this.savePlaylist.bind(this);
		this.search = this.search.bind(this);
  }

  // method to add tracks
  addTrack(track) {
		const addingTrack = (track) => this.setState({playlistTracks: [...this.state.playlistTracks, track]});
		addingTrack(track);
		this.removeTrack(track, false);
	}

  // method to remove tracks
	removeTrack(track, removePlaylist) {
		if(removePlaylist) {
			const ids = this.collectIds(true);
			let trackIndex = -1;
			for(let i = 0; i < ids.length; i++) {
				if (ids[i] === track.id) {
					trackIndex = i;
				}
			}
			if (trackIndex !== -1) {
				const newPlaylist = this.state.playlistTracks;
				newPlaylist.splice(trackIndex, 1);
				this.setState({playlistTracks: newPlaylist});
				this.search(this.state.term);
			}
		} else {
			const ids = this.collectIds(false);
			let trackIndex = -1;
			for(let i = 0; i < ids.length; i++) {
				if (ids[i] === track.id) {
					trackIndex = i;
				}
			}
			if (trackIndex !== -1) {
				const newResults = this.state.searchResults;
				newResults.splice(trackIndex, 1);
				this.setState({searchResults: newResults});
			}
		}
	}

  // method for collecting IDs
	collectIds(removePlaylist) {
		let ids = [];
		if(removePlaylist) {
			this.state.playlistTracks.map(track => ids.push(track.id));
		} else {
			this.state.searchResults.map(track => ids.push(track.id));
		}
		return ids;
	}

  // method to update the Playlist Name
  updatePlaylistName(name) {
		this.setState({playlistName: name});
	}

  // method to save the Playlist to your Spotify Account
  savePlaylist() {
		let trackURIs = [];
		for(let i = 0; i < this.state.playlistTracks.length; i++) {
			trackURIs.push(this.state.playlistTracks[i].uri);
		}
		Spotify.savePlaylist(this.state.playlistName, trackURIs);
		this.setState({playlistName: 'New Playlist', playlistTracks: []});
	}

  // async method to Search in Spotify's database (using the user's 'term')
	async search(term) {
		const results = await Spotify.search(term);
		this.setState({searchResults: results});
		const resultIds = this.collectIds(false);
		const playlistIds = this.collectIds(true);
		let indexes = [];
		for(let i = 0; i < resultIds.length; i++) {
			for(let j = 0; j < playlistIds.length; j++) {
				if (resultIds[i] === playlistIds[j]) {
					indexes.push(i);
				}
			}
		}
		if(indexes.length > 0) {
			for (let k = 0; k < indexes.length; k++) {
				results.splice(indexes[k], 1);
			}
		}
		this.setState({searchResults: results});
		this.setState({term: term});
	}

	render() {
		return (
			<div id="app">
  				<h1>Ja<span className="highlight">mmm</span>ing</h1>
  				<div className="App">
    				<SearchBar onSearch={this.search} />
    				<div className="App-playlist">
      					<SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} onRemove={this.removeTrack} />
      					<Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName}	onSave={this.savePlaylist}	/>
    				</div>
  				</div>
			</div>
		);
	}
}

export default App;
