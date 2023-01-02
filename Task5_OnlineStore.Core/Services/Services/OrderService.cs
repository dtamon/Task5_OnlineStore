using AutoMapper;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Task5_OnlineStore.Core.Dto;
using Task5_OnlineStore.Core.Services.Interfaces;
using Task5_OnlineStore.DataAccess.Entities;
using Task5_OnlineStore.DataAccess.Repositories.Interfaces;

namespace Task5_OnlineStore.Core.Services.Services
{
    public class OrderService : IOrderService
    {
        private readonly IProductRepository _productRepository;
        private readonly IOrderRepository _orderRepository;
        private readonly IOrderProductRepository _orderProductRepository;
        private readonly IMapper _mapper;

        public OrderService(IProductRepository productRepository, IOrderRepository orderRepository, IOrderProductRepository orderProductRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _orderRepository = orderRepository;
            _orderProductRepository = orderProductRepository;
            _mapper = mapper;
        }

        public async Task CreateOrderAsync(int userId, IEnumerable<OrderProductDto> cartItems)
        {
            //Count total cost of ordered items
            var totalCost = 0.00;
            foreach (var item in cartItems)
            {
                var product = await _productRepository.GetProductByIdAsync(item.Id);
                if (product != null)
                {
                    totalCost += product.Cost * item.Quantity;
                }
            }
            //Create Order object
            var order = new Order()
            {
                UserId = userId,
                TotalCost = totalCost,
                DateOfOrder = DateTime.Now,
                Status = "Ordered"
            };

            // Add new Order
            await _orderRepository.CreateOrderAsync(order);

            // Add Add ordered products quantity
            foreach (var item in cartItems)
            {
                var orderProduct = new OrderProduct()
                {
                    Order = order,
                    ProductId = item.Id,
                    Quantity = item.Quantity,
                };
                await _orderProductRepository.AddOrderProductAsync(orderProduct);
            }
        }

        public async Task<ICollection<OrderDto>> GetAllNewOrdersAsync()
        {
            return _mapper.Map<ICollection<OrderDto>>(await _orderRepository.GetAllOrdersAsync());
        }

        public async Task UpdateOrderStatusAsync(OrderDto orderDto)
        {
            await _orderRepository.UpdateOrderAsync(_mapper.Map<Order>(orderDto));
        }
    }
}
