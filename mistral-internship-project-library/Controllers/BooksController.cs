using Library.Library.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Library.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Library.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly IBookService _bookService;
        public BooksController(IBookService bookService)
        {
            _bookService = bookService;
        }
        [Route("getAllBooks")]
        [HttpGet]
        public List<BooksGetDto> GetAllBooks()
        {
            return _bookService.GetAllBooks();
        }

        [HttpGet]
        public PaginationModel<IEnumerable<BooksGetDto>> GetByFilters([FromQuery] SearchAndPaginationModel request)
        {
            return _bookService.GetByFilters(request);
        }

        [HttpGet("{id}")]
        public List<BooksGetDto> GetBooksByAuthor(int id)
        {
            return _bookService.GetBooksByAuthor(id);
        }

        [HttpPost]
        public BooksGetDto Insert(BookAddRequest request)
        {
            return _bookService.Insert(request);
        }

        [HttpPut("{id}")]
        public BooksGetDto Update(int id,BookAddRequest request)
        {
            return _bookService.Update(id, request);
        }

        [HttpDelete("{id}")]
        public BooksGetDto Delete(int id)
        {
            return _bookService.Delete(id);
        }

    }
}
