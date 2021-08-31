using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Model
{
   public partial class BooksGetDto
    {
        public int Id { get; set; }
        public string Title { get; set; }

        public string Description { get; set; }
        public string Image { get; set; }

        public int Pages { get; set; }

        public decimal Price { get; set; }

        public string Publisher { get; set; }
        public int Publisher_Id { get; set; }
    }
}
