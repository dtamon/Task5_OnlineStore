using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Task5_OnlineStore.DataAccess.Context;
using Task5_OnlineStore.DataAccess.Entities;
using Task5_OnlineStore.DataAccess.PagedResult;
using Task5_OnlineStore.DataAccess.Queries;
using Task5_OnlineStore.DataAccess.Queries.Enum;
using Task5_OnlineStore.DataAccess.Repositories.Interfaces;

namespace Task5_OnlineStore.DataAccess.Repositories.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly StoreDbContext _context;

        public ProductRepository(StoreDbContext context)
        {
            _context = context;
        }

        public async Task CreateProductAsync(Product product)
        {
            await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteProductAsync(Product product)
        {
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
        }

        public async Task<PagedResult<Product>> GetAllProductsAsync(ProductQuery query)
        {
            //Fetching all records matching searching phrase
            var baseQuery = _context.Products
                                .Include(x => x.Brand)
                                .Include(x => x.Category)
                                .Where(x => query.SearchPhrase == null || (x.ProductName.ToLower().Contains(query.SearchPhrase.ToLower())
                                                                        || x.Description.ToLower().Contains(query.SearchPhrase.ToLower())));

            //Ordering if SortBy is not empty 
            if (!string.IsNullOrEmpty(query.SortBy))
            {
                var columnsSelector = new Dictionary<string, Expression<Func<Product, object>>>()
                {
                    { nameof(Product.Brand.BrandName), r => r.Brand.BrandName },
                    { nameof(Product.ProductName), r => r.ProductName },
                    { nameof(Product.Cost), r => r.Cost },
                };

                var selectedColumn = columnsSelector[query.SortBy];

                baseQuery = query.SortDirection == SortDirection.ASC
                    ? baseQuery.OrderBy(selectedColumn)
                    : baseQuery.OrderByDescending(selectedColumn);
            }

            //Pagination
            var products = await baseQuery
                .Skip(query.PageSize * (query.PageNumber - 1))
                .Take(query.PageSize)
                .ToListAsync();

            var totalItemsCount = baseQuery.Count();

            var result = new PagedResult<Product>(products, totalItemsCount, query.PageSize, query.PageNumber);

            return result;
        }

        public async Task<Product?> GetProductByIdAsync(int id)
        {
            return await _context.Products
                .Include(x => x.Brand)
                .Include(x => x.Category)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task UpdateProductAsync(Product product)
        {
            _context.Products.Update(product);
            await _context.SaveChangesAsync();
        }
    }
}
