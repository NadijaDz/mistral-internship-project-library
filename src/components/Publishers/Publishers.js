import React, { useState, useEffect, useRef } from "react";
import PublisherItem from "./PublisherItem";
import { Table } from "react-bootstrap";
import "./Publisher.css";
import CardPreview from "../ui/CardPreview";
import { getPublishersByFilters } from "../../services/PublishersService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddPublisher from "./AddPublisher";
import ReactPaginate from 'react-paginate';
import "../PaginationCSS/Pagination.css";


function Publishers() {
  const [publisher, setPublishers] = useState([]);
  const [showAddPublisherModal, setShowAddPublisherModal] = useState(false);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState();
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(3);
  const [numberOfPages, setNumberOfPages] = useState();


  useEffect(() => {
    getPublishers();
  }, [search]);

  const getPublishers = (e) => {

    var params = null;
    if (e == null) {
      params = getRequestParams(search, page, pageSize);
    } else {
      params = e;
    }

    getPublishersByFilters(params).then((response) => {
      try {
        setPublishers(response.data.data);
        const totalPages= response.data.totalCount;
        setCount(totalPages);
        setNumberOfPages(Math.round(totalPages/pageSize));

      } catch {
        toast.error("Sorry, something went wrong!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
        });
      }
    });
  };



  const getRequestParams = (search, page, pageSize) => {
    let params = {};

    if (search) {
      params["name"] = search;
    }

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["pageSize"] = pageSize;
    }

    var p = 0;
    if (page > 0) {
      p = page - 1;
    }
    params["skip"] = p * pageSize;

    return params;
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  const refreshTable = () => {
    getPublishers();
  };


  const onCloseAddPublisherModal = (t) => {
    setShowAddPublisherModal(false);
    if (t == true) {
      getPublishers();
    }
  };


  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    if(e.selected>page){
      setPage(selectedPage + 1)
    }
    else{
      setPage(selectedPage)
    }
    const params = getRequestParams(search,selectedPage + 1, pageSize);
    getPublishers(params);
};

  return (
    <div>
      <ToastContainer />
      <CardPreview>
        <div className="header-style">
          <a href="/Publishers">
            <h1 className="titleOfTable">Publishers</h1>
          </a>

          <div className="inputContainerSearch">
            <i className="fa fa-search icon-search"> </i>
            <input
              className="field-input-search"
              type="text"
              placeholder="Search"
              name="name"
              value={query}
              onChange={handleSearch}
            />
          </div>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Country</th>
              <th className="btn-end">
                <button className="btn-add" onClick={() => setShowAddPublisherModal(true)}>
                <i className="fa fa-plus icon-add">Add New</i>
                </button>
              </th>
            </tr>
          </thead>
          <PublisherItem
            publishers={publisher}
            onChange={refreshTable}
          ></PublisherItem>
        </Table>
        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={numberOfPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </CardPreview>
      {showAddPublisherModal && (
        <AddPublisher onClose={onCloseAddPublisherModal} />
      )}
    </div>
  );
}
export default Publishers;
