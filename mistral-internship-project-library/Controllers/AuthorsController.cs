using Library.Library.Models;
using Library.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
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

        [Route("GetAllAuthors")]
        [HttpGet]
        public async Task<IActionResult> GetAllAuthors(CancellationToken cancellationToken)
        {
            try
            {
                return Ok(await _authorService.GetAllAuthors(cancellationToken));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetByFilters([FromQuery] SearchAndPaginationModel request, CancellationToken cancellationToken)
        {
            try
            {
                return Ok(await _authorService.GetByFilters(request,cancellationToken));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{bookId}")]
        public async Task<IActionResult> GetAuthorsByBookId(int bookId, CancellationToken cancellationToken)
        {
            try
            {
                return Ok(await _authorService.GetAuthorsByBookId(bookId, cancellationToken));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Insert(AuthorAddRequest request, CancellationToken cancellationToken)
        {
            try
            {
                return Ok(await _authorService.Insert(request, cancellationToken));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, AuthorAddRequest request, CancellationToken cancellationToken)
        {
            try
            {
                return Ok(await _authorService.Update(id, request, cancellationToken));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
        {
            try
            {
                return Ok(await _authorService.Delete(id, cancellationToken));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
