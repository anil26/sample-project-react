import React from "react";
import debounce from "lodash/debounce";
import "./styles.css";

class Search extends React.Component {
  onSearch = event => {
    const { list, setFilteredList } = this.props;
    const filteredList = list.reduce((acc, campaign) => {
      if (campaign.name.includes(event.target.value)) {
        acc.push(campaign);
      }
      return acc;
    }, []);
    setFilteredList(filteredList);
  };
  debouncedSearch = debounce(event => {
    this.onSearch(event);
  }, 500);
  render() {
    return (
      <div className="search-container">
        <input
          className="input-search"
          onChange={event => {
            event.persist();
            this.debouncedSearch(event);
          }}
        />
        <button className="search-btn">Search</button>
      </div>
    );
  }
}

export default Search;
