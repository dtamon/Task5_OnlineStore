using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Task5_OnlineStore.Core.Dto;

namespace Task5_OnlineStore.Core.Services.Interfaces
{
    public interface IProductService
    {
        Task CreateProductAsync(ProductDto product);
        Task UpdateProductAsync(ProductDto product);
        Task DeleteProductAsync(int id);
        Task<IEnumerable<ProductDto>> GetAllProductsAsync();
        Task<ProductDto> GetProductByIdAsync(int id);
    }
}
