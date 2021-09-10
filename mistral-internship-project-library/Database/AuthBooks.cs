using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Library.Database
{
    public class AuthBooks
    {
        [ForeignKey("Author_Id")]
        public Authors Authors { get; set; }

        public int Author_Id { get; set; }

        [ForeignKey("Book_Id")]
        public Books Books { get; set; }

        public int Book_Id { get; set; }
    }
}
