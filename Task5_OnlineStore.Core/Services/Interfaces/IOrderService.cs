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
    public interface IOrderService
    {
        Task<PagedResult<OrderDto>> GetAllNewOrdersAsync(OrderQuery query);
        Task<ICollection<OrderDto>> GetUserOrdersAsync(int userId);
        Task CreateOrderAsync(int userId, IEnumerable<OrderProductDto> cartItems);
        Task UpdateOrderStatusAsync(OrderDto orderDto);
    }
}
