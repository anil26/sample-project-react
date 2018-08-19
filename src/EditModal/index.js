import React from "react";
import "./styles.css";

class EditModal extends React.Component {
  state = {
    isVisible: false,
    activeIndex: 0,
    valueinput: ""
  };
  onClose = () => {
    this.setState({
      isVisible: false
    });
  };
  onOpen = index => {
    this.setState({
      isVisible: true,
      activeIndex: index
    });
  };
  onSave = () => {
    const { updateName } = this.props;
    const { activeIndex } = this.state;
    updateName(activeIndex, this.nameEdit.value);
    this.onClose();
  };
  render() {
    const { isVisible, activeIndex } = this.state;
    const { list } = this.props;
    return (
      <div
        className="modal-container"
        style={{ display: isVisible ? "block" : "none" }}
      >
        <div className="modal-content">
          <span className="close" onClick={this.onClose}>
            X
          </span>
          <div className="edit-modal">
            <h3>Edit</h3>
            <label htmlFor="name-edit">Campaign Name</label>
            <input
              type="text"
              id="name-edit"
              ref={el => {
                this.nameEdit = el;
              }}
            />
            <button onClick={this.onSave}>Save</button>
          </div>
        </div>
      </div>
    );
  }
}

export default EditModal;
