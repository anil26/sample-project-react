import React from "react";
import ReactDOM from "react-dom";
import List from "./List/index";
import Search from "./Search/index";

import "./styles.css";

class App extends React.Component {
  state = {
    list: [],
    filteredList: []
  };
  setCampignList = list => {
    this.setState({
      list: list,
      filteredList: list
    });
  };

  setFilteredList = filteredList => {
    this.setState({
      filteredList
    });
  };
  render() {
    const { list, filteredList } = this.state;
    return (
      <div className="App">
        <h1>Campaign Listing Page</h1>
        <Search
          list={list}
          filteredList={filteredList}
          setFilteredList={this.setFilteredList}
        />
        <List
          setCampignList={this.setCampignList}
          filteredList={filteredList}
          setFilteredList={this.setFilteredList}
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
