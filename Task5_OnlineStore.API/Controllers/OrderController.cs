using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Task5_OnlineStore.Core.Dto;
using Task5_OnlineStore.Core.Services.Interfaces;

namespace Task5_OnlineStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost("purchase")]
        [Authorize]
        public async Task<IActionResult> CheckoutOrder(IEnumerable<OrderProductDto> cartItems)
        {
            var userId = Convert.ToInt32(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var order = cartItems;
            await _orderService.CreateOrderAsync(userId, cartItems);
            return Ok("Purchase made successfully");
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetNewOrders()
        {
            return Ok(await _orderService.GetAllNewOrdersAsync());
        }

        [HttpPut]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> ChangeOrderStatus(OrderDto order)
        {
            await _orderService.UpdateOrderStatusAsync(order);
            return Ok("Status changed successfully");
        }
    }
}
