using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Task5_OnlineStore.Core.Dto;

namespace Task5_OnlineStore.Core.Services.Interfaces
{
    public interface IOrderService
    {
        Task<ICollection<OrderDto>> GetAllNewOrdersAsync();
        Task CreateOrderAsync(int userId, IEnumerable<OrderProductDto> cartItems);
        Task UpdateOrderStatusAsync(OrderDto orderDto);
    }
}
