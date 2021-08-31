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

        [HttpGet]
        public List<PublishersGetDto> Get()
        {
            return _publisherService.Get();
        }

        [Route("GetBySearchAndPagination")]
        [HttpGet]
        public List<PublishersGetDto> GetBySearchAndPagination([FromQuery] SearchAndPaginationModel request)
        {
            return _publisherService.GetBySearchAndPagination(request);
        }
    }
}
