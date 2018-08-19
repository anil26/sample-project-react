import React from "react";
import "./styles.css";

class Pagination extends React.Component {
  state = {
    list: [],
    paginationSize: 10,
    pageNo: 1
  };
  componentDidMount() {
    const { defaultPageNo, paginationSize } = this.props;
    this.setState({
      pageNo: defaultPageNo,
      paginationSize
    });
  }
  onNext = () => {
    const { pageNo } = this.state;
    const { listLength, paginationSize, callBackPagination } = this.props;
    if (!(pageNo === parseInt(listLength / paginationSize, 10))) {
      this.setState(
        {
          pageNo: pageNo + 1
        },
        () => {
          callBackPagination(pageNo + 1);
        }
      );
    }
  };
  onPrevious = () => {
    const { pageNo } = this.state;
    const { callBackPagination } = this.props;
    if (pageNo !== 1) {
      this.setState(
        {
          pageNo: pageNo - 1
        },
        () => {
          callBackPagination(pageNo - 1);
        }
      );
    }
  };

  onFastForward = () => {
    const { listLength, paginationSize, callBackPagination } = this.props;
    this.setState(
      {
        pageNo: parseInt(listLength / paginationSize, 10)
      },
      () => {
        callBackPagination(parseInt(listLength / paginationSize, 10));
      }
    );
  };
  onFastBackward = () => {
    const { callBackPagination } = this.props;
    this.setState(
      {
        pageNo: 1
      },
      () => {
        callBackPagination(1);
      }
    );
  };
  render() {
    const { pageNo } = this.state;
    return (
      <div className="pagination">
        <span onClick={this.onFastBackward}>&lt;&lt; &nbsp;</span>
        <span onClick={this.onPrevious}>&lt;&nbsp;&nbsp;</span>
        <span className="page-no">{pageNo}</span>
        <span onClick={this.onNext}>&nbsp; &nbsp;&gt;</span>
        <span onClick={this.onFastForward}>&nbsp; &gt;&gt;</span>
      </div>
    );
  }
}

export default Pagination;
