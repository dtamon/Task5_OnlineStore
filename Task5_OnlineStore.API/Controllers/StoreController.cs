using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Task5_OnlineStore.Core.Dto;
using Task5_OnlineStore.Core.Services.Interfaces;
using Task5_OnlineStore.Core.Services.Services;
using Task5_OnlineStore.DataAccess.Queries;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Task5_OnlineStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly ICategoryService _categoryService;
        private readonly IOrderService _orderService;

        public StoreController(IProductService productService, ICategoryService categoryService, IOrderService orderService)
        {
            _productService = productService;
            _categoryService = categoryService;
            _orderService = orderService;
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

        // GET All Categories
        [HttpGet("categories")]
        public async Task<IActionResult> GetAllCategories()
        {
            return Ok(await _categoryService.GetAllCategoriesAsync());
        }

        [HttpPost("purchase")]
        [Authorize]
        public async Task<IActionResult> CheckoutOrder(IEnumerable<OrderProductDto> cartItems)
        {
            var userId = Convert.ToInt32(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            await _orderService.CreateOrderAsync(userId, cartItems);
            return Ok("Purchase made successfully");
        }
    }
}
