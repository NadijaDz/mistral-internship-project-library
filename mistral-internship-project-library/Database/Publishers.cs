using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Library.Database
{
    public class Publishers
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public bool? IsDeleted { get; set; }

        [ForeignKey("Address_Id")]
        public Address Address { get; set; }
        public int Address_Id { get; set; }
    }
}
