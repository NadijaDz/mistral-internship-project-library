using AutoMapper;
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


    }
}
