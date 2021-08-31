using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Library.Models
{
   public class PublishersGetDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool? IsDeleted { get; set; }

        public string Country { get; set; }

        public int Address_Id { get; set; }
    }
}
