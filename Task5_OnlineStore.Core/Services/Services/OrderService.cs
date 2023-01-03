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
using Task5_OnlineStore.DataAccess.PagedResult;
using Task5_OnlineStore.DataAccess.Queries;
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

        public async Task<PagedResult<OrderDto>> GetAllNewOrdersAsync(OrderQuery query)
        {
            var orders = await _orderRepository.GetAllOrdersAsync(query);
            var mappedOrders = new List<OrderDto>();

            foreach (var order in orders.Items)
            {
                var mappedOrder = _mapper.Map<OrderDto>(order);
                mappedOrder.OrderProducts = _mapper.Map<ICollection<OrderProductDto>>(order.OrderProducts);
                mappedOrders.Add(mappedOrder);
            }

            var pagedResultOrders = new PagedResult<OrderDto>(
                    mappedOrders,
                    orders.TotalPages,
                    orders.ItemsFrom,
                    orders.ItemsTo,
                    orders.TotalItemsCount
                );
            return pagedResultOrders;
        }

        public async Task<ICollection<OrderDto>> GetUserOrdersAsync(int userId)
        {
            var mappedOrders = new List<OrderDto>();

            var orders = await _orderRepository.GetUserOrdersAsync(userId);

            foreach (var order in orders)
            {
                var mappedOrder = _mapper.Map<OrderDto>(order);
                mappedOrder.OrderProducts = _mapper.Map<ICollection<OrderProductDto>>(order.OrderProducts);
                mappedOrders.Add(mappedOrder);
            }
            return mappedOrders;
        }

        public async Task UpdateOrderStatusAsync(OrderDto orderDto)
        {
            await _orderRepository.UpdateOrderAsync(_mapper.Map<Order>(orderDto));
        }
    }
}
