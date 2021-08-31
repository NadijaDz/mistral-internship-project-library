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

        [HttpGet]
        public List<BooksGetDto> Get()
        {
            return _bookService.Get();
        }

        [HttpGet("{id}")]
        public BooksGetDto GetById(int id)
        {
            return _bookService.GetById(id);
        }

        public class FileProvider
        {
            
            public int KategorijaDokumentaId { get; set; }
            public string Naziv { get; set; }
            public string Opis { get; set; }


            public IFormCollection FormData { get; set; }
            public IList<IFormFile> Files { get; set; }
        }


        [HttpPost]
        public BooksGetDto Insert([FromForm] BookAddRequest request)
        {

            return _bookService.Insert(request);


        }

        [HttpPut("{id}")]
        public BooksGetDto Update(int id, BookAddRequest request)
        {
            return _bookService.Update(id, request);
        }

    
        //[HttpPut("{id}")]
        //public BooksGetDto Delete(int id, BookAddRequest request)
        //{
        //    return _bookService.Delete(id, request);
        //}



    }
}
