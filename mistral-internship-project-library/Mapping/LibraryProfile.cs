using AutoMapper;
using Library.Library.Models;
using Library.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Library.Mapping
{
    public class LibraryProfile : Profile
    {
        public LibraryProfile()
        {

            CreateMap<Books, BooksGetDto>()
                .ForMember(d => d.Publisher, opt => opt.MapFrom(s => s.Publishers == null ? null : s.Publishers.Name));
            CreateMap<Books, BookAddRequest>().ReverseMap();

            CreateMap<Publishers, PublishersGetDto>()
                .ForMember(d => d.Country, opt => opt.MapFrom(s => s.Address.Country == null ? null : s.Address.Country))
                .ForMember(d => d.City, opt => opt.MapFrom(s => s.Address.City == null ? null : s.Address.City))
                .ForMember(d => d.ZipCode, opt => opt.MapFrom(s => s.Address.ZipCode == null ? null : s.Address.ZipCode))
                .ForMember(d => d.Road, opt => opt.MapFrom(s => s.Address.Road == null ? null : s.Address.Road));
            CreateMap<Publishers, PublisherAddRequest>().ReverseMap();

            CreateMap<Authors, AuthorsGetDto>();
            CreateMap<Authors, AuthorAddRequest>().ReverseMap();

            CreateMap<Address, AddressGetDto>();
            CreateMap<Address, PublisherAddRequest>().ReverseMap();

        }
    }
}
