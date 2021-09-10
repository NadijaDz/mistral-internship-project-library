using Library.Library.Models;
using Library.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Library.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PublishersController : ControllerBase
    {
        private readonly IPublisherService _publisherService;
        public PublishersController(IPublisherService publisherService)
        {
            _publisherService = publisherService;
        }

        [Route("getAllPublishers")]
        [HttpGet]
        public List<PublishersGetDto> GetAllPublishers()
        {
            return _publisherService.GetAllPublishers();
        }

        [HttpGet]
        public PaginationModel<IEnumerable<PublishersGetDto>> GetByFilters([FromQuery] SearchAndPaginationModel request)
        {
            return _publisherService.GetByFilters(request);
        }

        [HttpPost]
        public PublishersGetDto Insert(PublisherAddRequest request)
        {
            return _publisherService.Insert(request);
        }

        [HttpPut("{id}")]
        public PublishersGetDto Update(int id, PublisherAddRequest request)
        {
            return _publisherService.Update(id, request);
        }

        [HttpDelete("{id}")]
        public PublishersGetDto Delete(int id)
        {
            return _publisherService.Delete(id);
        }

    }
}
