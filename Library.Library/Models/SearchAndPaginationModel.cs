using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Library.Models
{
   public class SearchAndPaginationModel
    {
        public string Name { get; set; }
 
        public string Title { get; set; }

        public int Page { get; set; }

        public int PageSize { get; set; }

    }
}
