﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Task5_OnlineStore.DataAccess.Context;
using Task5_OnlineStore.DataAccess.Entities;
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

        public async Task<ICollection<Order>> GetAllOrdersAsync()
        {
            return await _context.Orders.Include(x => x.User).Include(x => x.Products).Where(x => x.Status.Equals("Ordered")).ToListAsync();
        }

        public async Task UpdateOrderAsync(Order order)
        {
            _context.Orders.Update(order);
            await _context.SaveChangesAsync();
        }
    }
}
