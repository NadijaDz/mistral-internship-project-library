using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Library.Models
{
   public class PublisherAddRequest
    {
       
        public string Name { get; set; }

        public bool? IsDeleted { get; set; }

        public int Address_Id { get; set; }

        public string Road { get; set; }

        public string ZipCode { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

    }
}
