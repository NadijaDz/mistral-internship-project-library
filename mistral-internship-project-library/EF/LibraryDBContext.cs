using Microsoft.EntityFrameworkCore;
using Library.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Library.EF
{
    public class LibraryDBContext:DbContext
    {
        public LibraryDBContext(DbContextOptions<LibraryDBContext> options)
             : base(options)
        {
        }
        public DbSet<Publishers> Publishers { get; set; }
        public DbSet<Books> Books { get; set; }
        public DbSet<Authors> Authors { get; set; }
        public DbSet<AuthBooks> AuthBooks { get; set; }
        public DbSet<Address> Address { get; set; }
        public DbSet<Roles> Roles { get; set; }
        public DbSet<Users> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AuthBooks>().HasKey(sc => new { sc.Book_Id, sc.Author_Id });
        }
    }
}
