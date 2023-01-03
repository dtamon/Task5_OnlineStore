using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Task5_OnlineStore.Core.Dto;
using Task5_OnlineStore.Core.Services.Interfaces;
using Task5_OnlineStore.DataAccess.Context;
using Task5_OnlineStore.DataAccess.Entities;

namespace Task5_OnlineStore.Core.Seeder
{
    public class DataSeeder
    {
        private readonly StoreDbContext _context;
        private readonly IAccountService _accountService;

        public DataSeeder(StoreDbContext context, IAccountService accountService)
        {
            _context = context;
            _accountService = accountService;
        }

        public void Seed()
        {
            if (!_context.Database.CanConnect())
                return;
            if (!_context.Categories.Any())
            {
                _context.Categories.AddRange(GetCategories());
                _context.SaveChanges();
            }
            if (!_context.Brands.Any())
            {
                _context.Brands.AddRange(GetBrands());
                _context.SaveChanges();
            }
            if (!_context.Products.Any())
            {
                _context.Products.AddRange(GetProducts());
                _context.SaveChanges();
            }
            if (!_context.Roles.Any())
            {
                _context.Roles.AddRange(GetRoles());
                _context.SaveChanges();
            }
            if (!_context.Users.Any())
            {
                _accountService.RegisterUser(new RegisterUserDto()
                {
                    Email = "admin@gmail.com",
                    Password = "admin",
                    ConfirmPassword = "admin",
                    FirstName = "Admin",
                    LastName = "Admin",
                    RoleId = 1
                });
                _accountService.RegisterUser(new RegisterUserDto()
                {
                    Email = "johnsmith@gmail.com",
                    Password = "password1",
                    ConfirmPassword = "password1",
                    FirstName = "John",
                    LastName = "Smith",
                    RoleId = 2
                });

                _accountService.RegisterUser(new RegisterUserDto()
                {
                    Email = "mkowalski@gmail.com",
                    Password = "password2",
                    ConfirmPassword = "password2",
                    FirstName = "Mark",
                    LastName = "Kowalski",
                    RoleId = 2
                });
            }
            if (!_context.Orders.Any())
            {
                _context.Orders.AddRange(GetOrders());
                _context.SaveChanges();
            }
            if (!_context.OrderProducts.Any())
            {
                _context.OrderProducts.AddRange(GetOrderProducts());
                _context.SaveChanges();
            }
        }

        private IEnumerable<Role> GetRoles()
        {
            return new List<Role>()
            {
                new Role() { RoleName = "Admin" },
                new Role() { RoleName = "User" }
            };
        }

        private IEnumerable<Brand> GetBrands()
        {
            return new List<Brand>()
            {
                new Brand() { BrandName = "Sennheiser"},
                new Brand() { BrandName = "Shure"},
                new Brand() { BrandName = "Rode"},
                new Brand() { BrandName = "Neumann"}
            };
        }

        private IEnumerable<Category> GetCategories()
        {
            return new List<Category>()
            {
                new Category() { CategoryName = "Microphones"},
                new Category() { CategoryName = "Headphones"},
                new Category() { CategoryName = "Speakers"}
            };
        }

