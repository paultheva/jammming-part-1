// import React
import React from 'react';
// import CSS
import './Playlist.css';
// import TrackList Component
import TrackList from '../TrackList/TrackList';

export class Playlist extends React.Component {
  constructor(props) {
		super(props);
		this.handleNameChange = this.handleNameChange.bind(this);
	}

  // method to allow User to change the name of the Playlist
  handleNameChange(event) {
		this.props.onNameChange(event.target.value);
	}

  render() {
    return (
      <div className="Playlist">
        <input defaultValue={'New Playlist'} onChange={this.handleNameChange} title="Modify to change the playlist name" />
        <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true} />
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;
