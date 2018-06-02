// import React
import React from 'react';
// import CSS
import './Track.css';

export class Track extends React.Component {
  constructor(props) {
		super(props);
		this.addTrack = this.addTrack.bind(this);
		this.removeTrack = this.removeTrack.bind(this);
		this.renderAction = this.renderAction.bind(this);
	}

  // method to add a track
  addTrack() {
		this.props.onAdd(this.props.track);
	}

  // method to Remove a track
  removeTrack() {
		this.props.onRemove(this.props.track, true);
	}

  // method to render the proper HTML depending on whether it can be removed or added
  renderAction() {
		if(this.props.isRemoval) {
			return <a className='Track-action' onClick={this.removeTrack}>-</a>;
		} else {
			return <a className='Track-action' onClick={this.addTrack}>+</a>;
		}
	}

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.name}</h3>
          <p>{this.props.artist} | {this.props.album}</p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}

export default Track;
