using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Task5_OnlineStore.Core.Dto;
using Task5_OnlineStore.Core.Services.Interfaces;
using Task5_OnlineStore.DataAccess.Queries;

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
            await _orderService.CreateOrderAsync(userId, cartItems);
            return Ok("Purchase made successfully");
        }

        [HttpGet("ordered")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetNewOrders([FromQuery]OrderQuery query)
        {
            return Ok(await _orderService.GetAllNewOrdersAsync(query));
        }

        [HttpGet("userOrders")]
        [Authorize]
        public async Task<IActionResult> GetUserOrders([FromQuery]OrderQuery query)
        {
            var userId = Convert.ToInt32(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            return Ok(await _orderService.GetUserOrdersAsync(userId, query));
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
