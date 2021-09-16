using AutoMapper;
using Library.Library.Models;
using Library.Database;
using Library.EF;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Hosting;
using System.Threading;

namespace Library.Services
{
    public interface IBookService
    {
        Task<List<BooksGetDto>> GetAllBooksAsync(CancellationToken cancellationToken);
        Task<PaginationModel<IEnumerable<BooksGetDto>>> GetByFilters(SearchAndPaginationModel request, CancellationToken cancellationToken);
        Task<CountTotalDto> CountTotalItem(CancellationToken cancellationToken);
        Task<BooksGetDto> Insert(BookAddRequest request,CancellationToken cancellationToken);
        Task<BooksGetDto> Update(int id, BookAddRequest request,CancellationToken cancellationToken);
        Task<BooksGetDto> Delete(int id, CancellationToken cancellationToken);
        Task<List<BooksGetDto>> GetBooksByAuthorId(int authorId, CancellationToken cancellationToken);
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

        public async Task<List<BooksGetDto>> GetAllBooksAsync(CancellationToken cancellationToken)
        {
            var list = await _context.Books.Where(b => b.IsDeleted == false).ToListAsync(cancellationToken);
            return _mapper.Map<List<BooksGetDto>>(list);
        }

        public async Task<PaginationModel<IEnumerable<BooksGetDto>>> GetByFilters(SearchAndPaginationModel request, CancellationToken cancellationToken)
        {
            var query = _context.Books
                .Where(b => b.IsDeleted == false
                    && (string.IsNullOrWhiteSpace(request.Title)
                        || b.Title.ToLower().Trim().StartsWith(request.Title.ToLower().Trim())));
            var count = await query.CountAsync(cancellationToken);
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
            var list = await query.ToListAsync(cancellationToken);
            var data = _mapper.Map<List<BooksGetDto>>(list);
            return new PaginationModel<IEnumerable<BooksGetDto>>(data, count);
        }

        public async Task<List<BooksGetDto>> GetBooksByAuthorId(int authorId,CancellationToken cancellationToken)
        {
            var author_on_books = await _context.AuthBooks.Where(b => b.Author_Id == authorId)
                .Include(a => a.Books).Select(b=>b.Books).ToListAsync(cancellationToken);
            //var listBooksOfAuthor = new List<Books>();
            //foreach (var book in author_with_books)
            //{
            //    listBooksOfAuthor.Add(book.Books);
            //}
            //var list = listBooksOfAuthor.ToList();
            return _mapper.Map<List<BooksGetDto>>(author_on_books);
        }

        public async Task<CountTotalDto> CountTotalItem(CancellationToken cancellationToken)
        {
            var countBooks = await _context.Books.Where(b=>b.IsDeleted==false).CountAsync(cancellationToken);
            var countAuthors = await _context.Authors.Where(a => a.IsDeleted == false).CountAsync(cancellationToken);
            var countPublishers = await _context.Publishers.Where(p => p.IsDeleted == false).CountAsync(cancellationToken);
            CountTotalDto total = new CountTotalDto
            {
                CountBooks=countBooks,
                CountAuthors=countAuthors,
                CountPublishers=countPublishers
            };
            return total;
        }

        public async Task<BooksGetDto> Insert(BookAddRequest request,CancellationToken cancellationToken)
        {
            request.IsDeleted = false;
            var entity = _mapper.Map<Database.Books>(request);
            _context.Books.Add(entity);
           await _context.SaveChangesAsync(cancellationToken);
            if (request.Authors != null)
            {
                foreach (var authorId in request.Authors)
                {
                    _context.AuthBooks.Add(
                        new AuthBooks() { Book_Id = entity.Id, Author_Id = authorId }
                    );
                }
            }
            await _context.SaveChangesAsync(cancellationToken);
            return _mapper.Map<BooksGetDto>(entity);
        }

        public async Task<BooksGetDto> Update(int id, BookAddRequest request,CancellationToken cancellationToken)
        {
            var entity = await  _context.Books.FindAsync(new object[]{id},cancellationToken);
            _mapper.Map(request, entity);
            entity.IsDeleted = false;

            var book_with_authors = await _context.AuthBooks.Where(b => b.Book_Id == id).ToListAsync(cancellationToken);

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
            await _context.SaveChangesAsync(cancellationToken);
            return _mapper.Map<BooksGetDto>(entity);
        }

        public async Task<BooksGetDto> Delete(int id,CancellationToken cancellationToken)
        {
            var entity = await _context.Books.FindAsync(new object[]{id},cancellationToken);
            entity.IsDeleted = true;
            await _context.SaveChangesAsync(cancellationToken);
            return _mapper.Map<BooksGetDto>(entity);
        }
    }
}
