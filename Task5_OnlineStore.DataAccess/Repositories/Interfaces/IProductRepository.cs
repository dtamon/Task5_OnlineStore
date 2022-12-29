using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Task5_OnlineStore.DataAccess.Entities;
using Task5_OnlineStore.DataAccess.PagedResult;
using Task5_OnlineStore.DataAccess.Queries;

namespace Task5_OnlineStore.DataAccess.Repositories.Interfaces
{
    public interface IProductRepository
    {
        Task<PagedResult<Product>> GetAllProductsAsync(ProductQuery query);
        Task<Product?> GetProductByIdAsync(int id);
        Task CreateProductAsync(Product product);
        Task UpdateProductAsync(Product product);
        Task DeleteProductAsync(Product product);
    }
}
