using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Task5_OnlineStore.Core.Dto;
using Task5_OnlineStore.DataAccess.PagedResult;
using Task5_OnlineStore.DataAccess.Queries;

namespace Task5_OnlineStore.Core.Services.Interfaces
{
    public interface IProductService
    {
        Task CreateProductAsync(ProductDto product);
        Task UpdateProductAsync(ProductDto product);
        Task DeleteProductAsync(int id);
        Task<PagedResult<ProductDto>> GetAllProductsAsync(ProductQuery query);
        Task<ProductDto> GetProductByIdAsync(int id);
    }
}
