import React, { useState, useEffect } from "react";
import BookItem from "./BookItem";
import { Table } from "react-bootstrap";
import "./Books.css";
import CardPreview from "../ui/CardPreview";
import { getBooksByFilters } from "../../services/BooksService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddBook from "./AddBook";
import ReactPaginate from 'react-paginate';
import "../PaginationCSS/Pagination.css";

function Books() {
  const [books, setBooks] = useState([]);
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState();
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [numberOfPages, setNumberOfPages] = useState();

  useEffect(() => {
    getBooks();
  }, [search]);

  const getBooks=(e)=>{
    var params = null;
    if (e == null) {
      params = getRequestParams(search, page, pageSize);
    } else {
      params = e;
    }
    getBooksByFilters(params).then(
      (response) => {
        try {
          setBooks(response.data.data);
          const totalPages= response.data.totalCount;
          setCount(totalPages);
          setNumberOfPages(Math.ceil(totalPages/pageSize));
        } catch {
          toast.error("Sorry, something went wrong!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
          });
        }
      }
    );
  }

  const getRequestParams = (search, page, pageSize) => {
    let params = {};
  console.log(page)
    if (search) {
      params["title"] = search;
      setPage(1)
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
    getBooks(params);
};

  const onCloseAddBookModal = (t) => {
    setShowAddBookModal(false);
    if (t == true) {
      getBooks();
    }
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const refreshTable=()=>{
    getBooks();
  }

  return (
    <div>
      <ToastContainer />
      <CardPreview>
        <div className="header-style">
          <a href="/Books">
            <h1 className="titleOfTable">Books</h1>
          </a>
          <div className="inputContainerSearch">
            <i className="fa fa-search icon-search"> </i>
            <input
              className="field-input-search"
              type="text"
              placeholder="Search"
              name="title"
              value={query}
              onChange={handleSearch}
            />
          </div>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Pages</th>
              <th>Price</th>
              <th className="btn-end">
                <button className="btn-add" onClick={() => setShowAddBookModal(true)}> <i className="fa fa-plus icon-add">Add New</i></button>
              </th>
            </tr>
          </thead>
          <BookItem books={books} onChange={refreshTable}></BookItem>
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
          forcePage={page-1}
        />
      </CardPreview>
     {showAddBookModal && <AddBook  onClose={onCloseAddBookModal}/>}
    </div>
  );
}
export default Books;
