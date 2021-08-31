import React, { useState, useEffect,useMemo } from "react";
import axios from "axios";
import PublisherItem from "./PublisherItem";
import {Table} from 'react-bootstrap'
import  './Publisher.css'
import CardPreview from '../ui/CardPreview'
import {getAll,getBySearchAndPagination} from '../../services/PublishersService'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Search from "./Search";
import { BootstrapTable,TableHeaderColumn } from "react-bootstrap-table";
import Pagination from 'react-bootstrap/Pagination'




function Publishers() {

  const [publisher, setPublishers] = useState([]);

  const [show, setShow] = useState(false);

  const [refreshKey, setRefreshKey] = useState(0);

  const [search, setSearch] = useState("");

  const [comments, setComments] = useState([]);

  const [query, setQuery] = useState();

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(3);

  const pageSizes = [3, 6, 9];
  

  const handleShow = () => setShow(true);
  const handleClose = (t) => {setShow(false)
    if(t==true){
      setRefreshKey(oldKey => oldKey +1)
    
    }
  };

  const getRequestParams = ( page, pageSize) => {
    let params = {};

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  };
  

  // useEffect(() => {

  //   const params = getRequestParams(page, pageSize);

  //   getAll('/Publishers',search).then((response) => {
  //     try {
  //       setPublishers(response.data);
  //       const { totalPages } = response.data;
  //       setCount(totalPages);
  //     } catch {
        
  //       toast.error('Sorry, something went wrong!', {
  //         position: "top-center",
  //         autoClose: 5000,
  //         hideProgressBar: true,
        
  //         });
        
  //     }
      
  //   });
  // }, [refreshKey,search]);

  useEffect(() => {

    getAll('/Publishers').then((response) => {
      try {
        setPublishers(response.data);
      } catch {
        
        toast.error('Sorry, something went wrong!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
        
          });
        
      }
      
    });
  }, [refreshKey]);

  useEffect(() => {

    const params = getRequestParams(page, pageSize);

    getBySearchAndPagination('/Publishers',search).then((response) => {
      try {
        setPublishers(response.data);
        const { totalPages } = response.data;
        setCount(totalPages);
      } catch {
        
        toast.error('Sorry, something went wrong!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
        
          });
        
      }
      
    });
  }, [refreshKey,search]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };


  return (
    <div>
        <ToastContainer />
      <CardPreview>
        <div className="header-style">
          <h1 className="titleOfTable">Publishers</h1>
          {/* <button className='btn-search'>Search</button> */}
         <p  className='btn-search'>
         <input
        type="text"
        name="name"
       
        placeholder="Search"
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
          <button type="button" onClick={() => setSearch(query)}>
          <i className="fa fa-search"></i>
      </button>
           </p> 
        </div>


        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
               <th>Country</th>
              <th><button onClick={()=>handleShow(true)} >Add</button></th>
            </tr>
          </thead>
          <PublisherItem publishers={publisher}></PublisherItem>
        </Table>
      </CardPreview>
      {/* <AddBook show={show} handleClose={handleClose}  ></AddBook> */}

      <select onChange={handlePageSizeChange} value={pageSize}>
            {pageSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
      <Pagination
            className="my-3"
            count={count}
            page={page}
            siblingCount={1}
            boundaryCount={1}
            variant="outlined"
            shape="rounded"
            onChange={handlePageChange}
          />

          


    </div>
  );
}

export default Publishers;
