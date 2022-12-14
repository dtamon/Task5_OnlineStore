using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Task5_OnlineStore.Core.Dto;
using Task5_OnlineStore.Core.Exceptions;
using Task5_OnlineStore.Core.Services.Interfaces;
using Task5_OnlineStore.DataAccess.Entities;
using Task5_OnlineStore.DataAccess.PagedResult;
using Task5_OnlineStore.DataAccess.Queries;
using Task5_OnlineStore.DataAccess.Repositories.Interfaces;

namespace Task5_OnlineStore.Core.Services.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;

        public ProductService(IProductRepository productRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
        }

        public async Task CreateProductAsync(ProductDto product)
        {
            await _productRepository.CreateProductAsync(_mapper.Map<Product>(product));
        }

        public async Task DeleteProductAsync(int id)
        {
            var product = await _productRepository.GetProductByIdAsync(id);
            if (product == null)
            {
                throw new NotFoundException("Product not found");
            }
            await _productRepository.DeleteProductAsync(product);
        }

        public async Task<PagedResult<ProductDto>> GetAllProductsAsync(ProductQuery query)
        {
            var pagedResultProduct = await _productRepository.GetAllProductsAsync(query);

            var pagedResultProductDto = new PagedResult<ProductDto>(
                _mapper.Map <List<ProductDto>>(pagedResultProduct.Items),
                pagedResultProduct.TotalPages,
                pagedResultProduct.ItemsFrom,
                pagedResultProduct.ItemsTo,
                pagedResultProduct.TotalItemsCount
                );

            return pagedResultProductDto;
        }

        public async Task<ProductDto> GetProductByIdAsync(int id)
        {
            var product = _mapper.Map<ProductDto>(await _productRepository.GetProductByIdAsync(id));
            if (product == null)
                throw new NotFoundException("Product not found");
            return product;
        }

        public async Task UpdateProductAsync(ProductDto product)
        {
            await _productRepository.UpdateProductAsync(_mapper.Map<Product>(product));
        }
    }
}
