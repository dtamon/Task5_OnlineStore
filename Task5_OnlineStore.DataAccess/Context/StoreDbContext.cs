using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Task5_OnlineStore.DataAccess.Entities;

namespace Task5_OnlineStore.DataAccess.Context
{
    public class StoreDbContext : DbContext
    {
        public StoreDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderProduct> OrderProducts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>(eb =>
            {
                eb.HasMany(p => p.Orders)
                .WithMany(o => o.Products)
                .UsingEntity<OrderProduct>(
                    p => p.HasOne(wit => wit.Order)
                    .WithMany()
                    .HasForeignKey(wit => wit.OrderId),

                    o => o.HasOne(wit => wit.Product)
                    .WithMany()
                    .HasForeignKey(wit => wit.ProductId),

                    wit =>
                    {
                        wit.HasKey(wit => new { wit.ProductId, wit.OrderId });
                    });
            });
        }
    }
}
