using AutoMapper;
using Library.Library.Models;
using Library.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Library.Mapping
{
    public class LibraryProfile:Profile
    {

        public LibraryProfile()
        {
          
            CreateMap<Books, BooksGetDto>()
                .ForMember(d => d.Publisher, opt => opt.MapFrom(s => s.Publishers == null ? null : s.Publishers.Name))
                ;
            CreateMap<Books, BookAddRequest>().ReverseMap();

            CreateMap<Publishers, PublishersGetDto>()
                .ForMember(d => d.Country, opt => opt.MapFrom(s => s.Address.Country == null ? null : s.Address.Country))
                ;
            CreateMap<Publishers, PublisherAddRequest>().ReverseMap();


            CreateMap<Authors, AuthorsGetDto>();
            CreateMap<Authors, AuthorAddRequest>().ReverseMap();


        }
    }
}