        private IEnumerable<Product> GetProducts()
        {
            return new List<Product>()
            {
                new Product() { ProductName  = "HD-25",
                    Description = "The Sennheiser HD-25 is probably one of the most widely used headphones among professionals. It owes this primarily to its robust, but extremely compact design and good shielding.",
                    Cost = 150.68, BrandId = 1, CategoryId = 2},
                new Product() { ProductName  = "HD-600",
                    Description = "The HD 600 Avantgarde are audiophile-quality, open dynamic hi-fi/professional stereo headphones. The advanced diaphragm design eliminates standing waves in the diaphragm material. ",
                    Cost = 342.14, BrandId = 1, CategoryId = 2},
                new Product() { ProductName  = "SM 7 B",
                    Description = "The Shure SM7B is a dynamic moving coil microphone with a fixed cardioid characteristic that is ideal for recording speech and vocals, but it also does a great job when miking instruments. ",
                    Cost = 400.42, BrandId = 2, CategoryId = 1},
                new Product() { ProductName  = "NT-USB",
                    Description = "Rode’s NT-USB is a USB condenser microphone with an excellent signal-to-noise ratio that will bring studio-quality sound to any desktop with a device running Windows, MacOS, or iOS.",
                    Cost = 171.68, BrandId = 3, CategoryId = 1},
                new Product() { ProductName  = "NT1-A",
                    Description = "The Rode NT1-A has become legendary in the lower price segment over the last few years. It's impossible now to imagine (home) studios and other recording setups anywhere in the world without the large-diaphragm microphone in its distinctive silver finish.",
                    Cost = 191.45, BrandId = 3, CategoryId = 1},
                new Product() { ProductName = "SE215-CL",
                    Description = "Dynamic MicroDriver for warm sound with dynamic bass. Shields over 90% of ambient noise. Suitable for in-ear monitoring as well as MP3 player. In-ear",
                    Cost = 126.62, BrandId = 2, CategoryId = 2},
                new Product() { ProductName = "KH 80 DSP Sub Bundle",
                    Description = "Studio Monitor with DSP. Control panel for standby and acoustical control. Electronic peak /thermo limiter protection circuit separately for woofer and tweeter",
                    Cost = 2111.00, BrandId = 4, CategoryId = 3},
                new Product() { ProductName = "KH 120 A",
                    Description = "Frequency range: 52 Hz - 21 kHz (+/- 3 dB). Power: 50 W Woofer and 50 W Tweeter. Separate woofer and tweeter electronic peak limiters and thermal-protection circuitry",
                    Cost = 598.00, BrandId = 4, CategoryId = 3},
                new Product() { ProductName = "Stem Speaker",
                    Description = "tem Speaker's innovative design gives you the option to mount the device on the ceiling, wall, or table for ultimate flexibility. With its powerful driver and built-in technology, Stem Speaker delivers an exceptional sound experience in any meeting room.",
                    Cost = 699.00, BrandId = 2, CategoryId = 3},
                new Product() { ProductName = "SRH840A",
                    Description = "Developed to provide accurate and well-balanced audio, the new SRH840A Professional Monitoring Headphones are optimized for critical listening and studio monitoring. A wide, padded headband and collapsible design combine with Shure durability to provide the ultimate listening experience.",
                    Cost = 149.00, BrandId = 2, CategoryId = 2},
                new Product() { ProductName = "NTH-100",
                    Description = "The NTH-100s are the culmination of decades of passion, immersion and innovation in audio technology. Every component has been painstakingly analysed, crafted and refined to deliver an outstanding audio experience.",
                    Cost = 180.35, BrandId = 3, CategoryId = 2},

            };
        }

        private IEnumerable<Order> GetOrders()
        {
            return new List<Order>
            {
                new Order() { UserId = 2, TotalCost = 834.94, DateOfOrder = DateTime.Now, Status="Ordered"},
                new Order() { UserId = 2, TotalCost = 5235.46, DateOfOrder = DateTime.Now, Status="Ordered"},
                new Order() { UserId = 2, TotalCost = 1398.00, DateOfOrder = DateTime.Now, Status="Ordered"},
                new Order() { UserId = 2, TotalCost = 5414.42, DateOfOrder = DateTime.Now, Status="Ordered"},
                new Order() { UserId = 2, TotalCost = 1105.7, DateOfOrder = DateTime.Now, Status="Ordered"},
                new Order() { UserId = 2, TotalCost = 2944.82, DateOfOrder = DateTime.Now, Status="Ordered"},

            };
        }

        private IEnumerable<OrderProduct> GetOrderProducts()
        {
            return new List<OrderProduct>
            {
                new OrderProduct() {OrderId = 1, ProductId = 1, Quantity = 3},
                new OrderProduct() {OrderId = 1, ProductId = 5, Quantity = 2},
                new OrderProduct() {OrderId = 2, ProductId = 6, Quantity = 1},
                new OrderProduct() {OrderId = 2, ProductId = 5, Quantity = 1},
                new OrderProduct() {OrderId = 2, ProductId = 11, Quantity = 1},
                new OrderProduct() {OrderId = 2, ProductId = 7, Quantity = 2},
                new OrderProduct() {OrderId = 2, ProductId = 4, Quantity = 3},
                new OrderProduct() {OrderId = 3, ProductId = 9, Quantity = 2},
                new OrderProduct() {OrderId = 4, ProductId = 2, Quantity = 3},
                new OrderProduct() {OrderId = 4, ProductId = 8, Quantity = 5},
                new OrderProduct() {OrderId = 5, ProductId = 3, Quantity = 1},
                new OrderProduct() {OrderId = 5, ProductId = 6, Quantity = 2},
                new OrderProduct() {OrderId = 5, ProductId = 1, Quantity = 3},
                new OrderProduct() {OrderId = 6, ProductId = 5, Quantity = 4},
                new OrderProduct() {OrderId = 6, ProductId = 6, Quantity = 2},
                new OrderProduct() {OrderId = 6, ProductId = 2, Quantity = 3},
                new OrderProduct() {OrderId = 6, ProductId = 1, Quantity = 2},
                new OrderProduct() {OrderId = 6, ProductId = 8, Quantity = 1},

            };
        }
    }
}
