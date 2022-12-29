using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Task5_OnlineStore.Core.Dto;
using Task5_OnlineStore.Core.Services.Interfaces;
using Task5_OnlineStore.DataAccess.Queries;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Task5_OnlineStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreController : ControllerBase
    {
        private readonly IProductService _productService;

        public StoreController(IProductService productService)
        {
            _productService = productService;
        }

        // GET: api/<StoreController>
        [HttpGet]
        public async Task<IActionResult> GetAllProducts([FromQuery]ProductQuery query)
        {
            return Ok(await _productService.GetAllProductsAsync(query));
        }

        // GET api/<StoreController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            return Ok(await _productService.GetProductByIdAsync(id));
        }

        // POST api/<StoreController>
        [HttpPost]
        public async Task<IActionResult> CreateProduct(ProductDto product)
        {
            await _productService.CreateProductAsync(product);
            return Ok("Added Successfully");
        }

        // PUT api/<StoreController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(ProductDto product)
        {
            await _productService.UpdateProductAsync(product);
            return Ok("Updated Successfully");
        }

        // DELETE api/<StoreController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            await _productService.DeleteProductAsync(id);
            return Ok("Deleted Successfully");
        }

        [HttpPost("purchase")]
        [Authorize]
        public async Task<IActionResult> BuyCartProducts(IEnumerable<ProductDto> cart)
        {
            return Ok("Purchase made successfully");
        }
    }
}
