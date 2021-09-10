using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Library.Database
{
    public class Authors
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public string Image { get; set; }

        public string Biography { get; set; }

        public DateTime Birthday { get; set; }

        public string Email { get; set; }

        public bool? IsDeleted { get; set; }

    }
}
