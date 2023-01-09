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
    public interface IOrderRepository
    {
        Task<PagedResult<Order>> GetAllOrdersAsync(OrderQuery query);
        Task<PagedResult<Order>> GetUserOrdersAsync(int userId, OrderQuery query);
        Task CreateOrderAsync(Order order);
        Task UpdateOrderAsync(Order order);
    }
}
