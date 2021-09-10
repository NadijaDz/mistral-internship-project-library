using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Library.Models
{
   public class AuthorAddRequest
    {
        public string Name { get; set; }

        public string Image { get; set; }

        public string Biography { get; set; }

        public DateTime Birthday { get; set; }

        public string Email { get; set; }

        public List<int> Books { get; set; }

        public bool? IsDeleted { get; set; }
    }
}
