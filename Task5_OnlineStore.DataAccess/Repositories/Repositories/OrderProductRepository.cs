using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Task5_OnlineStore.DataAccess.Context;
using Task5_OnlineStore.DataAccess.Repositories.Interfaces;

namespace Task5_OnlineStore.DataAccess.Repositories.Repositories
{
    public class OrderProductRepository : IOrderProductRepository
    {
        private readonly StoreDbContext _context;

        public OrderProductRepository(StoreDbContext context)
        {
            _context = context;
        }

        public async Task AddOrderProductAsync(Entities.OrderProduct orderProduct)
        {
            await _context.OrderProducts.AddAsync(orderProduct);
            await _context.SaveChangesAsync();
        }
    }
}
