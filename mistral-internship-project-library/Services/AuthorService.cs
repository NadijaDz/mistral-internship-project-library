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
        List<AuthorsGetDto> GetAllAuthors();
        PaginationModel<IEnumerable<AuthorsGetDto>> GetByFilters(SearchAndPaginationModel request);
        List<AuthorsGetDto> GetAuthorsByBook(int id);
        AuthorsGetDto Insert(AuthorAddRequest request);
        AuthorsGetDto Update(int id, AuthorAddRequest request);
        AuthorsGetDto Delete(int id);
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

        public List<AuthorsGetDto> GetAllAuthors()
        {
            var list = _context.Authors.Where(b => b.IsDeleted == false).ToList();
            return _mapper.Map<List<AuthorsGetDto>>(list);
        }

        public PaginationModel<IEnumerable<AuthorsGetDto>> GetByFilters(SearchAndPaginationModel request)
        {
            var query = _context.Authors.AsQueryable();
            query = query.Where(p => p.IsDeleted == false);
            var count = query.Count();

            if (!string.IsNullOrWhiteSpace(request?.Name))
            {
                query = query.Where(x => x.Name.StartsWith(request.Name));
            }

            if (request.Page == 0)
            {
                request.Page = 0;
            }
            if (request.PageSize == 0)
            {
                request.PageSize = 10;
            }
            query = query.Skip(request.Page).Take(request.PageSize);

            var list = query.ToList();


            var data = _mapper.Map<List<AuthorsGetDto>>(list);

            return new PaginationModel<IEnumerable<AuthorsGetDto>>(data, count);
        }


        public List<AuthorsGetDto> GetAuthorsByBook(int id)
        {
            var book_with_authors = _context.AuthBooks.Where(b => b.Book_Id == id).Include(a => a.Authors);

            var listAuthorsOnBook = new List<Authors>();

            foreach (var author in book_with_authors)
            {
                listAuthorsOnBook.Add(author.Authors);

            }

            var list = listAuthorsOnBook.ToList();
            return _mapper.Map<List<AuthorsGetDto>>(list);
        }

      
        public AuthorsGetDto Insert(AuthorAddRequest request)
        {
            request.IsDeleted = false;
            var entity = _mapper.Map<Database.Authors>(request);

            _context.Authors.Add(entity);
            _context.SaveChanges();

            if (request.Books != null)
            {
                foreach (var bookId in request.Books)
                {
                    _context.AuthBooks.Add(
                        new AuthBooks() { Book_Id = bookId, Author_Id = entity.Id }
                    );
                }
            }

            _context.SaveChanges();
            return _mapper.Map<AuthorsGetDto>(entity);
        }

        public AuthorsGetDto Update(int id, AuthorAddRequest request)
        {
            var entity = _context.Authors.Find(id);
            _mapper.Map(request, entity);
            entity.IsDeleted = false;


            var author_with_books = _context.AuthBooks.Where(b => b.Author_Id == id).ToList();

            foreach (var bookId in request.Books)
            {
                var isAlreadyExistBook = author_with_books.Where(b => b.Book_Id== bookId).ToList();

                if (isAlreadyExistBook.Count == 0)
                {
                    _context.AuthBooks.Add(
                    new AuthBooks() { Book_Id = bookId, Author_Id = entity.Id }
                );
                }
            }

            _context.SaveChanges();
            return _mapper.Map<AuthorsGetDto>(entity);
        }


        public AuthorsGetDto Delete(int id)
        {
            var entity = _context.Authors.Find(id);
            entity.IsDeleted = true;
            _context.SaveChanges();
            return _mapper.Map<AuthorsGetDto>(entity);
        }



    }
}
