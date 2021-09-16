using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Library.Models
{
    public class PaginationModel<T> where T : class
    {
        public PaginationModel(T data, int total)
        {
            Data = data;
            TotalCount = total;
        }

        public T Data { get; set; }
        public int TotalCount { get; set; }
    }
}
