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
        List<BooksGetDto> Get();

        BooksGetDto GetById(int id);

        BooksGetDto Insert(BookAddRequest request);

        BooksGetDto Update(int id, BookAddRequest request);

        //BooksGetDto Delete(int id, BookAddRequest request);
      
    

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


        public List<BooksGetDto> Get()
        {
            var query = _context.Books.AsQueryable().Include(c => c.Publishers);
            query = query.Where(p => p.IsDeleted == false).Include(c => c.Publishers);


            var list = query.ToList();

            return _mapper.Map<List<BooksGetDto>>(list);
        }

        public BooksGetDto GetById(int id)
        {
            var entity = _context.Books.Find(id);

            return _mapper.Map<BooksGetDto>(entity);
        }


        public BooksGetDto Insert(BookAddRequest request)
        {
            request.IsDeleted = false;
            string uniqueFileName = UploadedFile(request);
             request.Image = uniqueFileName;

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

        private string UploadedFile(BookAddRequest model)
        {
            string uniqueFileName = null;
            string filePath = null;

            if (model.ImageFile != null)
            {
                var folderName = Path.Combine("Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                string uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "Images");
                uniqueFileName = Guid.NewGuid().ToString() + "_" + model.ImageFile.FileName;
                 filePath = Path.Combine(uploadsFolder, uniqueFileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    model.ImageFile.CopyTo(fileStream);
                }
            }
            
            return filePath;
        }

        public BooksGetDto Update(int id, BookAddRequest request)
        {
            var entity = _context.Books.Find(id);
            _mapper.Map(request, entity);

            entity.IsDeleted = false;
            

            var book_with_authors = _context.AuthBooks.Where(b=>b.Book_Id==id).ToList();

            foreach(var authorId in request.Authors)
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

        //public BooksGetDto Delete(int id, BookAddRequest request)
        //{
        //    var entity = _context.Books.Find(id);
        //    request.IsDeleted = true;

        //    _mapper.Map(request, entity);

        //    _context.SaveChanges();
        //    return _mapper.Map<BooksGetDto>(entity);
        //}






    }
}
