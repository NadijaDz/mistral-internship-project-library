using AutoMapper;
using Library.Library.Models;
using Library.Database;
using Library.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace Library.Services
{
    public interface IBookService
    {
        List<BooksGetDto> GetAllBooks();
        PaginationModel<IEnumerable<BooksGetDto>> GetByFilters(SearchAndPaginationModel request);
        BooksGetDto Insert(BookAddRequest request);
        BooksGetDto Update(int id, BookAddRequest request);
        BooksGetDto Delete(int id);
        List<BooksGetDto> GetBooksByAuthor(int id);
    }

    public class BookService : IBookService
    {

        private readonly LibraryDBContext _context;
        protected readonly IMapper _mapper;
        private readonly IWebHostEnvironment webHostEnvironment;


        public BookService(LibraryDBContext context, IMapper mapper, IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            _mapper = mapper;
            webHostEnvironment = hostEnvironment;

        }

        public List<BooksGetDto> GetAllBooks()
        {
            var list = _context.Books.Where(b => b.IsDeleted == false).ToList();
            return _mapper.Map<List<BooksGetDto>>(list);
        }

        public PaginationModel<IEnumerable<BooksGetDto>> GetByFilters(SearchAndPaginationModel request)
        {
            var query = _context.Books.AsQueryable();
            query = query.Where(p => p.IsDeleted == false);
            var count = query.Count();

            if (!string.IsNullOrWhiteSpace(request?.Title))
            {
                query = query.Where(x => x.Title.StartsWith(request.Title));
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

            query = query.Include(c => c.Publishers);

            var list = query.ToList();

            var data = _mapper.Map<List<BooksGetDto>>(list);

            return new PaginationModel<IEnumerable<BooksGetDto>>(data, count);

        }


        public List<BooksGetDto> GetBooksByAuthor(int id)
        {
            var author_with_books = _context.AuthBooks.Where(b => b.Author_Id == id).Include(a => a.Books);

            var listBooksOfAuthor = new List<Books>();

            foreach (var book in author_with_books)
            {
                listBooksOfAuthor.Add(book.Books);

            }

            var list = listBooksOfAuthor.ToList();
            return _mapper.Map<List<BooksGetDto>>(list);
        }

        public BooksGetDto Insert(BookAddRequest request)
        {
            request.IsDeleted = false;

            var entity = _mapper.Map<Database.Books>(request);

            _context.Books.Add(entity);
            _context.SaveChanges();

            if (request.Authors != null)
            {
                foreach (var authorId in request.Authors)
                {
                    _context.AuthBooks.Add(
                        new AuthBooks() { Book_Id = entity.Id, Author_Id = authorId }
                    );

                }
            }


            _context.SaveChanges();

            return _mapper.Map<BooksGetDto>(entity);

        }


        public BooksGetDto Update(int id, BookAddRequest request)
        {
            var entity = _context.Books.Find(id);

            _mapper.Map(request, entity);

            entity.IsDeleted = false;


            var book_with_authors = _context.AuthBooks.Where(b => b.Book_Id == id).ToList();

            foreach (var authorId in request.Authors)
            {
                var isAlreadyExistAuthor = book_with_authors.Where(b => b.Author_Id == authorId).ToList();


                if (isAlreadyExistAuthor.Count == 0)
                {
                    _context.AuthBooks.Add(
                    new AuthBooks() { Book_Id = id, Author_Id = authorId }
                );
                }
            }

            _context.SaveChanges();
            return _mapper.Map<BooksGetDto>(entity);
        }

        public BooksGetDto Delete(int id)
        {
            var entity = _context.Books.Find(id);
            entity.IsDeleted = true;


            _context.SaveChanges();
            return _mapper.Map<BooksGetDto>(entity);
        }




    }
}
