using Library.Library.Models;
using Library.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Library.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorsController : ControllerBase
    {
        private readonly IAuthorService _authorService;
        public AuthorsController(IAuthorService authorService)
        {
            _authorService = authorService;
        }

        [Route("getAllAuthors")]
        [HttpGet]
        public List<AuthorsGetDto> GetAllAuthors()
        {
            return _authorService.GetAllAuthors();
        }

        [HttpGet]
        public PaginationModel<IEnumerable<AuthorsGetDto>> GetByFilters([FromQuery] SearchAndPaginationModel request)
        {
            return _authorService.GetByFilters(request);
        }

        [HttpGet("{id}")]
        public List<AuthorsGetDto> GetAuthorsByBook(int id)
        {
            return _authorService.GetAuthorsByBook(id);
        }

        [HttpPost]
        public AuthorsGetDto Insert(AuthorAddRequest request)
        {
            return _authorService.Insert(request);
        }

        [HttpPut("{id}")]
        public AuthorsGetDto Update(int id, AuthorAddRequest request)
        {
            return _authorService.Update(id, request);
        }

        [HttpDelete("{id}")]
        public AuthorsGetDto Delete(int id)
        {
            return _authorService.Delete(id);
        }

    }
}
