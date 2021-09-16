using AutoMapper;
using Library.Database;
using Library.EF;
using Library.Library.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;


namespace Library.Services
{
    public interface IAuthorService
    {
        Task<List<AuthorsGetDto>> GetAllAuthors(CancellationToken cancellationToken);
        Task<PaginationModel<IEnumerable<AuthorsGetDto>>> GetByFilters(SearchAndPaginationModel request, CancellationToken cancellationToken);
        Task<List<AuthorsGetDto>> GetAuthorsByBookId(int bookId, CancellationToken cancellationToken);
        Task<AuthorsGetDto> Insert(AuthorAddRequest request, CancellationToken cancellationToken);
        Task<AuthorsGetDto> Update(int id, AuthorAddRequest request, CancellationToken cancellationToken);
        Task<AuthorsGetDto> Delete(int id, CancellationToken cancellationToken);
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

        public async Task<List<AuthorsGetDto>> GetAllAuthors(CancellationToken cancellationToken)
        {
            var list = await _context.Authors.Where(b => b.IsDeleted == false).ToListAsync(cancellationToken);
            return _mapper.Map<List<AuthorsGetDto>>(list);
        }

        public async Task<PaginationModel<IEnumerable<AuthorsGetDto>>> GetByFilters(SearchAndPaginationModel request,CancellationToken cancellationToken)
        {
            var query = _context.Authors
              .Where(a => a.IsDeleted == false
                  && (string.IsNullOrWhiteSpace(request.Name)
                      || a.Name.ToLower().Trim().StartsWith(request.Name.ToLower().Trim())));
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
            var list = await query.ToListAsync(cancellationToken);
            var data = _mapper.Map<List<AuthorsGetDto>>(list);
            return new PaginationModel<IEnumerable<AuthorsGetDto>>(data, count);
        }

        public async Task<List<AuthorsGetDto>> GetAuthorsByBookId(int bookId,CancellationToken cancellationToken)
        {
            var listAuthorsOnBook = await _context.AuthBooks.Where(b => b.Book_Id == bookId)
                .Include(a => a.Authors).Select(a=>a.Authors).ToListAsync(cancellationToken);

            return _mapper.Map<List<AuthorsGetDto>>(listAuthorsOnBook);
        }

        public async Task<AuthorsGetDto> Insert(AuthorAddRequest request, CancellationToken cancellationToken)
        {
            request.IsDeleted = false;
            var entity = _mapper.Map<Database.Authors>(request);
            _context.Authors.Add(entity);
            await _context.SaveChangesAsync(cancellationToken);
            if (request.Books != null)
            {
                foreach (var bookId in request.Books)
                {
                    _context.AuthBooks.Add(
                        new AuthBooks() { Book_Id = bookId, Author_Id = entity.Id }
                    );
                }
            }
            await _context.SaveChangesAsync(cancellationToken);
            return _mapper.Map<AuthorsGetDto>(entity);
        }

        public async Task<AuthorsGetDto> Update(int id, AuthorAddRequest request, CancellationToken cancellationToken)
        {
            var entity = await _context.Authors.FindAsync(new object[] { id }, cancellationToken);
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
            await _context.SaveChangesAsync(cancellationToken);
            return _mapper.Map<AuthorsGetDto>(entity);
        }

        public async Task<AuthorsGetDto> Delete(int id, CancellationToken cancellationToken)
        {
            var entity = await _context.Authors.FindAsync(new object[] { id }, cancellationToken);
            entity.IsDeleted = true;
            await _context.SaveChangesAsync(cancellationToken);
            return _mapper.Map<AuthorsGetDto>(entity);
        }
    }
}
