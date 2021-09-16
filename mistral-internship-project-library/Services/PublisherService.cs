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
        List<PublishersGetDto> GetAllPublishers();
        PaginationModel<IEnumerable<PublishersGetDto>> GetByFilters(SearchAndPaginationModel request);
        PublishersGetDto Insert(PublisherAddRequest request);
        PublishersGetDto Update(int id, PublisherAddRequest request);
        PublishersGetDto Delete(int id);
    }

    public class PublisherService : IPublisherService
    {
        private readonly LibraryDBContext _context;
        protected readonly IMapper _mapper;

        public PublisherService(LibraryDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;

        }

        public List<PublishersGetDto> GetAllPublishers()
        {
            var list = _context.Publishers.Where(b => b.IsDeleted == false).ToList();
            return _mapper.Map<List<PublishersGetDto>>(list);
        }

        public PaginationModel<IEnumerable<PublishersGetDto>> GetByFilters(SearchAndPaginationModel request)
        {
            var query = _context.Publishers.AsQueryable();
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
            query = query.Include(c => c.Address);
            var list = query.ToList();
            var data=_mapper.Map<List<PublishersGetDto>>(list);
            return new PaginationModel<IEnumerable<PublishersGetDto>>(data, count);
        }

        public PublishersGetDto Insert(PublisherAddRequest request)
        {
            request.IsDeleted = false;
            var entityAddress = _mapper.Map<Database.Address>(request);
            _context.Address.Add(entityAddress);
            _context.SaveChanges();

            request.Address_Id = entityAddress.Id;
            var entityPublisher = _mapper.Map<Database.Publishers>(request);
            _context.Publishers.Add(entityPublisher);
            _context.SaveChanges();
            return _mapper.Map<PublishersGetDto>(entityPublisher);
        }

        public PublishersGetDto Update(int id, PublisherAddRequest request)
        {
            var entityPublisher = _context.Publishers.Find(id);
            _mapper.Map(request, entityPublisher);
            var entityAddress = _context.Address.Find(request.Address_Id);
            _mapper.Map(request, entityAddress);
            _context.SaveChanges();
            return _mapper.Map<PublishersGetDto>(entityPublisher);
        }

        public PublishersGetDto Delete(int id)
        {
            var entityPublisher = _context.Publishers.Find(id);
            entityPublisher.IsDeleted = true;
            _context.SaveChanges();
            return _mapper.Map<PublishersGetDto>(entityPublisher);
        }
    }
}
