using AutoMapper;
using Library.Database;
using Library.EF;
using Library.Library.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Library.Services
{
    public interface IAuthorService
    {
        List<AuthorsGetDto> Get();
        List<AuthorsGetDto> GetAuthorsByBook(int id);

    }

    public class AuthorService : IAuthorService
    {

    
    private readonly LibraryDBContext _context;
    protected readonly IMapper _mapper;



    public AuthorService(LibraryDBContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
   
    }

    public List<AuthorsGetDto> Get()
    {
        var query = _context.Authors.AsQueryable();
        query = query.Where(p => p.IsDeleted == false);

        var list = query.ToList();

        return _mapper.Map<List<AuthorsGetDto>>(list);
    }

        public List<AuthorsGetDto> GetAuthorsByBook(int id)
        {
            var book_with_authors = _context.AuthBooks.Where(b => b.Book_Id == id).Include(a=>a.Authors);

            var listAuthorsOnBook = new List<Authors>();

            foreach (var author in book_with_authors)
            {
                listAuthorsOnBook.Add(author.Authors);

            }

            var list = listAuthorsOnBook.ToList();
            return _mapper.Map<List<AuthorsGetDto>>(list);
        }

    }
}
