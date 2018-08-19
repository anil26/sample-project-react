import React from "react";
import Pagination from "../Pagination/index";
import "./styles.css";
import EditModal from "../EditModal/index";

class List extends React.Component {
  state = {
    error: true,
    paginationSize: 10,
    pageNo: 1,
    selectedIndexes: {}
  };

  getListitems = () => {
    const { setCampignList } = this.props;
    return fetch("https://demo7556614.mockable.io/get-list-items")
      .then(result => {
        return result.json();
      })
      .then(response => {
        setCampignList(response);
      })
      .catch(() => {
        this.setState({
          error: true
        });
      });
  };
  componentDidMount() {
    this.getListitems();
  }
  callBackPagination = pageNo => {
    this.setState({
      pageNo
    });
  };
  onClickEdit = index => {
    this.editModal.onOpen(index);
  };
  updateName = (index, name) => {
    const { filteredList, setFilteredList } = this.props;
    const copyList = [...filteredList];
    copyList[index].name = name;
    setFilteredList(copyList);
  };
  onDelete = index => {
    const { filteredList, setFilteredList } = this.props;
    const copyList = [...filteredList];
    copyList.splice(index, 1);
    setFilteredList(copyList);
  };
  onChangeCheckBox = (event, id) => {
    const { selectedIndexes } = this.state;
    const copySelectedIndexes = { ...selectedIndexes };
    if (event.target.checked) {
      let isAvailableAlready = selectedIndexes[id];
      if (!isAvailableAlready) {
        copySelectedIndexes[id] = true;
      }
    }
    if (!event.target.checked) {
      let isAvailableAlready = selectedIndexes[id];
      if (isAvailableAlready) {
        copySelectedIndexes[id] = false;
      }
    }
    this.setState({
      selectedIndexes: copySelectedIndexes
    });
  };

  onDeleteMultiple = () => {
    const { selectedIndexes } = this.state;
    const { filteredList, setFilteredList } = this.props;
    const copyList = [...filteredList];
    const copyListFiltered = copyList.map(element => {
      if (selectedIndexes[element.id]) {
        return null;
      }
      return element;
    });
    this.setState({
      // list: copyListFiltered,
      selectedIndexes: []
    });
    setFilteredList(copyListFiltered);
  };
  render() {
    const { filteredList } = this.props;
    const list = filteredList;
    const { paginationSize, pageNo } = this.state;
    const lSlice = (pageNo - 1) * paginationSize;
    const rSlice = (pageNo - 1) * paginationSize + paginationSize;
    return (
      <div>
        <table className="campaign-list">
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>Campaign Name</th>
              <th>Type</th>
              <th>Last Saved</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.length > 0 &&
              list.slice(lSlice, rSlice).map((element, index) => {
                if (!element) return null;
                const { name, type, lastSaved, id, checked } = element;
                return (
                  <tr key={id}>
                    <td>
                      <input
                        type="checkbox"
                        onChange={e => this.onChangeCheckBox(e, id)}
                        value={checked ? true : false}
                      />
                    </td>
                    <td className="name-section">{name}</td>
                    <td>{type}</td>
                    <td>{new Date(lastSaved).toGMTString()}</td>
                    <td className="edit-btn-section">
                      <button
                        className="edit-btn"
                        onClick={() => this.onClickEdit(index)}
                      >
                        Edit
                      </button>{" "}
                      <span
                        className="delete"
                        onClick={() => {
                          this.onDelete(index);
                        }}
                      >
                        X
                      </span>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className="delete-multiple">
          <button onClick={this.onDeleteMultiple}> Delete Multiple</button>
        </div>
        <Pagination
          paginationSize={paginationSize}
          slicedList={[]}
          defaultPageNo={1}
          listLength={list.length}
          callBackPagination={this.callBackPagination}
        />
        <EditModal
          ref={el => (this.editModal = el)}
          list={list}
          updateName={this.updateName}
        />
      </div>
    );
  }
}

export default List;
