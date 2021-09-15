using Library.Library.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Library.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Threading;

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

        [Route("GetAllBooks")]
        [HttpGet]
        public async Task<IActionResult> GetAllBooks(CancellationToken cancellationToken)
        {
            try
            {
                return Ok(await _bookService.GetAllBooksAsync(cancellationToken));
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetByFilters([FromQuery] SearchAndPaginationModel request, CancellationToken cancellationToken)
        {
            try
            {
                return Ok(await _bookService.GetByFilters(request,cancellationToken));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public List<BooksGetDto> GetBooksByAuthor(int id)
        {
            return  _bookService.GetBooksByAuthor(id);
        }

        [Route("CountTotalItem")]
        [HttpGet]
        public async Task<IActionResult> CountTotalItem(CancellationToken cancellationToken)
        {
            try
            {
                return Ok(await _bookService.CountTotalItem(cancellationToken));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost]
        public async Task<IActionResult> Insert(BookAddRequest request, CancellationToken cancellationToken)
        {
            try
            {
                return Ok(await _bookService.Insert(request, cancellationToken));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id,BookAddRequest request, CancellationToken cancellationToken)
        {
            try
            {
                return Ok(await _bookService.Update(id,request,cancellationToken));
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
               return Ok(await _bookService.Delete(id, cancellationToken));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
