using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Task5_OnlineStore.DataAccess.Context;
using Task5_OnlineStore.DataAccess.Entities;
using Task5_OnlineStore.DataAccess.Repositories.Interfaces;

namespace Task5_OnlineStore.DataAccess.Repositories.Repositories
{
    public class BrandRepository : IBrandRepository
    {
        private readonly StoreDbContext _context;

        public BrandRepository(StoreDbContext context)
        {
            _context = context;
        }
        public async Task<ICollection<Brand>> GetAllBrandsAsync()
        {
            return await _context.Brands.ToListAsync();
        }
    }
}
