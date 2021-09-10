using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Library.Database
{
    public class Books
    {
        [Key]
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string Image { get; set; }

        public int Pages { get; set; }

        public bool? IsDeleted { get; set; }

        public decimal Price { get; set; }

        [ForeignKey("Publisher_Id")]
        public Publishers Publishers { get; set; }

        public int Publisher_Id { get; set; }
    }
}
