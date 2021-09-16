import React, {useEffect, useState} from 'react'
import "./Home.css"
import { countBooksPublishersAuthors } from "../../services/BooksService";
import { toast } from "react-toastify";


function Home() {
  const [countBooks, setCountBooks]=useState();
  const [countAuthors, setCountAuthors]=useState();
  const [countPublishers, setCountPublishers]=useState();

  useEffect(() => {
    getCount();
  }, []);

  const getCount=()=>{
    countBooksPublishersAuthors().then(
      (response) => {
        try {
          setCountBooks(response.data.countBooks);
          setCountAuthors(response.data.countAuthors);
          setCountPublishers(response.data.countPublishers);
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


    return (
      <div className="main-section">
        <div className="dashbord email-content">
          <div className="title-section">
            <p>PUBLISHERS</p>
          </div>
          <div className="icon-text-section">
            <div className="icon-section">
              <i className="fa fa-upload" aria-hidden="true"></i>
            </div>
            <div className="text-section">
              <h1>{countPublishers}</h1>
               <span> Total publishers </span> 
            </div>
            <div></div>
          </div>
          <div className="detail-section">
            <a href="/Publishers" className="view-books-a">
              <p>View List</p>
              <i className="fa fa-arrow-right" aria-hidden="true"></i>
            </a>
          </div>
        </div>
        <div className="dashbord download-content">
          <div className="title-section">
            <p>BOOKS</p>
          </div>
          <div className="icon-text-section">
            <div className="icon-section">
              <i className="fa fa-book" aria-hidden="true"></i>
            </div>
            <div className="text-section">
              <h1>
             {countBooks} 
              </h1>
              <span>Total books</span>
            </div>
            <div></div>
          </div>
          <div className="detail-section">
            <a href="/Books" className="view-pulishers-a">
              <p>View List</p>
              <i className="fa fa-arrow-right" aria-hidden="true"></i>
            </a>
          </div>
        </div>
        <div className="dashbord product-content">
          <div className="title-section">
            <p>AUTHORS</p>
          </div>
          <div className="icon-text-section">
            <div className="icon-section">
              <i className="fa fa-users" aria-hidden="true"></i>
            </div>
            <div className="text-section">
              <h1>
              {countPublishers}
              </h1>
              <span>Total authors</span>
            </div>
            <div></div>
          </div>
          <div className="detail-section">
            <a href="/Authors" className="view-authors-a">
              <p>View List</p>
              <i className="fa fa-arrow-right" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
    );
}

export default Home
