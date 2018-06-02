// import React
import React from 'react';
// import CSS
import './SearchBar.css';

export class SearchBar extends React.Component {
  constructor(props) {
		super(props);
		this.state = {term: ''};
		this.search = this.search.bind(this);
		this.handleTermChange = this.handleTermChange.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

  // method to allow the user to Search Spotify's database
  search() {
		this.props.onSearch(this.state.term);
	}

  // method to update the Search input
  handleTermChange(event) {
		this.setState({term: event.target.value});
	}

  // method to allow the user to search by using the "Enter" key when focused on the search input
  handleKeyPress(event) {
		if (event.key === 'Enter') {
			this.search();
		}
	}

  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} onKeyPress={this.handleKeyPress} />
        <a onClick={this.search}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;