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

    public interface IPublisherService
    {
        List<PublishersGetDto> Get();
        List<PublishersGetDto> GetBySearchAndPagination(SearchAndPaginationModel request);




    }
    public class PublisherService:IPublisherService
    {
        private readonly LibraryDBContext _context;
        protected readonly IMapper _mapper;


        public PublisherService(LibraryDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;

        }


        public List<PublishersGetDto> Get()
        {
            var query = _context.Publishers.AsQueryable().Include(c => c.Address);
            query = query.Where(p => p.IsDeleted == false).Include(c => c.Address);


         

            var list = query.ToList();

            return _mapper.Map<List<PublishersGetDto>>(list);
        }
        public List<PublishersGetDto> GetBySearchAndPagination(SearchAndPaginationModel request)
        {
            var query = _context.Publishers.AsQueryable();
            query = query.Where(p => p.IsDeleted == false);


            if (!string.IsNullOrWhiteSpace(request?.Name))
            {
                query = query.Where(x => x.Name.StartsWith(request.Name));
            }

            if (request.Skip == 0)
            {
                request.Skip = 0;
            }
            if (request.Take == 0)
            {
                request.Take = 15;
            }
            query = query.Skip(request.Skip).Take(request.Take);

            query = query.Include(c => c.Address);

            var list = query.ToList();

            return _mapper.Map<List<PublishersGetDto>>(list);
        }

    }
}
