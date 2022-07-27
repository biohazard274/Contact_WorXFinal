using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using MyContacts.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace MyContacts.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<CountryCode> CountryCodes { get; set; }
        public DbSet<Telephone> Telephones { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Setting> Settings { get; set; }



    }
}
