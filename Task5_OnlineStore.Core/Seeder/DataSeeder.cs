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
                    Email = "user1@gmail.com",
                    Password = "password1",
                    ConfirmPassword = "password1",
                    FirstName = "UserFName",
                    LastName = "UserLName",
                    RoleId = 2
                }); 
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
                new Brand() { BrandName = "Rode"}
            };
        }

        private IEnumerable<Category> GetCategories()
        {
            return new List<Category>()
            {
                new Category() { CategoryName = "Microphones"},
                new Category() { CategoryName = "Headphones"}
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
                    Cost = 126.62, BrandId = 2, CategoryId = 2}
            };
        }
    }
}
