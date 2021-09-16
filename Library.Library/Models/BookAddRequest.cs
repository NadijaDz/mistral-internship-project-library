using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Library.Models
{
    public class BookAddRequest
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public string Image { get; set; }

        public int Pages { get; set; }

        public decimal Price { get; set; }

        public int Author_Id { get; set; }

        public int Publisher_Id { get; set; }

        public List<int> Authors { get; set; }

        public bool? IsDeleted { get; set; }

    }
}
