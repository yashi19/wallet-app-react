import React, {Component} from 'react';

class Search extends Component {

  handleChange = (event) => {
    this.props.onSearch(event.target.value);
  };

  render() {
    return (
        <div>
          <input type={"text"} id={"filterRemarks"}
                 value={this.props.filterText}
                 onChange={this.handleChange}/>
        </div>
    );
  }
}

export default Search;