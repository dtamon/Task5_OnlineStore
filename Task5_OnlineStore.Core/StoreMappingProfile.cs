﻿using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Task5_OnlineStore.Core.Dto;
using Task5_OnlineStore.DataAccess.Entities;

namespace Task5_OnlineStore.Core
{
    public class StoreMappingProfile : Profile
    {
        public StoreMappingProfile() 
        {
            CreateMap<BrandDto, Brand>();
            CreateMap<Brand, BrandDto>();

            CreateMap<ProductDto, Product>();
            CreateMap<Product, ProductDto>()
                .ForMember(d => d.BrandName, o => o.MapFrom(s => s.Brand.BrandName))
                .ForMember(d => d.CategoryName, o => o.MapFrom(s => s.Category.CategoryName));

            CreateMap<CategoryDto, Category>();
            CreateMap<Category, CategoryDto>();

            CreateMap<OrderDto, Order>();
            CreateMap<Order, OrderDto>()
                .ForMember(d => d.UserName, o => o.MapFrom(s => $"{s.User.FirstName} {s.User.LastName}"));
        }
    }
}
