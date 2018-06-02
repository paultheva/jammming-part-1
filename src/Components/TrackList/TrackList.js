// import React
import React from 'react';
// import CSS
import './TrackList.css';
// import Track component
import Track from '../Track/Track';

export class TrackList extends React.Component {
	render() {
		return (
			<div className="TrackList">
  			{this.props.tracks.map(track =>
					<Track key={track.id} track={track} name={track.name} artist={track.artist} album={track.album} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval} />
  			)}
			</div>
    );
  }
}

export default TrackList;