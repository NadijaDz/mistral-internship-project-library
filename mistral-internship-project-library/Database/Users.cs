using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Library.Database
{
    public class Users
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public string Username { get; set; }

        public bool? IsDeleted { get; set; }

        [ForeignKey("Role_Id")]
        public Roles Roles { get; set; }

        public int Role_Id { get; set; }

    }
}
