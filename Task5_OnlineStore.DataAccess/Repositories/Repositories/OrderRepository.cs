using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Task5_OnlineStore.DataAccess.Context;
using Task5_OnlineStore.DataAccess.Entities;
using Task5_OnlineStore.DataAccess.PagedResult;
using Task5_OnlineStore.DataAccess.Queries;
using Task5_OnlineStore.DataAccess.Repositories.Interfaces;

namespace Task5_OnlineStore.DataAccess.Repositories.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly StoreDbContext _context;

        public OrderRepository(StoreDbContext context)
        {
            _context = context;
        }

        public async Task CreateOrderAsync(Order order)
        {
            await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync();
        }

        public async Task<PagedResult<Order>> GetAllOrdersAsync(OrderQuery query)
        {
            var baseQuery = _context.Orders.Include(x => x.User).Include(x => x.OrderProducts).ThenInclude(x => x.Product).ThenInclude(x => x.Brand).Where(x => x.Status.Equals("Ordered"));

            var orders = await baseQuery
                .Skip(query.PageSize * (query.PageNumber - 1))
                .Take(query.PageSize)
                .ToListAsync();

            var totalItemsCount = baseQuery.Count();

            var result = new PagedResult<Order>(orders, totalItemsCount, query.PageSize, query.PageNumber);

            return result;
        }

        public async Task<PagedResult<Order>> GetUserOrdersAsync(int userId, OrderQuery query)
        {
            var baseQuery = _context.Orders.Include(x => x.User).Include(x => x.OrderProducts).ThenInclude(x => x.Product).ThenInclude(x => x.Brand).Where(x => x.UserId == userId).OrderByDescending(x => x.DateOfOrder);

            var orders = await baseQuery
                .Skip(query.PageSize * (query.PageNumber - 1))
                .Take(query.PageSize)
                .ToListAsync();

            var totalItemsCount = baseQuery.Count();

            var result = new PagedResult<Order>(orders, totalItemsCount, query.PageSize, query.PageNumber);

            return result;
        }

        public async Task UpdateOrderAsync(Order order)
        {
            _context.Orders.Update(order);
            await _context.SaveChangesAsync();
        }
    }
}
