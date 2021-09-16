import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import "./Authors.css";
import CardPreview from "../ui/CardPreview";
import { getAuthorsByFilters } from "../../services/AuthorsService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddAuthor from "./AddAuthor";
import AuthorItem from "./AuthorItem";
import ReactPaginate from 'react-paginate';
import "../PaginationCSS/Pagination.css";

function Authors() {
  const [allAuthors, setAllAuthors] = useState([]);
  const [showAddAuthorModal, setShowAddAuthorModal] = useState(false);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState();
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(3);
  const [numberOfPages, setNumberOfPages] = useState();


  useEffect(() => {
    getAuthors();
  }, [search]);

  const getAuthors = (e) => {
  
    var params = null;
    if (e == null) {
      params = getRequestParams(search, page, pageSize);
    } else {
      params = e;
    }
    getAuthorsByFilters(params).then((response) => {
      try {
        setAllAuthors(response.data.data);
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

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    if(e.selected>page){
      setPage(selectedPage + 1)
    }
    else{
      setPage(selectedPage)
    }
    const params = getRequestParams(search,selectedPage + 1, pageSize);
    getAuthors(params);
};

  const onCloseAddAuthorModal = (t) => {
    setShowAddAuthorModal(false);
    if (t == true) {
      getAuthors();
    }
  };
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  const refreshTable=()=>{
    getAuthors();
  }
 
  return (
    <div>
      <ToastContainer />
      <CardPreview>
        <div className="header-style">
          <a href="/Authors">
            <h1 className="titleOfTable">Authors</h1>
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
              <th>Image</th>
              <th>Name</th>
              <th>DOB</th>
              <th>Email</th>
              <th className="btn-end">
                <button className="btn-add" onClick={()=>setShowAddAuthorModal(true)}><i className="fa fa-plus icon-add">Add New</i></button>
              </th>
            </tr>
          </thead>
          <AuthorItem authors={allAuthors} onChange={refreshTable}></AuthorItem>
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
     {showAddAuthorModal && <AddAuthor  onClose={onCloseAddAuthorModal}/>}  
    </div>
  );
}

export default Authors;
